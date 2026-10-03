import db from '../server/database.js';

try {
  db.exec('ALTER TABLE questions ADD COLUMN image_url TEXT;');
  console.log('Added image_url column');
} catch (e) {
  console.log('image_url column already exists');
}

// Update Kanha E1
db.prepare(`
  UPDATE questions 
  SET image_url = '/questions/E1/q_' || q_number || '.png'
  WHERE test_id = 'neet-official-kanha-e1'
`).run();

// Update Narmada tests (45, 46, 47, 48)
for (const code of ['45', '46', '47', '48']) {
  const testId = `neet-2025-code-${code}`;
  
  // Physics: 1-45
  db.prepare(`
    UPDATE questions
    SET subject = 'Physics',
        image_url = '/questions/' || ? || '/q_' || q_number || '.png',
        question_text = 'Question ' || q_number || ' [Physics]',
        opt_a = '(1)', opt_b = '(2)', opt_c = '(3)', opt_d = '(4)'
    WHERE test_id = ? AND q_number BETWEEN 1 AND 45
  `).run(code, testId);

  // Chemistry: 46-90
  db.prepare(`
    UPDATE questions
    SET subject = 'Chemistry',
        image_url = '/questions/' || ? || '/q_' || q_number || '.png',
        question_text = 'Question ' || q_number || ' [Chemistry]',
        opt_a = '(1)', opt_b = '(2)', opt_c = '(3)', opt_d = '(4)'
    WHERE test_id = ? AND q_number BETWEEN 46 AND 90
  `).run(code, testId);

  // Botany: 91-135
  db.prepare(`
    UPDATE questions
    SET subject = 'Botany',
        image_url = '/questions/' || ? || '/q_' || q_number || '.png',
        question_text = 'Question ' || q_number || ' [Botany]',
        opt_a = '(1)', opt_b = '(2)', opt_c = '(3)', opt_d = '(4)'
    WHERE test_id = ? AND q_number BETWEEN 91 AND 135
  `).run(code, testId);

  // Zoology: 136-180
  db.prepare(`
    UPDATE questions
    SET subject = 'Zoology',
        image_url = '/questions/' || ? || '/q_' || q_number || '.png',
        question_text = 'Question ' || q_number || ' [Zoology]',
        opt_a = '(1)', opt_b = '(2)', opt_c = '(3)', opt_d = '(4)'
    WHERE test_id = ? AND q_number BETWEEN 136 AND 180
  `).run(code, testId);
}

console.log('Database questions successfully updated with image_url and subjects!');
