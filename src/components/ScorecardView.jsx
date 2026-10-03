import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, AlertCircle, ArrowLeft, RotateCcw, ShieldAlert, Award, Sparkles, PartyPopper, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ReportCardModal } from './ReportCardModal';

export function ScorecardView({ submission, onRetake, onBackHome }) {
  if (!submission) return null;

  const {
    candidateName,
    rollNo,
    testTitle,
    score,
    totalMarks,
    correctCount,
    incorrectCount,
    unattemptedCount,
    accuracy,
    timeSpentSeconds,
    tabSwitchCount,
    details = []
  } = submission;

  const [showReportCardModal, setShowReportCardModal] = useState(false);
  const isCelebrationScore = score >= 500;

  // Trigger celebration animation if score >= 500
  useEffect(() => {
    if (isCelebrationScore) {
      // 1. Initial big burst
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 }
      });

      // 2. Continuous celebratory fireworks from left and right
      const duration = 3.5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.75 },
          colors: ['#f43f5e', '#ec4899', '#3b82f6', '#10b981', '#f59e0b']
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.75 },
          colors: ['#f43f5e', '#ec4899', '#3b82f6', '#10b981', '#f59e0b']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isCelebrationScore]);

  const percentage = totalMarks > 0 ? ((score / totalMarks) * 100).toFixed(1) : 0;
  const timeMins = Math.round(timeSpentSeconds / 60) || 1;

  return (
    <div className="cbt-container">
      
      {/* Top Action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button className="cbt-btn cbt-btn-secondary" onClick={onBackHome}>
          <ArrowLeft size={16} /> Return to Examination Home
        </button>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            className="cbt-btn" 
            onClick={() => setShowReportCardModal(true)}
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
              color: '#ffffff',
              fontWeight: 700,
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 12px rgba(236, 72, 153, 0.3)'
            }}
          >
            <Printer size={16} /> Print Report Card for Mama 🩷
          </button>

          <button className="cbt-btn cbt-btn-primary" onClick={onRetake}>
            <RotateCcw size={16} /> Re-Attempt Test
          </button>
        </div>
      </div>

      {/* ---------------- 500+ SCORE CELEBRATION BANNER ---------------- */}
      {isCelebrationScore && (
        <div 
          style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 35%, #fbcfe8 75%, #ffe4e6 100%)',
            border: '2px solid #f59e0b',
            borderRadius: '16px',
            padding: '1.25rem 1.75rem',
            marginBottom: '1.5rem',
            boxShadow: '0 12px 30px -5px rgba(245, 158, 11, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            animation: 'popupCardZoom 0.4s ease-out'
          }}
        >
          <div style={{
            fontSize: '2.5rem',
            width: '60px',
            height: '60px',
            background: '#ffffff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.25)',
            flexShrink: 0
          }}>
            🎉
          </div>
          <div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#92400e', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span>OUTSTANDING SCORE! 500+ MARKS! 🌟</span>
            </div>
            <div style={{ fontSize: '1.02rem', fontWeight: 600, color: '#831843', marginTop: '0.25rem', lineHeight: 1.4 }}>
              Kamaal kar diya Aparnavatiii! 💖 Excellent NEET Qualifying Level Performance! Proud of you 🫂✨
            </div>
          </div>
        </div>
      )}

      {/* Main Scorecard Banner */}
      <div className="cbt-card" style={{ marginBottom: '1.5rem', borderTop: '4px solid var(--secondary-blue)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              CBT Score Report
            </div>
            <h1 style={{ fontSize: '1.6rem', color: 'var(--text-heading)', marginTop: '0.2rem', marginBottom: '0.3rem' }}>
              {candidateName} (Roll: {rollNo})
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Test: <strong>{testTitle}</strong> • Time Taken: {timeMins} Mins
            </p>

            {tabSwitchCount > 0 && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.6rem', padding: '0.3rem 0.65rem', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 600 }}>
                <ShieldAlert size={14} /> Security Infractions Recorded: {tabSwitchCount} window/tab switch warnings
              </div>
            )}
          </div>

          {/* Big Score Box */}
          <div style={{ backgroundColor: 'var(--bg-subtle)', border: '2px solid var(--border-main)', borderRadius: '6px', padding: '1rem 1.75rem', textAlign: 'center', minWidth: '180px' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              FINAL SCORE
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: score >= 0 ? '#16a34a' : '#d32f2f' }}>
              {score}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              out of {totalMarks} ({percentage}%)
            </div>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CORRECT (+4)</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#16a34a' }}>{correctCount}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>INCORRECT (-1)</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#d32f2f' }}>{incorrectCount}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>UNATTEMPTED (0)</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-muted)' }}>{unattemptedCount}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ACCURACY</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-blue)' }}>{accuracy}%</div>
          </div>
        </div>
      </div>

      {/* Detailed Question Review with Official SQL Answer Key */}
      <div className="cbt-card">
        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-heading)', marginBottom: '0.8rem', borderBottom: '1px solid var(--border-main)', paddingBottom: '0.5rem' }}>
          Question-by-Question Evaluation against Official SQL Answer Key
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {details.map((q) => {
            let statusText = 'Unattempted (0 Marks)';
            let statusColor = 'var(--text-muted)';
            let borderColor = 'var(--border-main)';

            if (q.isAttempted) {
              if (q.isCorrect) {
                statusText = 'Correct (+4 Marks)';
                statusColor = '#16a34a';
                borderColor = 'rgba(22, 163, 74, 0.4)';
              } else {
                statusText = 'Incorrect (-1 Mark)';
                statusColor = '#ef4444';
                borderColor = 'rgba(239, 68, 68, 0.4)';
              }
            }

            return (
              <div 
                key={q.qNumber}
                style={{ 
                  border: `1px solid ${borderColor}`,
                  borderRadius: '6px',
                  padding: '1rem',
                  backgroundColor: 'var(--bg-card)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-heading)' }}>
                    Q{q.qNumber}. [{q.subject || 'General'}]
                  </span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: statusColor }}>
                    {statusText}
                  </span>
                </div>

                {/* Question Image (if available) */}
                {q.imageUrl && (
                  <div style={{ marginBottom: '0.75rem', maxWidth: '440px' }}>
                    <div style={{ backgroundColor: '#ffffff', padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--border-main)', display: 'inline-block' }}>
                      <img 
                        src={q.imageUrl} 
                        alt={`Question ${q.qNumber}`} 
                        style={{ maxWidth: '100%', maxHeight: '280px', objectFit: 'contain', display: 'block' }} 
                      />
                    </div>
                  </div>
                )}

                {(!q.imageUrl || (q.questionText && !q.questionText.startsWith('Question '))) && (
                  <div style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                    {q.questionText}
                  </div>
                )}

                {/* Candidate choice vs Official Key */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.86rem' }}>
                  {q.options && q.options.map((opt, optIdx) => {
                    const isOfficialKey = optIdx === q.correctOption;
                    const isCandidateChoice = optIdx === q.selectedOption;

                    let bg = 'var(--bg-subtle)';
                    let border = '1px solid var(--border-subtle)';
                    let text = 'var(--text-main)';

                    if (isOfficialKey) {
                      bg = 'rgba(22, 163, 74, 0.15)';
                      border = '2px solid #16a34a';
                      text = '#16a34a';
                    } else if (isCandidateChoice && !q.isCorrect) {
                      bg = 'rgba(239, 68, 68, 0.15)';
                      border = '2px solid #ef4444';
                      text = '#ef4444';
                    }

                    return (
                      <div 
                        key={optIdx}
                        style={{
                          padding: '0.5rem 0.75rem',
                          borderRadius: '4px',
                          border,
                          backgroundColor: bg,
                          color: text,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div>
                          <strong>({String.fromCharCode(65 + optIdx)})</strong> {opt}
                        </div>
                        {isOfficialKey && <span style={{ fontWeight: 700, fontSize: '0.75rem', color: '#16a34a' }}>✓ Official Key</span>}
                        {isCandidateChoice && !q.isCorrect && <span style={{ fontWeight: 700, fontSize: '0.75rem', color: '#ef4444' }}>✗ Candidate Choice</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Solution Explanation */}
                {q.explanation && (
                  <div style={{ backgroundColor: 'var(--bg-subtle)', borderLeft: '3px solid var(--secondary-blue)', padding: '0.65rem 0.85rem', fontSize: '0.84rem', color: 'var(--text-main)' }}>
                    <strong>Explanation: </strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------------- REPORT CARD FOR MAMA PRINT MODAL ---------------- */}
      <ReportCardModal 
        isOpen={showReportCardModal}
        onClose={() => setShowReportCardModal(false)}
        data={{
          candidateName,
          rollNo,
          testTitle,
          score,
          totalMarks,
          correctCount,
          incorrectCount,
          unattemptedCount,
          accuracy,
          submittedAt: submission.submitted_at || new Date().toISOString()
        }}
      />

    </div>
  );
}
