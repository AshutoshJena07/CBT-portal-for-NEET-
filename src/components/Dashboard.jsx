import React, { useState } from 'react';
import { 
  Play, 
  Award, 
  Clock, 
  FileText, 
  Target, 
  Sparkles, 
  Heart, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  Calendar,
  BookOpen,
  ChevronRight,
  RefreshCw,
  Plus
} from 'lucide-react';
import { MOTIVATIONAL_QUOTES } from '../data/mockTests';

export function Dashboard({ 
  mockTests, 
  onStartTest, 
  attempts, 
  onViewAttempt, 
  profile, 
  onOpenSettings,
  onOpenMistakes,
  onOpenCreator 
}) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
  };

  const currentQuote = MOTIVATIONAL_QUOTES[quoteIndex];

  // Calculate stats
  const totalTests = attempts.length;
  const bestScore = attempts.reduce((max, a) => Math.max(max, a.score), 0);
  const avgAccuracy = attempts.length 
    ? Math.round(attempts.reduce((sum, a) => sum + a.accuracy, 0) / attempts.length) 
    : 0;

  return (
    <div className="container" style={{ padding: '2rem 1.25rem 4rem' }}>
      {/* Hero Encouragement Banner */}
      <div 
        className="glass-card" 
        style={{ 
          background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.12), rgba(168, 85, 247, 0.12), rgba(16, 185, 129, 0.08))',
          borderColor: 'rgba(56, 189, 248, 0.35)',
          padding: '2rem',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ maxWidth: '780px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-cyan">Mission NEET 🩺</span>
              <span className="badge badge-emerald">Candidate: {profile.name}</span>
              <span className="badge badge-rose" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <Heart size={12} fill="#fb7185" /> Made with Love
              </span>
            </div>
            
            <h1 style={{ fontSize: '2.1rem', marginBottom: '0.6rem', color: '#ffffff', letterSpacing: '-0.02em' }}>
              Welcome Future <span style={{ background: 'linear-gradient(90deg, #38bdf8, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Doctor {profile.name}</span> 🩺
            </h1>
            
            <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              {profile.personalNote || 'Hard work never goes unrewarded. Every mock test you practice here strengthens your speed, accuracy, and confidence for the official NEET exam!'}
            </p>

            {/* Motivational Quote Box */}
            <div 
              style={{ 
                background: 'rgba(15, 23, 42, 0.65)', 
                borderLeft: '4px solid #38bdf8', 
                borderRadius: '0 8px 8px 0',
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
              }}
            >
              <div style={{ fontStyle: 'italic', fontSize: '0.92rem', color: '#e2e8f0' }}>
                "{currentQuote.quote}" — <span style={{ color: '#38bdf8', fontWeight: 600 }}>{currentQuote.author}</span>
              </div>
              <button 
                onClick={nextQuote} 
                className="btn btn-secondary btn-sm"
                title="Next motivation quote"
                style={{ padding: '0.3rem 0.6rem', flexShrink: 0 }}
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>

          {/* Quick Target Box */}
          <div 
            style={{ 
              background: 'rgba(15, 23, 42, 0.8)', 
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '16px',
              padding: '1.25rem',
              minWidth: '240px',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
              Target Milestone
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-heading)' }}>
              680+ <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 500 }}>/ 720</span>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#10b981', fontWeight: 600, marginTop: '0.2rem' }}>
              🎯 {profile.targetCollege || 'Top GMC Seat'}
            </div>
            <button 
              className="btn btn-secondary btn-sm" 
              onClick={onOpenSettings}
              style={{ marginTop: '0.85rem', width: '100%', fontSize: '0.8rem' }}
            >
              Edit Profile & Target
            </button>
          </div>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Mock Tests Given</span>
            <FileText size={20} color="#38bdf8" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>{totalTests}</div>
          <div style={{ fontSize: '0.76rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.25rem' }}>
            <TrendingUp size={14} /> Full simulation history saved
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Personal Best Score</span>
            <Award size={20} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b' }}>
            {bestScore > 0 ? `${bestScore} ` : '—'}
            {bestScore > 0 && <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>/ 720</span>}
          </div>
          <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            {bestScore >= 600 ? '🔥 Outstanding performance!' : 'Keep practicing regularly'}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Average Accuracy</span>
            <Target size={20} color="#10b981" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>
            {avgAccuracy ? `${avgAccuracy}%` : '—'}
          </div>
          <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            Aim for 90%+ to avoid negative marks
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', cursor: 'pointer' }} onClick={onOpenMistakes}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Mistake Notebook</span>
            <BookOpen size={20} color="#a855f7" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#a855f7' }}>
            Revision
          </div>
          <div style={{ fontSize: '0.76rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.25rem' }}>
            Click to revise mistakes <ChevronRight size={13} />
          </div>
        </div>
      </div>

      {/* Available NEET Mock Tests Section */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', color: '#ffffff' }}>Official NEET CBT Mock Tests</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>
              Real NTA exam pattern with +4 / -1 negative marking, countdown timer, and authentic question palette.
            </p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={onOpenCreator}>
            <Plus size={16} /> Create Custom Test
          </button>
        </div>

        <div className="grid-3">
          {mockTests.map((test) => (
            <div 
              key={test.id} 
              className="glass-card"
              style={{ 
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s, border-color 0.2s',
                borderColor: test.category === 'Full Mock' ? 'rgba(56, 189, 248, 0.4)' : 'var(--border-color)',
                position: 'relative'
              }}
            >
              {test.category === 'Full Mock' && (
                <div 
                  style={{ 
                    position: 'absolute', 
                    top: '-10px', 
                    right: '16px',
                    background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                    color: '#ffffff',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    boxShadow: '0 2px 8px rgba(37,99,235,0.4)'
                  }}
                >
                  FULL 720 MARKS
                </div>
              )}

              <div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  {test.tags && test.tags.map((tag, i) => (
                    <span key={i} className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '0.35rem', lineHeight: '1.3' }}>
                  {test.title}
                </h3>
                
                <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '1.2rem', minHeight: '38px' }}>
                  {test.subtitle || test.description}
                </p>

                {/* Test Meta Info */}
                <div 
                  style={{ 
                    background: 'rgba(15, 23, 42, 0.5)', 
                    borderRadius: '10px', 
                    padding: '0.75rem', 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.5rem',
                    textAlign: 'center',
                    marginBottom: '1.25rem'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>QUESTIONS</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>
                      {test.questions.length} Qs
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>DURATION</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#38bdf8' }}>
                      {test.durationMinutes} min
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>MAX MARKS</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#10b981' }}>
                      {test.totalMarks}
                    </div>
                  </div>
                </div>
              </div>

              {/* Start Test Action */}
              <button 
                className="btn btn-primary" 
                style={{ width: '100%' }}
                onClick={() => onStartTest(test)}
              >
                <Play size={16} /> Start Official CBT Exam
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Past Mock Attempts & Analysis History */}
      <div>
        <h2 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={20} color="#38bdf8" /> Recent Mock Exam Performance
        </h2>

        {attempts.length === 0 ? (
          <div 
            className="glass-card" 
            style={{ 
              padding: '2.5rem', 
              textAlign: 'center',
              color: '#94a3b8'
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>📝</div>
            <h3 style={{ color: '#ffffff', marginBottom: '0.4rem' }}>No mock tests attempted yet</h3>
            <p style={{ fontSize: '0.88rem', maxWidth: '460px', margin: '0 auto 1.25rem' }}>
              Start any mock test above to experience the authentic NTA NEET CBT exam room. Detailed scorecards, accuracy stats, and step-by-step NCERT solutions will appear here.
            </p>
            <button 
              className="btn btn-emerald" 
              onClick={() => onStartTest(mockTests[0])}
            >
              Take First Mock Test (NEET Grand Mock)
            </button>
          </div>
        ) : (
          <div className="glass-card" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: '#94a3b8', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.9rem 1.25rem' }}>Test Name</th>
                  <th style={{ padding: '0.9rem 1rem' }}>Score</th>
                  <th style={{ padding: '0.9rem 1rem' }}>Accuracy</th>
                  <th style={{ padding: '0.9rem 1rem' }}>Time Taken</th>
                  <th style={{ padding: '0.9rem 1rem' }}>Date</th>
                  <th style={{ padding: '0.9rem 1.25rem', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((att, idx) => (
                  <tr 
                    key={idx} 
                    style={{ 
                      borderBottom: idx !== attempts.length - 1 ? '1px solid rgba(51, 65, 85, 0.5)' : 'none',
                      fontSize: '0.9rem'
                    }}
                  >
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: '#f8fafc' }}>
                      {att.testTitle}
                    </td>
                    <td style={{ padding: '1rem 1rem' }}>
                      <span style={{ fontWeight: 800, color: att.score >= 550 ? '#10b981' : '#f59e0b' }}>
                        {att.score}
                      </span>
                      <span style={{ color: '#64748b', fontSize: '0.8rem' }}> / {att.totalMarks}</span>
                    </td>
                    <td style={{ padding: '1rem 1rem' }}>
                      <span className={`badge ${att.accuracy >= 80 ? 'badge-emerald' : 'badge-amber'}`}>
                        {att.accuracy}%
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1rem', color: '#94a3b8' }}>
                      {att.timeSpentMinutes || '< 1'} min
                    </td>
                    <td style={{ padding: '1rem 1rem', color: '#64748b', fontSize: '0.82rem' }}>
                      {new Date(att.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => onViewAttempt(att)}
                        style={{ fontSize: '0.8rem' }}
                      >
                        View Analysis & Solutions
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
