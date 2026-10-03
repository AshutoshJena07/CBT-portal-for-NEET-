import React, { useState, useEffect } from 'react';
import { ShieldCheck, Play, Clock, CheckCircle, FileText } from 'lucide-react';
import { AttemptsHistorySection } from './AttemptsHistorySection';

export function StudentPortal({ tests = [], onStartExam }) {
  const [selectedTestId, setSelectedTestId] = useState('');
  const [candidateName, setCandidateName] = useState('Aparnavati');
  const [rollNo, setRollNo] = useState('NEET-2026-AIR1');

  // Auto-select first test when tests load
  useEffect(() => {
    if (tests.length > 0 && !selectedTestId) {
      setSelectedTestId(tests[0].id);
    }
  }, [tests, selectedTestId]);

  const activeTestId = selectedTestId || (tests.length > 0 ? tests[0].id : '');
  const selectedTest = tests.find((t) => t.id === activeTestId) || tests[0];

  const handleStart = (e) => {
    e.preventDefault();
    const finalId = selectedTestId || tests[0]?.id;
    if (!finalId) {
      alert('Please select a test.');
      return;
    }

    onStartExam({
      testId: finalId,
      candidate: {
        name: candidateName.trim() || 'Dr. Sahiba',
        rollNo: rollNo.trim() || 'NEET-2026-AIR1'
      }
    });
  };

  return (
    <div className="cbt-container">
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', alignItems: 'flex-start' }}>
        
        {/* LEFT COLUMN: CANDIDATE LOGIN & TEST SELECTION */}
        <div className="cbt-card">
          <div style={{ borderBottom: '2px solid #2563eb', paddingBottom: '0.6rem', marginBottom: '1.2rem' }}>
            <h2 style={{ fontSize: '1.3rem', color: 'var(--text-heading)' }}>
              Candidate Examination Entry
            </h2>
          </div>

          <form onSubmit={handleStart}>
            <div className="cbt-form-group">
              <label className="cbt-label">Select Official NEET Exam Paper:</label>
              <select 
                className="cbt-select" 
                value={activeTestId}
                onChange={(e) => setSelectedTestId(e.target.value)}
              >
                {tests.map((t) => (
                   <option key={t.id} value={t.id}>
                    {t.title} ({t.duration_minutes || 180} mins • {t.total_questions || 180} Qs • {t.total_marks || 720} M)
                  </option>
                ))}
              </select>
            </div>

            <div className="cbt-form-group">
              <label className="cbt-label">Candidate Full Name:</label>
              <input 
                type="text" 
                className="cbt-input" 
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="Enter candidate name..."
                required
              />
            </div>

            <div className="cbt-form-group">
              <label className="cbt-label">Roll Number / Registration No:</label>
              <input 
                type="text" 
                className="cbt-input" 
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="e.g. NEET-2026-AIR1"
                required
              />
            </div>

            <div className="cbt-security-box">
              <strong>🔒 Exam Security Instructions:</strong>
              <ul style={{ paddingLeft: '1.2rem', marginTop: '0.35rem' }}>
                <li>This test will launch in <strong>Mandatory Fullscreen Mode</strong>.</li>
                <li>Duration is strictly <strong>3 Hours (180 Minutes)</strong>.</li>
                <li>Right-click, F12 Inspect, PrintScreen screenshots, and window switching are restricted.</li>
                <li>Leaving fullscreen or switching tabs 3 times will automatically submit your exam.</li>
              </ul>
            </div>

            <button 
              type="submit" 
              className="cbt-btn cbt-btn-primary" 
              style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: 700 }}
            >
              <Play size={18} /> Start Exam in Fullscreen Lock Mode
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: TEST DETAILS & RULES */}
        <div>
          <div className="cbt-card" style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', marginBottom: '0.8rem', borderBottom: '1px solid var(--border-main)', paddingBottom: '0.4rem' }}>
              Test Pattern & Marking Scheme
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1rem', textAlign: 'center' }}>
              <div className="cbt-metric-box">
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>OFFICIAL DURATION</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary-blue)' }}>
                  {selectedTest?.duration_minutes || 180} Mins (3h)
                </div>
              </div>

              <div className="cbt-metric-box">
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>MAXIMUM MARKS</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#16a34a' }}>
                  {selectedTest?.total_marks || 720}
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
              <p>• <strong>180 Questions:</strong> Botany (45), Zoology (45), Chemistry (45), Physics (45).</p>
              <p>• <strong>+4 Marks</strong> for each correct response.</p>
              <p>• <strong>-1 Mark</strong> for each incorrect response (Negative Marking).</p>
              <p>• <strong>0 Marks</strong> for unattempted questions.</p>
              <p>• Responses will be automatically evaluated against the official answer key upon submission.</p>
            </div>
          </div>

          <div className="cbt-booklet-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem' }}>
              <ShieldCheck size={18} /> Official Question Paper Booklet Attached
            </div>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.4 }}>
              Inside the examination room, you can click <strong>"View Official Paper Booklet (PDF)"</strong> to browse all questions, figures, and diagrams side-by-side with your response sheet.
            </p>
          </div>
        </div>

      </div>

      {/* ---------------- NUMBER OF ATTEMPTS & PAPER BREAKDOWN SECTION ---------------- */}
      <AttemptsHistorySection tests={tests} />

    </div>
  );
}
