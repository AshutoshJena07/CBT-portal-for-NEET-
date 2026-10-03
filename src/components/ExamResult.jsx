import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  RotateCcw, 
  ArrowLeft, 
  Bookmark, 
  BookmarkCheck,
  Share2, 
  Sparkles, 
  Heart, 
  Printer, 
  TrendingUp,
  Target,
  Clock,
  Layers,
  HelpCircle,
  BookOpen
} from 'lucide-react';

export function ExamResult({ 
  result, 
  profile, 
  onRetakeTest, 
  onBackToDashboard, 
  onToggleBookmark,
  bookmarkedIds 
}) {
  const [filter, setFilter] = useState('all'); // 'all', 'incorrect', 'unattempted', 'correct', 'bookmarked'
  const questions = result.questions || [];
  const userAnswers = result.userAnswers || {};

  // Trigger celebration confetti
  useEffect(() => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  // Compute metrics
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  const subjectStats = {};

  questions.forEach((q) => {
    const userAns = userAnswers[q.id];
    const isAttempted = userAns !== undefined && userAns !== null;
    const isCorrect = isAttempted && userAns === q.correctAnswer;

    if (!subjectStats[q.subject]) {
      subjectStats[q.subject] = {
        total: 0,
        correct: 0,
        incorrect: 0,
        unattempted: 0,
        score: 0
      };
    }
    subjectStats[q.subject].total += 1;

    if (!isAttempted) {
      unattemptedCount += 1;
      subjectStats[q.subject].unattempted += 1;
    } else if (isCorrect) {
      correctCount += 1;
      subjectStats[q.subject].correct += 1;
      subjectStats[q.subject].score += 4;
    } else {
      incorrectCount += 1;
      subjectStats[q.subject].incorrect += 1;
      subjectStats[q.subject].score -= 1;
    }
  });

  const totalScore = (correctCount * 4) - (incorrectCount * 1);
  const totalPossible = questions.length * 4;
  const accuracy = (correctCount + incorrectCount) > 0 
    ? Math.round((correctCount / (correctCount + incorrectCount)) * 100) 
    : 0;

  // Filtered review questions
  const filteredQuestions = questions.filter((q) => {
    const userAns = userAnswers[q.id];
    const isAttempted = userAns !== undefined && userAns !== null;
    const isCorrect = isAttempted && userAns === q.correctAnswer;
    const isBookmarked = bookmarkedIds.includes(q.id);

    if (filter === 'incorrect') return isAttempted && !isCorrect;
    if (filter === 'unattempted') return !isAttempted;
    if (filter === 'correct') return isCorrect;
    if (filter === 'bookmarked') return isBookmarked;
    return true; // 'all'
  });

  // Predicted rank message
  const getRankAssessment = () => {
    const scorePct = (totalScore / totalPossible) * 100;
    if (scorePct >= 85) return { rank: 'AIR < 1,000', badge: 'Top AIIMS & Govt Medical College', color: '#10b981' };
    if (scorePct >= 70) return { rank: 'AIR 1,000 - 8,000', badge: 'Premier State Govt Medical College', color: '#38bdf8' };
    if (scorePct >= 55) return { rank: 'AIR 8,000 - 25,000', badge: 'Govt Medical College MBBS Seat', color: '#f59e0b' };
    return { rank: 'Qualification Zone', badge: 'Keep grinding, victory is near!', color: '#a855f7' };
  };

  const assessment = getRankAssessment();

  const printScorecard = () => {
    window.print();
  };

  return (
    <div className="container" style={{ padding: '2rem 1.25rem 5rem' }}>
      
      {/* Top Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button className="btn btn-secondary btn-sm" onClick={onBackToDashboard}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button className="btn btn-secondary btn-sm" onClick={printScorecard}>
            <Printer size={16} /> Print / Save Scorecard
          </button>
          <button className="btn btn-emerald btn-sm" onClick={onRetakeTest}>
            <RotateCcw size={16} /> Retake Test
          </button>
        </div>
      </div>

      {/* Hero Score Card */}
      <div 
        className="glass-card"
        style={{
          padding: '2.25rem',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95))',
          borderColor: 'rgba(56, 189, 248, 0.35)',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="badge badge-cyan">NEET (UG) CBT Scorecard</span>
              <span className="badge badge-emerald">{assessment.badge}</span>
            </div>

            <h1 style={{ fontSize: '2.2rem', color: '#ffffff', marginBottom: '0.4rem' }}>
              Bravo, Dr. {profile.name}! 🩺✨
            </h1>

            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', maxWidth: '640px', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              You completed <strong>{result.testTitle}</strong> in {result.timeSpentMinutes || 1} minutes.
              Review your weak areas, save tricky questions to your Mistake Notebook, and keep pushing forward!
            </p>

            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontSize: '0.9rem', fontWeight: 600 }}>
                <CheckCircle2 size={18} /> {correctCount} Correct (+{correctCount * 4})
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontSize: '0.9rem', fontWeight: 600 }}>
                <XCircle size={18} /> {incorrectCount} Incorrect (-{incorrectCount})
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600 }}>
                <AlertCircle size={18} /> {unattemptedCount} Unattempted
              </div>
            </div>
          </div>

          {/* Big Score Bubble */}
          <div 
            style={{ 
              background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%)',
              border: '2px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '20px',
              padding: '1.5rem 2.25rem',
              textAlign: 'center',
              minWidth: '220px',
              boxShadow: '0 10px 30px rgba(56, 189, 248, 0.2)'
            }}
          >
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              TOTAL NEET SCORE
            </div>
            <div style={{ fontSize: '3.2rem', fontWeight: 900, color: totalScore >= 500 ? '#10b981' : '#38bdf8', fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>
              {totalScore}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>
              out of {totalPossible} Marks
            </div>
            <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(51, 65, 85, 0.6)', fontSize: '0.85rem' }}>
              <span style={{ color: '#94a3b8' }}>Accuracy: </span>
              <strong style={{ color: accuracy >= 80 ? '#10b981' : '#f59e0b' }}>{accuracy}%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Subject-Wise Performance Breakdown */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layers size={20} color="#38bdf8" /> Subject-Wise Score Breakdown
        </h2>

        <div className="grid-4">
          {Object.keys(subjectStats).map((subj) => {
            const stat = subjectStats[subj];
            const maxSubjMarks = stat.total * 4;
            const subjAcc = (stat.correct + stat.incorrect) > 0 
              ? Math.round((stat.correct / (stat.correct + stat.incorrect)) * 100) 
              : 0;

            return (
              <div key={subj} className="glass-card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#ffffff' }}>{subj}</span>
                  <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>
                    {stat.score} / {maxSubjMarks} M
                  </span>
                </div>

                {/* Progress Meter Bar */}
                <div style={{ width: '100%', height: '8px', background: '#334155', borderRadius: '999px', overflow: 'hidden', marginBottom: '0.85rem' }}>
                  <div 
                    style={{ 
                      width: `${Math.max(0, Math.min(100, (stat.score / maxSubjMarks) * 100))}%`, 
                      height: '100%', 
                      background: 'linear-gradient(90deg, #0284c7, #10b981)',
                      borderRadius: '999px'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.3rem', fontSize: '0.75rem', textAlign: 'center' }}>
                  <div>
                    <div style={{ color: '#64748b' }}>Correct</div>
                    <div style={{ fontWeight: 700, color: '#10b981' }}>{stat.correct}</div>
                  </div>
                  <div>
                    <div style={{ color: '#64748b' }}>Wrong</div>
                    <div style={{ fontWeight: 700, color: '#ef4444' }}>{stat.incorrect}</div>
                  </div>
                  <div>
                    <div style={{ color: '#64748b' }}>Accuracy</div>
                    <div style={{ fontWeight: 700, color: '#f8fafc' }}>{subjAcc}%</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Negative Marking Impact Insight Box */}
      {incorrectCount > 0 && (
        <div 
          style={{ 
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            padding: '1.15rem 1.5rem',
            marginBottom: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div>
            <div style={{ color: '#f87171', fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <AlertCircle size={18} /> Negative Marking Alert: {incorrectCount} silly mistakes made!
            </div>
            <div style={{ color: '#cbd5e1', fontSize: '0.85rem', marginTop: '0.2rem' }}>
              You lost <strong>{incorrectCount} penalty marks</strong> + {incorrectCount * 4} potential marks = <strong>{incorrectCount * 5} marks swing</strong>!
              Filter by "Mistakes / Incorrect" below to understand why each option was wrong.
            </div>
          </div>
          <button 
            className="btn btn-outline-danger btn-sm"
            onClick={() => setFilter('incorrect')}
          >
            Review Mistakes ({incorrectCount})
          </button>
        </div>
      )}

      {/* Detailed Question Review & Solutions */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', color: '#ffffff' }}>Detailed NCERT Solutions & Answers</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
              Step-by-step explanations, key concepts, and NCERT citations.
            </p>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <button 
              className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilter('all')}
            >
              All ({questions.length})
            </button>
            <button 
              className={`btn btn-sm ${filter === 'incorrect' ? 'btn-outline-danger' : 'btn-secondary'}`}
              onClick={() => setFilter('incorrect')}
            >
              Mistakes ({incorrectCount})
            </button>
            <button 
              className={`btn btn-sm ${filter === 'unattempted' ? 'btn-secondary' : 'btn-secondary'}`}
              style={{ borderColor: filter === 'unattempted' ? '#94a3b8' : 'var(--border-color)' }}
              onClick={() => setFilter('unattempted')}
            >
              Unattempted ({unattemptedCount})
            </button>
            <button 
              className={`btn btn-sm ${filter === 'correct' ? 'btn-emerald' : 'btn-secondary'}`}
              onClick={() => setFilter('correct')}
            >
              Correct ({correctCount})
            </button>
            <button 
              className={`btn btn-sm ${filter === 'bookmarked' ? 'btn-purple' : 'btn-secondary'}`}
              onClick={() => setFilter('bookmarked')}
            >
              Bookmarked 🔖
            </button>
          </div>
        </div>

        {/* Question Solutions List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filteredQuestions.length === 0 ? (
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
              No questions found for the selected filter "{filter}".
            </div>
          ) : (
            filteredQuestions.map((q, idx) => {
              const userAns = userAnswers[q.id];
              const isAttempted = userAns !== undefined && userAns !== null;
              const isCorrect = isAttempted && userAns === q.correctAnswer;
              const isBookmarked = bookmarkedIds.includes(q.id);

              return (
                <div 
                  key={q.id}
                  className="glass-card"
                  style={{
                    padding: '1.5rem',
                    borderColor: !isAttempted 
                      ? 'var(--border-color)' 
                      : (isCorrect ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)')
                  }}
                >
                  {/* Question Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 800, color: '#38bdf8', fontSize: '1rem' }}>
                        Q{questions.findIndex(item => item.id === q.id) + 1}.
                      </span>
                      <span className="badge badge-cyan">{q.subject}</span>
                      {q.topic && <span className="badge badge-purple">{q.topic}</span>}
                      
                      {/* Status Tag */}
                      {!isAttempted ? (
                        <span className="badge" style={{ background: '#334155', color: '#cbd5e1' }}>Unattempted (0 M)</span>
                      ) : isCorrect ? (
                        <span className="badge badge-emerald">+4 Marks Correct</span>
                      ) : (
                        <span className="badge badge-rose">-1 Mark Wrong</span>
                      )}
                    </div>

                    {/* Bookmark to Mistake Notebook */}
                    <button 
                      onClick={() => onToggleBookmark(q)}
                      className="btn btn-secondary btn-sm"
                      title={isBookmarked ? "Remove from Mistake Notebook" : "Save to Mistake Notebook"}
                      style={{ 
                        color: isBookmarked ? '#a855f7' : '#94a3b8', 
                        borderColor: isBookmarked ? '#a855f7' : 'var(--border-color)',
                        fontSize: '0.78rem'
                      }}
                    >
                      {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                      <span>{isBookmarked ? 'Bookmarked' : 'Save for Revision'}</span>
                    </button>
                  </div>

                  {/* Question Text */}
                  <div style={{ fontSize: '1rem', color: '#f8fafc', lineHeight: 1.6, marginBottom: '1.25rem', whiteSpace: 'pre-line' }}>
                    {q.question}
                  </div>

                  {/* Options with Answer Highlighting */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', marginBottom: '1.25rem' }}>
                    {q.options && q.options.map((opt, optIdx) => {
                      const isOptionCorrect = optIdx === q.correctAnswer;
                      const isOptionUserChoice = userAns === optIdx;

                      let border = '1px solid var(--border-color)';
                      let bg = 'rgba(15, 23, 42, 0.4)';
                      let text = '#cbd5e1';

                      if (isOptionCorrect) {
                        border = '2px solid #10b981';
                        bg = 'rgba(16, 185, 129, 0.15)';
                        text = '#34d399';
                      } else if (isOptionUserChoice && !isCorrect) {
                        border = '2px solid #ef4444';
                        bg = 'rgba(239, 68, 68, 0.15)';
                        text = '#fca5a5';
                      }

                      return (
                        <div 
                          key={optIdx}
                          style={{
                            padding: '0.75rem 1rem',
                            borderRadius: '8px',
                            border,
                            backgroundColor: bg,
                            color: text,
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div>
                            <strong>({String.fromCharCode(65 + optIdx)})</strong> {opt}
                          </div>
                          {isOptionCorrect && <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981' }}>✓ Correct</span>}
                          {isOptionUserChoice && !isCorrect && <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ef4444' }}>✗ Your Choice</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Detailed Step-by-Step Explanation Box */}
                  <div 
                    style={{ 
                      background: 'rgba(15, 23, 42, 0.85)', 
                      borderLeft: '4px solid #38bdf8', 
                      borderRadius: '0 8px 8px 0',
                      padding: '1rem',
                      fontSize: '0.9rem',
                      color: '#cbd5e1',
                      lineHeight: 1.6
                    }}
                  >
                    <div style={{ fontWeight: 700, color: '#38bdf8', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <BookOpen size={16} /> NCERT Explanation & Solution:
                    </div>
                    <div style={{ whiteSpace: 'pre-line' }}>
                      {q.explanation}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
}
