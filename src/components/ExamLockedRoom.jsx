import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  ShieldAlert, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft,
  Maximize2,
  AlertTriangle,
  FileText,
  X,
  Columns,
  Sun,
  Moon
} from 'lucide-react';

export function ExamLockedRoom({ test, candidate, theme = 'light', onToggleTheme, onExamSubmitted, onExitExam }) {
  const isDark = theme === 'dark';
  const questions = test.questions || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [responses, setResponses] = useState({}); // { [qNumber]: selectedOptionIdx }
  const [questionStatus, setQuestionStatus] = useState({}); // { [qNumber]: status }
  const [selectedOpt, setSelectedOpt] = useState(null);

  // Exact Official Exam Timer (3 hours = 180 mins = 10,800 seconds)
  const totalSeconds = (test.duration_minutes || 180) * 60;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  // Security / Anti-Cheat State
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [securityModalOpen, setSecurityModalOpen] = useState(false);
  const [securityMessage, setSecurityMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // PDF Booklet View state (Side-by-side or modal)
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [splitPdfView, setSplitPdfView] = useState(false);

  // Subject Tabs
  const subjects = Array.from(new Set(questions.map((q) => q.subject || 'General')));
  const [activeSubject, setActiveSubject] = useState(questions[0]?.subject || 'Botany');

  const currentQ = questions[currentIdx] || {};

  // 1. Force Fullscreen on Mount
  const enterFullscreen = () => {
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
      setSecurityModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    enterFullscreen();

    // Initialize Question Statuses
    const initStatus = {};
    questions.forEach((q, idx) => {
      initStatus[q.qNumber] = idx === 0 ? 'not_answered' : 'not_visited';
    });
    setQuestionStatus(initStatus);

    // 2. Strict Security: Block Inspect, Screenshots, Right-Click, Shortcuts
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    const handleKeyDown = (e) => {
      // Block F12 (Inspect)
      if (e.key === 'F12') {
        e.preventDefault();
        e.stopPropagation();
        triggerSecurityViolation('Developer Tools / F12 inspect is strictly blocked!');
        return false;
      }

      // Block Ctrl + Shift + I / J / C (DevTools)
      if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) {
        e.preventDefault();
        e.stopPropagation();
        triggerSecurityViolation('Developer Tools shortcut is disabled!');
        return false;
      }

      // Block Ctrl + U (View Source), Ctrl + S (Save), Ctrl + P (Print)
      if (e.ctrlKey && ['U', 'S', 'P'].includes(e.key.toUpperCase())) {
        e.preventDefault();
        e.stopPropagation();
        triggerSecurityViolation('Source view and printing are disabled!');
        return false;
      }

      // Block Screenshot / PrintScreen
      if (e.key === 'PrintScreen' || e.key === 'Snapshot') {
        e.preventDefault();
        try {
          if (navigator.clipboard) {
            navigator.clipboard.writeText('');
          }
        } catch (err) {}
        triggerSecurityViolation('Screenshots are strictly prohibited in the exam!');
        return false;
      }

      // Intercept Escape key
      if (e.key === 'Escape') {
        e.preventDefault();
      }
    };

    // 3. Detect Fullscreen Exit
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        triggerSecurityViolation('Fullscreen exited! You must stay in Fullscreen during the test.');
      }
    };

    // 4. Detect Tab Switch / Window Blur
    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerSecurityViolation('Tab switch detected! Leaving the exam tab is prohibited.');
      }
    };

    const handleWindowBlur = () => {
      triggerSecurityViolation('Window unfocused! Please keep your exam window active.');
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, []);

  const triggerSecurityViolation = (reason) => {
    setTabSwitchCount((prev) => {
      const newCount = prev + 1;
      setSecurityMessage(`${reason} (Warning ${newCount} of 3)`);
      setSecurityModalOpen(true);

      if (newCount >= 3) {
        setTimeout(() => {
          submitExamToServer(newCount);
        }, 1000);
      }
      return newCount;
    });
  };

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitExamToServer(tabSwitchCount);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [tabSwitchCount]);

  // Sync selected option when question changes
  useEffect(() => {
    if (currentQ.qNumber) {
      const existing = responses[currentQ.qNumber];
      setSelectedOpt(existing !== undefined ? existing : null);

      setQuestionStatus((prev) => {
        if (prev[currentQ.qNumber] === 'not_visited') {
          return { ...prev, [currentQ.qNumber]: 'not_answered' };
        }
        return prev;
      });

      if (currentQ.subject && currentQ.subject !== activeSubject) {
        setActiveSubject(currentQ.subject);
      }
    }
  }, [currentIdx]);

  // Action: Save & Next
  const handleSaveAndNext = () => {
    if (selectedOpt !== null) {
      setResponses((prev) => ({ ...prev, [currentQ.qNumber]: selectedOpt }));
      setQuestionStatus((prev) => ({ ...prev, [currentQ.qNumber]: 'answered' }));
    }
    goToNext();
  };

  // Action: Mark for Review & Next
  const handleMarkReview = () => {
    if (selectedOpt !== null) {
      setResponses((prev) => ({ ...prev, [currentQ.qNumber]: selectedOpt }));
      setQuestionStatus((prev) => ({ ...prev, [currentQ.qNumber]: 'ans_marked' }));
    } else {
      setQuestionStatus((prev) => ({ ...prev, [currentQ.qNumber]: 'marked' }));
    }
    goToNext();
  };

  // Action: Clear Response
  const handleClear = () => {
    setSelectedOpt(null);
    setResponses((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.qNumber];
      return copy;
    });
    setQuestionStatus((prev) => ({ ...prev, [currentQ.qNumber]: 'not_answered' }));
  };

  const goToNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const goToPrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const jumpToSubject = (subj) => {
    setActiveSubject(subj);
    const firstIdx = questions.findIndex((q) => q.subject === subj);
    if (firstIdx !== -1) {
      setCurrentIdx(firstIdx);
    }
  };

  // Submit Exam to Backend (Evaluated against SQL Answer Key)
  const submitExamToServer = async (warningsCount = tabSwitchCount) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }

      const res = await fetch('/api/submit-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testId: test.id,
          candidateName: candidate.name || 'Candidate',
          rollNo: candidate.rollNo || 'NEET-001',
          responses,
          timeSpentSeconds: totalSeconds - timeLeft,
          tabSwitchCount: warningsCount
        })
      });

      const data = await res.json();
      if (data.success) {
        onExamSubmitted(data.submission);
      } else {
        alert('Submission error: ' + data.message);
      }
    } catch (err) {
      console.error('Failed to submit:', err);
      alert('Error connecting to backend server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimer = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const pdfUrl = test.pdf_url || '/papers/E1_KANHA.pdf';

  // Status counts for palette
  const answeredCount = Object.values(questionStatus).filter((s) => s === 'answered' || s === 'ans_marked').length;
  const notAnsweredCount = Object.values(questionStatus).filter((s) => s === 'not_answered').length;
  const markedCount = Object.values(questionStatus).filter((s) => s === 'marked').length;
  const notVisitedCount = Object.values(questionStatus).filter((s) => s === 'not_visited').length;

  return (
    <div className="exam-locked-mode" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: isDark ? '#090d16' : '#f1f5f9' }}>
      
      {/* ---------------- OFFICIAL NTA EXAM HEADER ---------------- */}
      <header style={{ backgroundColor: isDark ? '#0f172a' : '#244982', color: '#ffffff', padding: '0.5rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isDark ? '3px solid #3b82f6' : '3px solid #ff9800' }}>
        <div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
            {test.title}
          </div>
          <div style={{ fontSize: '0.78rem', color: isDark ? '#93c5fd' : '#bbdefb' }}>
            CBT based portal
          </div>
        </div>

        {/* Action Controls & Timer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Theme Toggle Button in Exam Room */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              style={{
                backgroundColor: 'rgba(255,255,255,0.18)',
                color: '#ffffff',
                border: 'none',
                padding: '0.35rem 0.75rem',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun size={15} style={{ color: '#fde047' }} /> : <Moon size={15} />}
              <span>{isDark ? 'Light' : 'Dark'}</span>
            </button>
          )}

          {/* PDF Split View Toggle Button */}
          <button
            onClick={() => setSplitPdfView(!splitPdfView)}
            style={{
              backgroundColor: splitPdfView ? '#ff9800' : 'rgba(255,255,255,0.18)',
              color: '#ffffff',
              border: 'none',
              padding: '0.35rem 0.75rem',
              borderRadius: '4px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
            title="Toggle Split PDF Booklet View"
          >
            <Columns size={15} />
            <span>{splitPdfView ? 'Hide PDF' : 'Split PDF'}</span>
          </button>

          <button
            onClick={() => setShowPdfModal(true)}
            style={{
              backgroundColor: 'rgba(255,255,255,0.18)',
              color: '#ffffff',
              border: 'none',
              padding: '0.35rem 0.75rem',
              borderRadius: '4px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <FileText size={15} />
            <span>Full PDF</span>
          </button>

          <div style={{ textAlign: 'right', fontSize: '0.82rem', lineHeight: 1.2 }}>
            <div>Candidate: <strong>{candidate.name || 'Candidate'}</strong></div>
            <div style={{ color: isDark ? '#93c5fd' : '#bbdefb' }}>Roll: {candidate.rollNo || 'NEET-001'} | Node: C042</div>
          </div>

          <div style={{ backgroundColor: timeLeft < 900 ? '#d32f2f' : '#1b5e20', padding: '0.4rem 0.85rem', borderRadius: '4px', fontWeight: 700, fontSize: '1.05rem', fontFamily: 'monospace' }}>
            Time Left: {formatTimer(timeLeft)}
          </div>
        </div>
      </header>

      {/* ---------------- SUBJECT SECTIONS TABS (BOTANY, ZOOLOGY, CHEMISTRY, PHYSICS) ---------------- */}
      <div style={{ backgroundColor: isDark ? '#090d16' : '#1e3a8a', padding: '0.35rem 1.25rem', display: 'flex', gap: '0.5rem', borderBottom: isDark ? '1px solid #1e293b' : '1px solid #0f172a' }}>
        {subjects.map((subj) => {
          const isAct = activeSubject === subj;
          const subjQs = questions.filter((q) => q.subject === subj);
          const answeredInSubj = subjQs.filter((q) => questionStatus[q.qNumber] === 'answered' || questionStatus[q.qNumber] === 'ans_marked').length;

          return (
            <button
              key={subj}
              onClick={() => jumpToSubject(subj)}
              style={{
                backgroundColor: isAct ? (isDark ? '#2563eb' : '#ffffff') : (isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.15)'),
                color: isAct ? (isDark ? '#ffffff' : '#1e3a8a') : '#ffffff',
                border: 'none',
                borderRadius: '4px',
                padding: '0.4rem 0.85rem',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <span>{subj}</span>
              <span style={{ fontSize: '0.72rem', padding: '0.1rem 0.35rem', borderRadius: '999px', backgroundColor: isAct ? (isDark ? '#1e3a8a' : '#1e3a8a') : 'rgba(0,0,0,0.3)', color: '#ffffff' }}>
                {answeredInSubj}/{subjQs.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* ---------------- SECURITY WARNING STRIP (IF INFRACTIONS OCCUR) ---------------- */}
      {tabSwitchCount > 0 && (
        <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '0.4rem 1rem', fontSize: '0.82rem', fontWeight: 600, borderBottom: '1px solid #ffcdd2', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle size={16} />
          <span>Security Alert: {tabSwitchCount} / 3 window/tab switch warnings recorded. 3 warnings will result in auto-submission!</span>
        </div>
      )}

      {/* ---------------- MAIN EXAM AREA ---------------- */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* OPTIONAL SPLIT PDF VIEW */}
        {splitPdfView && (
          <div style={{ flex: 1.1, borderRight: '2px solid #cbd5e1', backgroundColor: '#334155', display: 'flex', flexDirection: 'column' }}>
            <iframe 
              src={`${pdfUrl}#toolbar=0&navpanes=0`} 
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="Official Question Paper PDF"
            />
          </div>
        )}

        {/* QUESTION CONTENT */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1.25rem', backgroundColor: isDark ? '#0f172a' : '#ffffff', overflowY: 'auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0', paddingBottom: '0.6rem', marginBottom: '1.2rem' }}>
            <div>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: isDark ? '#93c5fd' : '#1e3a8a' }}>
                Question {currentQ.qNumber || currentIdx + 1}
              </span>
              <span style={{ marginLeft: '0.6rem', fontSize: '0.84rem', fontWeight: 600, color: isDark ? '#60a5fa' : '#2563eb' }}>
                [{currentQ.subject || 'General'}]
              </span>
            </div>
            <div style={{ fontSize: '0.82rem', color: isDark ? '#94a3b8' : '#475569' }}>
              Marking Scheme: <strong style={{ color: '#2e7d32' }}>+4</strong> for correct, <strong style={{ color: '#d32f2f' }}>-1</strong> for wrong
            </div>
          </div>

          {/* Authentic Question Crop from PDF (if available) */}
          {currentQ.imageUrl && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div 
                style={{ 
                  backgroundColor: '#ffffff', 
                  border: isDark ? '2px solid #3b82f6' : '1px solid #cbd5e1', 
                  borderRadius: '8px', 
                  padding: '0.75rem', 
                  display: 'inline-block',
                  maxWidth: '100%',
                  boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.5)' : '0 1px 3px rgba(0,0,0,0.06)'
                }}
              >
                <img 
                  src={currentQ.imageUrl} 
                  alt={`Question ${currentQ.qNumber}`}
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '480px', 
                    objectFit: 'contain', 
                    display: 'block' 
                  }} 
                />
              </div>
            </div>
          )}

          {/* Textual Question (if no image or for text-based questions) */}
          {(!currentQ.imageUrl || (currentQ.questionText && !currentQ.questionText.startsWith('Question '))) && (
            <div style={{ fontSize: '1.05rem', lineHeight: 1.6, color: isDark ? '#f8fafc' : '#1e293b', marginBottom: '1.25rem', whiteSpace: 'pre-line' }}>
              {currentQ.questionText}
            </div>
          )}

          {/* Radio Options Header */}
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: isDark ? '#94a3b8' : '#334155', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Choose Your Option:
          </div>

          {/* Radio Options with (1), (2), (3), (4) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
            {currentQ.options && currentQ.options.map((opt, optIdx) => {
              const isChecked = selectedOpt === optIdx;
              const optNumber = optIdx + 1;
              const hasText = opt && !opt.startsWith('(') && !opt.startsWith('Option');
              return (
                <label 
                  key={optIdx}
                  onClick={() => setSelectedOpt(optIdx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    border: isChecked 
                      ? (isDark ? '2px solid #3b82f6' : '2px solid #2563eb') 
                      : (isDark ? '1px solid #334155' : '1px solid #cbd5e1'),
                    borderRadius: '6px',
                    backgroundColor: isChecked 
                      ? (isDark ? '#1e293b' : '#eff6ff') 
                      : (isDark ? '#131c2e' : '#ffffff'),
                    boxShadow: isChecked 
                      ? (isDark ? '0 0 0 1px #3b82f6' : '0 0 0 1px #2563eb') 
                      : 'none',
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <input 
                    type="radio" 
                    name={`q-${currentQ.qNumber}`} 
                    checked={isChecked} 
                    onChange={() => setSelectedOpt(optIdx)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#2563eb' }}
                  />
                  <span style={{ fontSize: '0.95rem', color: isChecked ? (isDark ? '#93c5fd' : '#1e40af') : (isDark ? '#e2e8f0' : '#1e293b'), fontWeight: isChecked ? 700 : 500 }}>
                    <strong>Option ({optNumber})</strong>{hasText ? `: ${opt}` : ''}
                  </span>
                </label>
              );
            })}
          </div>

        </div>

        {/* RIGHT COLUMN: PALETTE */}
        <div style={{ width: '300px', backgroundColor: isDark ? '#090d16' : '#f8fafc', borderLeft: isDark ? '1px solid #1e293b' : '1px solid #cbd5e1', display: 'flex', flexDirection: 'column' }}>
          
          {/* Status Counts */}
          <div style={{ padding: '0.85rem', borderBottom: isDark ? '1px solid #1e293b' : '1px solid #cbd5e1', fontSize: '0.78rem', color: isDark ? '#cbd5e1' : '#1e293b' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span className="status-pill answered">{answeredCount}</span> Answered
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span className="status-pill not-answered">{notAnsweredCount}</span> Not Answered
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span className="status-pill not-visited">{notVisitedCount}</span> Not Visited
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span className="status-pill marked">{markedCount}</span> Review
              </div>
            </div>
          </div>

          {/* Numbers Grid */}
          <div style={{ padding: '0.85rem', flex: 1, overflowY: 'auto' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.6rem', color: isDark ? '#93c5fd' : '#334155' }}>
              {activeSubject} Questions Palette ({questions.filter(q => q.subject === activeSubject).length} Qs):
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.4rem' }}>
              {questions.map((q, idx) => {
                const status = questionStatus[q.qNumber] || 'not_visited';
                const isCur = idx === currentIdx;
                const isFilteredOut = activeSubject && q.subject !== activeSubject;

                if (isFilteredOut) return null;

                return (
                  <button
                    key={q.qNumber}
                    onClick={() => setCurrentIdx(idx)}
                    className={`status-pill ${status}`}
                    style={{
                      width: '100%',
                      height: '36px',
                      cursor: 'pointer',
                      border: isCur ? (isDark ? '2px solid #60a5fa' : '2px solid #000000') : '1px solid transparent',
                      outline: isCur ? (isDark ? '2px solid #3b82f6' : '2px solid #2563eb') : 'none'
                    }}
                  >
                    {q.qNumber}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ padding: '0.85rem', borderTop: isDark ? '1px solid #1e293b' : '1px solid #cbd5e1' }}>
            <button 
              className="cbt-btn cbt-btn-primary" 
              style={{ width: '100%', padding: '0.75rem', fontWeight: 700 }}
              onClick={() => {
                if (window.confirm('Are you sure you want to submit your test? Responses will be evaluated against the SQL answer key.')) {
                  submitExamToServer();
                }
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Evaluating...' : 'Submit Test'}
            </button>
          </div>
        </div>

      </div>

      {/* ---------------- BOTTOM ACTIONS ---------------- */}
      <footer style={{ backgroundColor: isDark ? '#090d16' : '#ffffff', borderTop: isDark ? '1px solid #1e293b' : '1px solid #cbd5e1', padding: '0.65rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button className="cbt-btn cbt-btn-success" onClick={handleSaveAndNext}>
            Save & Next <ChevronRight size={15} />
          </button>
          <button className="cbt-btn cbt-btn-secondary" onClick={handleClear}>
            <RotateCcw size={14} /> Clear Response
          </button>
          <button className="cbt-btn cbt-btn-purple" onClick={handleMarkReview}>
            Mark for Review & Next
          </button>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="cbt-btn cbt-btn-secondary" 
            disabled={currentIdx === 0} 
            onClick={goToPrev}
            style={{ opacity: currentIdx === 0 ? 0.4 : 1 }}
          >
            <ChevronLeft size={15} /> Previous
          </button>
          <button 
            className="cbt-btn cbt-btn-secondary" 
            disabled={currentIdx === questions.length - 1} 
            onClick={goToNext}
            style={{ opacity: currentIdx === questions.length - 1 ? 0.4 : 1 }}
          >
            Next <ChevronRight size={15} />
          </button>
        </div>
      </footer>

      {/* ---------------- FULL PDF BOOKLET MODAL ---------------- */}
      {showPdfModal && (
        <div className="security-alert-overlay" style={{ padding: '1rem' }}>
          <div style={{ background: '#ffffff', width: '95%', height: '92%', borderRadius: '6px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '0.6rem 1rem', background: '#1e3a8a', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                Official Question Paper Booklet PDF: {test.title}
              </div>
              <button 
                onClick={() => setShowPdfModal(false)}
                style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>
            <iframe 
              src={`${pdfUrl}#toolbar=0`} 
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="Official Booklet PDF"
            />
          </div>
        </div>
      )}

      {/* ---------------- SECURITY ENFORCEMENT OVERLAY MODAL ---------------- */}
      {securityModalOpen && (
        <div className="security-alert-overlay">
          <div className="security-alert-box">
            <div style={{ color: '#d32f2f', marginBottom: '0.5rem' }}>
              <ShieldAlert size={48} style={{ margin: '0 auto' }} />
            </div>
            <h2 style={{ fontSize: '1.25rem', color: '#b71c1c', marginBottom: '0.5rem' }}>
              Security Protocol Violation!
            </h2>
            <p style={{ color: '#334155', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              {securityMessage}
              <br />
              Leaving fullscreen, switching tabs, taking screenshots, or opening developer tools is strictly prohibited during this examination.
            </p>
            <button 
              className="cbt-btn cbt-btn-danger" 
              style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem' }}
              onClick={enterFullscreen}
            >
              <Maximize2 size={16} /> Return to Fullscreen Exam Mode
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
