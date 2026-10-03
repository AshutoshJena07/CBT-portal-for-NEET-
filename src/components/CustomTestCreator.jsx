import React, { useState } from 'react';
import { 
  PlusCircle, 
  ArrowLeft, 
  Save, 
  Trash2, 
  CheckCircle, 
  FileText, 
  UploadCloud, 
  Sparkles 
} from 'lucide-react';

export function CustomTestCreator({ onSaveTest, onBackToDashboard }) {
  const [testTitle, setTestTitle] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [category, setCategory] = useState('Custom Drill');
  const [questions, setQuestions] = useState([]);

  // Form for single question
  const [qText, setQText] = useState('');
  const [qSubject, setQSubject] = useState('Biology');
  const [qTopic, setQTopic] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [explanation, setExplanation] = useState('');

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!qText.trim() || !optA.trim() || !optB.trim()) {
      alert('Please fill out the question and at least 2 options.');
      return;
    }

    const newQ = {
      id: `custom-q-${Date.now()}-${questions.length}`,
      subject: qSubject,
      section: 'A',
      topic: qTopic || 'General',
      question: qText.trim(),
      options: [optA.trim(), optB.trim(), optC.trim(), optD.trim()],
      correctAnswer: parseInt(correctAnswer, 10),
      explanation: explanation.trim() || 'Refer NCERT textbook for detailed theory.'
    };

    setQuestions([...questions, newQ]);

    // Reset question form
    setQText('');
    setQTopic('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setExplanation('');
  };

  const handleDeleteQuestion = (idx) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const handleFinalSave = () => {
    if (!testTitle.trim()) {
      alert('Please enter a test title.');
      return;
    }
    if (questions.length === 0) {
      alert('Please add at least 1 question to the test.');
      return;
    }

    const newTest = {
      id: `custom-test-${Date.now()}`,
      title: testTitle.trim(),
      subtitle: `Created specially for Dr. Sahiba • ${questions.length} Questions`,
      category: category,
      durationMinutes: parseInt(durationMinutes, 10) || 30,
      totalMarks: questions.length * 4,
      passingMarks: Math.round(questions.length * 4 * 0.7),
      difficulty: 'Custom',
      tags: ['Personal Mock', `${questions.length} Qs`, `${durationMinutes}m`],
      description: `Custom practice test with ${questions.length} questions.`,
      questions: questions
    };

    onSaveTest(newTest);
  };

  // Helper to load sample high-yield questions
  const loadQuickSample = () => {
    setTestTitle('Daily NCERT Rapid Drill 🩺');
    setDurationMinutes(20);
    setQuestions([
      {
        id: `sample-1-${Date.now()}`,
        subject: 'Botany',
        section: 'A',
        topic: 'Photosynthesis',
        question: 'Which wavelength of light is absorbed most efficiently by chlorophyll a?',
        options: ['Blue and Red', 'Green and Yellow', 'Infrared', 'Orange only'],
        correctAnswer: 0,
        explanation: 'Chlorophyll a shows maximum absorption in the blue and red regions of the visible spectrum (NCERT Class 11).'
      },
      {
        id: `sample-2-${Date.now()}`,
        subject: 'Zoology',
        section: 'A',
        topic: 'Endocrine Glands',
        question: 'Which hormone is secreted by the pineal gland and regulates the 24-hour diurnal rhythm of our body?',
        options: ['Melatonin', 'Melanin', 'Thyroxine', 'Calcitonin'],
        correctAnswer: 0,
        explanation: 'Melatonin secreted by the pineal gland maintains the normal sleep-wake cycle, body temperature, and diurnal rhythms.'
      },
      {
        id: `sample-3-${Date.now()}`,
        subject: 'Physics',
        section: 'A',
        topic: 'Thermodynamics',
        question: 'In an adiabatic expansion of an ideal gas, which quantity remains constant?',
        options: ['Temperature', 'Pressure', 'Heat (Q = 0)', 'Volume'],
        correctAnswer: 2,
        explanation: 'In an adiabatic process, there is no heat exchange between the system and its surroundings (ΔQ = 0).'
      }
    ]);
  };

  return (
    <div className="container" style={{ padding: '2rem 1.25rem 5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button className="btn btn-secondary btn-sm" onClick={onBackToDashboard}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button className="btn btn-secondary btn-sm" onClick={loadQuickSample}>
            <Sparkles size={15} color="#38bdf8" /> Load Sample Questions
          </button>
          <button className="btn btn-emerald" onClick={handleFinalSave} disabled={questions.length === 0}>
            <Save size={16} /> Save & Publish Test ({questions.length} Qs)
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '0.4rem' }}>
          Create Custom NEET Practice Test ✍️
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
          You can create personalized chapter tests, coaching tests (Allen, Aakash, PW), or rapid drills for her!
        </p>
      </div>

      <div className="grid-2" style={{ alignItems: 'flex-start' }}>
        {/* LEFT COLUMN: TEST SETTINGS & ADD QUESTION FORM */}
        <div>
          {/* Test Meta Info */}
          <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '1rem' }}>1. Test Information</h3>
            
            <div className="form-group">
              <label className="form-label">Test Title</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Zoology Human Physiology Sprint"
                value={testTitle}
                onChange={(e) => setTestTitle(e.target.value)}
              />
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Duration (Minutes)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(e.target.value)}
                  min="5"
                  max="200"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Test Category</label>
                <select 
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Subject Mock">Subject Mock</option>
                  <option value="Chapter Drill">Chapter Drill</option>
                  <option value="Formula Test">Formula Test</option>
                  <option value="Full Mock">Full Mock</option>
                </select>
              </div>
            </div>
          </div>

          {/* Add Question Form */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '1rem' }}>2. Add a Question</h3>

            <form onSubmit={handleAddQuestion}>
              <div className="grid-2" style={{ marginBottom: '1rem' }}>
                <div>
                  <label className="form-label">Subject</label>
                  <select 
                    className="form-select"
                    value={qSubject}
                    onChange={(e) => setQSubject(e.target.value)}
                  >
                    <option value="Botany">Botany</option>
                    <option value="Zoology">Zoology</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Topic / Chapter</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Genetics, Thermodynamics"
                    value={qTopic}
                    onChange={(e) => setQTopic(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Question Text</label>
                <textarea 
                  className="form-textarea" 
                  rows="3"
                  placeholder="Enter the question text here..."
                  value={qText}
                  onChange={(e) => setQText(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem', marginBottom: '1rem' }}>
                <div>
                  <label className="form-label">Option (A)</label>
                  <input type="text" className="form-input" value={optA} onChange={(e) => setOptA(e.target.value)} placeholder="Option A" />
                </div>
                <div>
                  <label className="form-label">Option (B)</label>
                  <input type="text" className="form-input" value={optB} onChange={(e) => setOptB(e.target.value)} placeholder="Option B" />
                </div>
                <div>
                  <label className="form-label">Option (C)</label>
                  <input type="text" className="form-input" value={optC} onChange={(e) => setOptC(e.target.value)} placeholder="Option C" />
                </div>
                <div>
                  <label className="form-label">Option (D)</label>
                  <input type="text" className="form-input" value={optD} onChange={(e) => setOptD(e.target.value)} placeholder="Option D" />
                </div>
              </div>

              <div className="grid-2" style={{ marginBottom: '1rem' }}>
                <div>
                  <label className="form-label">Correct Option</label>
                  <select 
                    className="form-select"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                  >
                    <option value={0}>Option (A)</option>
                    <option value={1}>Option (B)</option>
                    <option value={2}>Option (C)</option>
                    <option value={3}>Option (D)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">NCERT Step-by-Step Explanation</label>
                <textarea 
                  className="form-textarea" 
                  rows="2"
                  placeholder="Explain why this option is correct..."
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <PlusCircle size={16} /> Add Question to Test
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: PREVIEW OF ADDED QUESTIONS */}
        <div>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#ffffff' }}>
                Questions in this Test ({questions.length})
              </h3>
              <span className="badge badge-emerald">Total Marks: {questions.length * 4}</span>
            </div>

            {questions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>📝</div>
                <p>No questions added yet. Use the form on the left or click "Load Sample Questions" above.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '600px', overflowY: 'auto' }}>
                {questions.map((q, idx) => (
                  <div 
                    key={q.id || idx}
                    style={{ 
                      padding: '1rem', 
                      background: 'rgba(15, 23, 42, 0.6)', 
                      borderRadius: '8px', 
                      border: '1px solid var(--border-color)' 
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <span style={{ fontWeight: 800, color: '#38bdf8' }}>Q{idx + 1}.</span>
                        <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>{q.subject}</span>
                      </div>
                      <button 
                        onClick={() => handleDeleteQuestion(idx)}
                        style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}
                        title="Delete question"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div style={{ fontSize: '0.9rem', color: '#f8fafc', marginBottom: '0.5rem' }}>
                      {q.question}
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>
                      Correct: ({String.fromCharCode(65 + q.correctAnswer)}) {q.options[q.correctAnswer]}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
