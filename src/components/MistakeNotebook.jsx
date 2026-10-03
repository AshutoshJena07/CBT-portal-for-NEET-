import React, { useState } from 'react';
import { 
  Bookmark, 
  Trash2, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  ArrowLeft, 
  Sparkles, 
  BookOpen,
  Filter,
  Check
} from 'lucide-react';

export function MistakeNotebook({ bookmarks, onToggleBookmark, onBackToDashboard }) {
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [revealedSolutions, setRevealedSolutions] = useState({}); // { [qId]: boolean }
  const [userPracticeAnswers, setUserPracticeAnswers] = useState({}); // { [qId]: optionIdx }

  const subjects = ['All', 'Physics', 'Chemistry', 'Botany', 'Zoology'];

  const filteredBookmarks = bookmarks.filter((b) => {
    if (selectedSubject === 'All') return true;
    return b.subject === selectedSubject;
  });

  const toggleSolution = (id) => {
    setRevealedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectOption = (qId, optIdx) => {
    setUserPracticeAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  return (
    <div className="container" style={{ padding: '2rem 1.25rem 5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button className="btn btn-secondary btn-sm" onClick={onBackToDashboard}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {subjects.map((subj) => (
            <button
              key={subj}
              className={`btn btn-sm ${selectedSubject === subj ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedSubject(subj)}
            >
              {subj}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Bookmark size={28} color="#a855f7" /> My NEET Mistake Notebook 📖
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
          "Every mistake you master turns into a guaranteed +4 marks on the actual NEET exam day."
          Practice these tricky questions until you have 100% confidence!
        </p>
      </div>

      {filteredBookmarks.length === 0 ? (
        <div className="glass-card" style={{ padding: '3.5rem', textAlign: 'center', color: '#94a3b8' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔖</div>
          <h3 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>No bookmarked questions yet</h3>
          <p style={{ fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
            When reviewing any mock test, click "Save for Revision 🔖" on tricky questions or mistakes. They will automatically gather here for targeted practice!
          </p>
          <button className="btn btn-primary" onClick={onBackToDashboard}>
            Go to Mock Tests
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {filteredBookmarks.map((q, idx) => {
            const isRevealed = revealedSolutions[q.id];
            const selectedOpt = userPracticeAnswers[q.id];
            const isCorrect = selectedOpt !== undefined && selectedOpt === q.correctAnswer;

            return (
              <div 
                key={q.id} 
                className="glass-card" 
                style={{ 
                  padding: '1.5rem',
                  borderColor: selectedOpt !== undefined 
                    ? (isCorrect ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)')
                    : 'var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, color: '#38bdf8' }}>#{idx + 1}</span>
                    <span className="badge badge-cyan">{q.subject}</span>
                    {q.topic && <span className="badge badge-purple">{q.topic}</span>}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => toggleSolution(q.id)}
                      style={{ fontSize: '0.78rem' }}
                    >
                      {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
                      <span>{isRevealed ? 'Hide Solution' : 'Show Solution'}</span>
                    </button>

                    <button 
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => onToggleBookmark(q)}
                      title="Remove from notebook"
                      style={{ padding: '0.35rem 0.6rem' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div style={{ fontSize: '1rem', color: '#f8fafc', lineHeight: 1.6, marginBottom: '1.25rem', whiteSpace: 'pre-line' }}>
                  {q.question}
                </div>

                {/* Options in re-test mode */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', marginBottom: '1.25rem' }}>
                  {q.options && q.options.map((opt, oIdx) => {
                    const isSelected = selectedOpt === oIdx;
                    const isCorrectOpt = oIdx === q.correctAnswer;

                    let bg = 'rgba(15, 23, 42, 0.4)';
                    let border = '1px solid var(--border-color)';

                    if (isRevealed || selectedOpt !== undefined) {
                      if (isCorrectOpt) {
                        bg = 'rgba(16, 185, 129, 0.15)';
                        border = '2px solid #10b981';
                      } else if (isSelected && !isCorrectOpt) {
                        bg = 'rgba(239, 68, 68, 0.15)';
                        border = '2px solid #ef4444';
                      }
                    } else if (isSelected) {
                      bg = 'rgba(56, 189, 248, 0.15)';
                      border = '2px solid #38bdf8';
                    }

                    return (
                      <div 
                        key={oIdx}
                        onClick={() => handleSelectOption(q.id, oIdx)}
                        style={{
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          border,
                          backgroundColor: bg,
                          color: '#f8fafc',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div>
                          <strong>({String.fromCharCode(65 + oIdx)})</strong> {opt}
                        </div>
                        {(isRevealed || selectedOpt !== undefined) && isCorrectOpt && (
                          <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>✓ Correct</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Solution Box */}
                {isRevealed && (
                  <div 
                    style={{ 
                      background: 'rgba(15, 23, 42, 0.9)', 
                      borderLeft: '4px solid #10b981', 
                      borderRadius: '0 8px 8px 0',
                      padding: '1rem',
                      fontSize: '0.9rem',
                      color: '#cbd5e1',
                      lineHeight: 1.6
                    }}
                  >
                    <div style={{ fontWeight: 700, color: '#10b981', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <BookOpen size={16} /> NCERT Explanation:
                    </div>
                    <div>{q.explanation}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
