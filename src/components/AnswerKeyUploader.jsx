import React, { useState, useEffect } from 'react';
import { UploadCloud, CheckCircle2, Save, FileText, Check, AlertCircle } from 'lucide-react';

export function AnswerKeyUploader({ tests = [], onRefreshTests }) {
  const [selectedTestId, setSelectedTestId] = useState(tests[0]?.id || '');
  const [questions, setQuestions] = useState([]);
  const [answerKeyMap, setAnswerKeyMap] = useState({}); // { [qNumber]: { correct_option: 0, explanation: '' } }
  const [bulkText, setBulkText] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // Load questions and existing answer keys when selected test changes
  useEffect(() => {
    if (!selectedTestId) return;

    setLoading(true);
    setSaveStatus('');

    // Fetch test questions
    fetch(`/api/tests/${selectedTestId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const qs = data.test.questions || [];
          setQuestions(qs);

          // Fetch existing answer keys from SQL DB
          fetch(`/api/answer-keys/${selectedTestId}`)
            .then((r) => r.json())
            .then((kData) => {
              const map = {};
              if (kData.success && Array.isArray(kData.keys)) {
                kData.keys.forEach((k) => {
                  map[k.q_number] = {
                    correct_option: k.correct_option,
                    explanation: k.explanation || ''
                  };
                });
              }
              setAnswerKeyMap(map);
            });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedTestId]);

  // Bulk parser: e.g. "1:A, 2:B, 3:C" OR "A, B, C, D" OR "1-A, 2-B"
  const handleApplyBulkText = () => {
    if (!bulkText.trim()) return;

    const optMap = { A: 0, B: 1, C: 2, D: 3, 0: 0, 1: 1, 2: 2, 3: 3 };
    const newMap = { ...answerKeyMap };

    // Format 1: "1:A, 2:B" or "1-A 2-B"
    const pairs = bulkText.match(/(\d+)[\s:\-=\.]*([A-Da-d0-3])/g);
    if (pairs && pairs.length > 0) {
      pairs.forEach((pair) => {
        const match = pair.match(/(\d+)[\s:\-=\.]*([A-Da-d0-3])/);
        if (match) {
          const qNum = parseInt(match[1], 10);
          const val = match[2].toUpperCase();
          const optIdx = optMap[val];
          if (optIdx !== undefined) {
            newMap[qNum] = {
              correct_option: optIdx,
              explanation: newMap[qNum]?.explanation || ''
            };
          }
        }
      });
    } else {
      // Format 2: Comma or space separated letters: "A, B, C, D, A..."
      const tokens = bulkText.split(/[\s,]+/).map((t) => t.trim().toUpperCase()).filter((t) => ['A', 'B', 'C', 'D'].includes(t));
      tokens.forEach((token, idx) => {
        const qNum = idx + 1;
        newMap[qNum] = {
          correct_option: optMap[token],
          explanation: newMap[qNum]?.explanation || ''
        };
      });
    }

    setAnswerKeyMap(newMap);
    setSaveStatus('Bulk answer key parsed! Click "Save to SQL Database" below.');
  };

  const setQuestionAnswer = (qNumber, optionIdx) => {
    setAnswerKeyMap((prev) => ({
      ...prev,
      [qNumber]: {
        correct_option: optionIdx,
        explanation: prev[qNumber]?.explanation || ''
      }
    }));
  };

  const setQuestionExplanation = (qNumber, exp) => {
    setAnswerKeyMap((prev) => ({
      ...prev,
      [qNumber]: {
        correct_option: prev[qNumber]?.correct_option !== undefined ? prev[qNumber].correct_option : 0,
        explanation: exp
      }
    }));
  };

  // Save to SQL Database via API
  const handleSaveToSQL = async () => {
    const keysArray = Object.keys(answerKeyMap).map((qNum) => ({
      q_number: parseInt(qNum, 10),
      correct_option: answerKeyMap[qNum].correct_option,
      explanation: answerKeyMap[qNum].explanation || ''
    }));

    if (keysArray.length === 0) {
      alert('Please set at least one answer key.');
      return;
    }

    try {
      const res = await fetch(`/api/answer-keys/${selectedTestId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keys: keysArray })
      });

      const data = await res.json();
      if (data.success) {
        setSaveStatus(`✅ Successfully saved ${keysArray.length} answer keys to SQL database!`);
      } else {
        setSaveStatus(`❌ Error saving: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setSaveStatus('❌ Connection error to backend server.');
    }
  };

  return (
    <div className="cbt-container">
      <div className="cbt-card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.35rem', color: '#1e3a8a', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <UploadCloud size={24} /> Upload / Manage Official Answer Key
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
          Yahan aap test ka official answer key upload kar sakte ho. Student jab test submit karegi, toh SQL database ke is answer key se automatic evaluation hoke usko marks milenge.
        </p>
      </div>

      <div className="cbt-card" style={{ marginBottom: '1.5rem' }}>
        <div className="cbt-form-group">
          <label className="cbt-label">Select Test to Configure:</label>
          <select 
            className="cbt-select" 
            value={selectedTestId} 
            onChange={(e) => setSelectedTestId(e.target.value)}
          >
            {tests.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title} ({t.total_questions || 20} Questions)
              </option>
            ))}
          </select>
        </div>

        {/* Quick Bulk Input Box */}
        <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '4px', border: '1px solid #cbd5e1', marginBottom: '1.25rem' }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem', color: '#334155' }}>
            Quick Bulk Paste (Format: "1:A, 2:B, 3:C" OR "A, B, C, D...")
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <input 
              type="text" 
              className="cbt-input" 
              placeholder="e.g. 1:A, 2:B, 3:C, 4:D, 5:B or A, B, C, D, A..."
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
            />
            <button className="cbt-btn cbt-btn-secondary" onClick={handleApplyBulkText}>
              Apply
            </button>
          </div>
        </div>

        {/* Save Status Notification */}
        {saveStatus && (
          <div style={{ padding: '0.65rem 1rem', marginBottom: '1rem', backgroundColor: '#e8f5e9', border: '1px solid #c8e6c9', color: '#2e7d32', borderRadius: '4px', fontSize: '0.88rem', fontWeight: 600 }}>
            {saveStatus}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
            Questions in this Test ({questions.length})
          </div>
          <button className="cbt-btn cbt-btn-primary" onClick={handleSaveToSQL}>
            <Save size={16} /> Save Answer Key to SQL Database
          </button>
        </div>

        {/* Questions Grid Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="cbt-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>Q.No</th>
                <th>Question & Options</th>
                <th style={{ width: '220px' }}>Correct Option (Key)</th>
                <th style={{ width: '250px' }}>Solution / Explanation</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => {
                const cur = answerKeyMap[q.qNumber] || {};
                const currentOpt = cur.correct_option;

                return (
                  <tr key={q.qNumber}>
                    <td style={{ fontWeight: 700, textAlign: 'center' }}>
                      Q{q.qNumber}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, marginBottom: '0.3rem', color: '#1e293b' }}>
                        {q.questionText}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        (A) {q.options[0]} | (B) {q.options[1]} | (C) {q.options[2]} | (D) {q.options[3]}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        {['A', 'B', 'C', 'D'].map((label, optIdx) => {
                          const isSelected = currentOpt === optIdx;
                          return (
                            <button
                              key={label}
                              type="button"
                              onClick={() => setQuestionAnswer(q.qNumber, optIdx)}
                              style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '4px',
                                border: isSelected ? '2px solid #2e7d32' : '1px solid #cbd5e1',
                                backgroundColor: isSelected ? '#2e7d32' : '#ffffff',
                                color: isSelected ? '#ffffff' : '#1e293b',
                                fontWeight: 700,
                                cursor: 'pointer'
                              }}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                    <td>
                      <input 
                        type="text" 
                        className="cbt-input" 
                        style={{ fontSize: '0.82rem', padding: '0.4rem' }}
                        placeholder="Short NCERT explanation"
                        value={cur.explanation || ''}
                        onChange={(e) => setQuestionExplanation(q.qNumber, e.target.value)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '1.25rem', textAlign: 'right' }}>
          <button className="cbt-btn cbt-btn-primary" onClick={handleSaveToSQL}>
            <Save size={16} /> Save Answer Key to SQL Database
          </button>
        </div>
      </div>
    </div>
  );
}
