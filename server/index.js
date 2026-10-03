import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve public directory (question images, PDFs)
app.use(express.static(path.join(__dirname, '..', 'public')));

// 1. Get all available tests
app.get('/api/tests', (req, res) => {
  try {
    const tests = db.prepare('SELECT * FROM tests ORDER BY created_at DESC').all();
    res.json({ success: true, tests });
  } catch (error) {
    console.error('Error fetching tests:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Get single test and its questions for Exam (Answers are NOT leaked here)
app.get('/api/tests/:testId', (req, res) => {
  try {
    const test = db.prepare('SELECT * FROM tests WHERE id = ?').get(req.params.testId);
    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }

    const questions = db.prepare(`
      SELECT id, test_id, q_number, subject, section, question_text, opt_a, opt_b, opt_c, opt_d, image_url
      FROM questions
      WHERE test_id = ?
      ORDER BY q_number ASC
    `).all(req.params.testId);

    // Format questions array for frontend
    const formattedQuestions = questions.map((q) => ({
      id: q.id,
      qNumber: q.q_number,
      subject: q.subject,
      section: q.section,
      questionText: q.question_text,
      imageUrl: q.image_url,
      options: [q.opt_a, q.opt_b, q.opt_c, q.opt_d]
    }));

    res.json({
      success: true,
      test: {
        ...test,
        questions: formattedQuestions
      }
    });
  } catch (error) {
    console.error('Error fetching test questions:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. Admin: Get Answer Key for a test
app.get('/api/answer-keys/:testId', (req, res) => {
  try {
    const keys = db.prepare(`
      SELECT q_number, correct_option, explanation
      FROM answer_keys
      WHERE test_id = ?
      ORDER BY q_number ASC
    `).all(req.params.testId);

    res.json({ success: true, keys });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. Admin: Upload / Update Answer Key into SQL DB
// Payload: { keys: [ { q_number: 1, correct_option: 0, explanation: '' }, ... ] }
app.post('/api/answer-keys/:testId', (req, res) => {
  try {
    const { keys } = req.body;
    if (!Array.isArray(keys) || keys.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid keys array provided' });
    }

    const upsertKey = db.prepare(`
      INSERT INTO answer_keys (test_id, q_number, correct_option, explanation)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(test_id, q_number) DO UPDATE SET
        correct_option = excluded.correct_option,
        explanation = excluded.explanation
    `);

    const updateTx = db.transaction(() => {
      for (const item of keys) {
        upsertKey.run(
          req.params.testId,
          parseInt(item.q_number, 10),
          parseInt(item.correct_option, 10),
          item.explanation || ''
        );
      }
    });

    updateTx();

    res.json({
      success: true,
      message: `Successfully uploaded answer keys for ${keys.length} questions!`
    });
  } catch (error) {
    console.error('Error saving answer key:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 5. Submit Exam -> Auto-evaluate against SQL Answer Key & Store Result
app.post('/api/submit-exam', (req, res) => {
  try {
    const { 
      testId, 
      candidateName, 
      rollNo, 
      responses = {}, 
      timeSpentSeconds = 0,
      tabSwitchCount = 0 
    } = req.body;

    const test = db.prepare('SELECT * FROM tests WHERE id = ?').get(testId);
    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }

    // Fetch questions and answer keys from SQL database
    const questions = db.prepare(`
      SELECT q.id, q.q_number, q.subject, q.question_text, q.opt_a, q.opt_b, q.opt_c, q.opt_d, q.image_url,
             ak.correct_option, ak.explanation
      FROM questions q
      LEFT JOIN answer_keys ak ON q.test_id = ak.test_id AND q.q_number = ak.q_number
      WHERE q.test_id = ?
      ORDER BY q.q_number ASC
    `).all(testId);

    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    const evaluatedDetails = questions.map((q) => {
      const selectedOption = responses[q.q_number];
      const hasAttempted = selectedOption !== undefined && selectedOption !== null;
      const validOptions = String(q.correct_option).split(',').map(s => parseInt(s.trim(), 10));
      const isBonus = String(q.correct_option).includes('5') || String(q.correct_option).includes('bonus');
      const isCorrect = hasAttempted && (validOptions.includes(selectedOption) || isBonus);

      if (!hasAttempted) {
        unattemptedCount += 1;
      } else if (isCorrect) {
        correctCount += 1;
      } else {
        incorrectCount += 1;
      }

      return {
        qNumber: q.q_number,
        subject: q.subject,
        questionText: q.question_text,
        imageUrl: q.image_url,
        options: [q.opt_a, q.opt_b, q.opt_c, q.opt_d],
        selectedOption: hasAttempted ? selectedOption : null,
        correctOption: q.correct_option,
        isCorrect: hasAttempted ? isCorrect : false,
        isAttempted: hasAttempted,
        explanation: q.explanation || 'No explanation provided.'
      };
    });

    // NEET Marking Scheme: +4 for Correct, -1 for Incorrect, 0 for Unattempted
    const score = (correctCount * 4) - (incorrectCount * 1);
    const totalPossibleMarks = questions.length * 4;
    const attemptedCount = correctCount + incorrectCount;
    const accuracy = attemptedCount > 0 ? parseFloat(((correctCount / attemptedCount) * 100).toFixed(1)) : 0;

    const submissionId = `sub_${Date.now()}`;

    // Insert record into SQL submissions table
    db.prepare(`
      INSERT INTO submissions (
        id, test_id, candidate_name, roll_no, score, total_marks,
        correct_count, incorrect_count, unattempted_count, accuracy,
        time_spent_seconds, tab_switch_count, responses_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      submissionId,
      testId,
      candidateName || 'Candidate',
      rollNo || 'NEET-001',
      score,
      totalPossibleMarks,
      correctCount,
      incorrectCount,
      unattemptedCount,
      accuracy,
      timeSpentSeconds,
      tabSwitchCount,
      JSON.stringify(responses)
    );

    res.json({
      success: true,
      submission: {
        id: submissionId,
        testId,
        testTitle: test.title,
        candidateName,
        rollNo,
        score,
        totalMarks: totalPossibleMarks,
        correctCount,
        incorrectCount,
        unattemptedCount,
        accuracy,
        timeSpentSeconds,
        tabSwitchCount,
        details: evaluatedDetails
      }
    });
  } catch (error) {
    console.error('Error submitting exam:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 6. Get Submissions History from SQL DB
app.get('/api/submissions', (req, res) => {
  try {
    const submissions = db.prepare(`
      SELECT s.*, t.title as test_title
      FROM submissions s
      JOIN tests t ON s.test_id = t.id
      ORDER BY s.submitted_at DESC
    `).all();

    res.json({ success: true, submissions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Clear Submissions History
app.delete('/api/submissions', (req, res) => {
  try {
    db.prepare('DELETE FROM submissions').run();
    res.json({ success: true, message: 'Submissions history cleared successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 7. Create a new test with custom questions
app.post('/api/tests', (req, res) => {
  try {
    const { title, durationMinutes = 200, questions = [] } = req.body;
    if (!title || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ success: false, message: 'Title and questions are required' });
    }

    const testId = `test_${Date.now()}`;
    const totalMarks = questions.length * 4;

    const insertTest = db.prepare(`
      INSERT INTO tests (id, title, duration_minutes, total_questions, total_marks)
      VALUES (?, ?, ?, ?, ?)
    `);

    const insertQ = db.prepare(`
      INSERT INTO questions (test_id, q_number, subject, question_text, opt_a, opt_b, opt_c, opt_d)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertKey = db.prepare(`
      INSERT INTO answer_keys (test_id, q_number, correct_option, explanation)
      VALUES (?, ?, ?, ?)
    `);

    const tx = db.transaction(() => {
      insertTest.run(testId, title, durationMinutes, questions.length, totalMarks);
      questions.forEach((q, idx) => {
        const qNum = idx + 1;
        insertQ.run(
          testId,
          qNum,
          q.subject || 'General',
          q.questionText,
          q.options[0] || '',
          q.options[1] || '',
          q.options[2] || '',
          q.options[3] || ''
        );
        if (q.correctOption !== undefined) {
          insertKey.run(testId, qNum, parseInt(q.correctOption, 10), q.explanation || '');
        }
      });
    });

    tx();

    res.json({ success: true, testId, message: 'Test successfully created!' });
  } catch (error) {
    console.error('Error creating test:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Serve frontend build from dist if available
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Fallback to index.html for SPA routes (Express 5 compatible)
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) next();
  });
});

app.listen(PORT, () => {
  console.log(`NEET CBT Backend Server running with SQLite on http://localhost:${PORT}`);
});
