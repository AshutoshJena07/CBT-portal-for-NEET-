import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  HelpCircle, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  AlertCircle, 
  RotateCcw, 
  Eye, 
  Maximize, 
  Minimize, 
  Check, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  X,
  Volume2,
  VolumeX,
  Layers,
  Heart
} from 'lucide-react';

export function CBTExamRoom({ test, profile, onSubmitExam, onExit }) {
  // Question statuses:
  // 'not_visited' (gray)
  // 'not_answered' (red)
  // 'answered' (green)
  // 'marked' (purple)
  // 'answered_and_marked' (purple with green dot)

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: selectedOptionIndex }
  const [questionStatus, setQuestionStatus] = useState({}); // { [questionId]: status }
  const [selectedOption, setSelectedOption] = useState(null);
  
  // Timer state
  const totalSeconds = (test.durationMinutes || 200) * 60;
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);
  const [timerWarning, setTimerWarning] = useState(false);
  
  // Modals & Views
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showQuestionPaperModal, setShowQuestionPaperModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [viewStyle, setViewStyle] = useState('nta'); // 'nta' (Official Gov) or 'modern' (Dark Glass)
  const [fontSize, setFontSize] = useState('normal'); // 'normal', 'large', 'xl'
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Active Subject / Section Tab
  const [activeSubject, setActiveSubject] = useState(null);

  const questions = test.questions || [];
  const currentQ = questions[currentIndex] || {};

  // Group questions by Subject / Section
  const subjectsList = Array.from(new Set(questions.map((q) => q.subject)));

  // Initialize status on mount
  useEffect(() => {
    const initialStatus = {};
    questions.forEach((q, idx) => {
      initialStatus[q.id] = idx === 0 ? 'not_answered' : 'not_visited';
    });
    setQuestionStatus(initialStatus);
    setActiveSubject(questions[0]?.subject || null);
  }, [test]);

  // Sync selectedOption when currentIndex changes
  useEffect(() => {
    const savedAns = userAnswers[currentQ.id];
    setSelectedOption(savedAns !== undefined ? savedAns : null);

    // If it was 'not_visited', mark it as 'not_answered'
    setQuestionStatus((prev) => {
      if (prev[currentQ.id] === 'not_visited') {
        return { ...prev, [currentQ.id]: 'not_answered' };
      }
      return prev;
    });

    if (currentQ.subject && currentQ.subject !== activeSubject) {
      setActiveSubject(currentQ.subject);
    }
  }, [currentIndex]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        if (prev <= 900) { // 15 mins warning
          setTimerWarning(true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Action: Save & Next
  const handleSaveAndNext = () => {
    if (selectedOption !== null) {
      setUserAnswers((prev) => ({ ...prev, [currentQ.id]: selectedOption }));
      setQuestionStatus((prev) => ({ ...prev, [currentQ.id]: 'answered' }));
    } else {
      setQuestionStatus((prev) => ({
        ...prev,
        [currentQ.id]: prev[currentQ.id] === 'answered' ? 'answered' : 'not_answered'
      }));
    }
    goToNextQuestion();
  };

  // Action: Mark for Review & Next
  const handleMarkForReviewAndNext = () => {
    if (selectedOption !== null) {
      setUserAnswers((prev) => ({ ...prev, [currentQ.id]: selectedOption }));
      setQuestionStatus((prev) => ({ ...prev, [currentQ.id]: 'answered_and_marked' }));
    } else {
      setQuestionStatus((prev) => ({ ...prev, [currentQ.id]: 'marked' }));
    }
    goToNextQuestion();
  };

  // Action: Clear Response
  const handleClearResponse = () => {
    setSelectedOption(null);
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
    setQuestionStatus((prev) => ({ ...prev, [currentQ.id]: 'not_answered' }));
  };

  const goToNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const jumpToQuestion = (index) => {
    setCurrentIndex(index);
  };

  // Status counts for palette
  const statusCounts = {
    answered: Object.values(questionStatus).filter((s) => s === 'answered').length,
    not_answered: Object.values(questionStatus).filter((s) => s === 'not_answered').length,
    not_visited: Object.values(questionStatus).filter((s) => s === 'not_visited').length,
    marked: Object.values(questionStatus).filter((s) => s === 'marked').length,
    answered_and_marked: Object.values(questionStatus).filter((s) => s === 'answered_and_marked').length
  };

  const handleAutoSubmit = () => {
    finalizeSubmission();
  };

  const finalizeSubmission = () => {
    setShowSubmitModal(false);
    const timeSpentSeconds = totalSeconds - secondsRemaining;
    onSubmitExam({
      testId: test.id,
      testTitle: test.title,
      totalMarks: test.totalMarks,
      durationMinutes: test.durationMinutes,
      timeSpentSeconds,
      timeSpentMinutes: Math.round(timeSpentSeconds / 60),
      userAnswers,
      questionStatus,
      questions
    });
  };

  const fontSizeClass = {
    normal: '1rem',
    large: '1.15rem',
    xl: '1.3rem'
  }[fontSize];

  return (
    <div 
      className={`cbt-exam-wrapper ${viewStyle === 'nta' ? 'nta-theme' : 'modern-theme'}`}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: viewStyle === 'nta' ? '#f1f5f9' : '#0b1120',
        color: viewStyle === 'nta' ? '#1e293b' : '#f8fafc',
        fontFamily: viewStyle === 'nta' ? 'Arial, Helvetica, sans-serif' : 'var(--font-main)'
      }}
    >
      {/* ---------------- OFFICIAL NTA HEADER ---------------- */}
      <header 
        style={{
          backgroundColor: viewStyle === 'nta' ? '#1e3a8a' : '#0f172a',
          color: '#ffffff',
          padding: '0.6rem 1.25rem',
          borderBottom: viewStyle === 'nta' ? '3px solid #f59e0b' : '1px solid #1e293b',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div 
            style={{ 
              background: '#ffffff', 
              color: '#1e3a8a', 
              fontWeight: 800, 
              padding: '0.25rem 0.6rem', 
              borderRadius: '4px',
              fontSize: '0.9rem'
            }}
          >
            NTA CBT
          </div>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.02em' }}>
              {test.title}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>
              National Eligibility cum Entrance Test (UG) Simulator
            </div>
          </div>
        </div>

        {/* Candidate Profile Details & Timer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          {/* Candidate Card */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              background: 'rgba(255,255,255,0.12)', 
              padding: '0.35rem 0.85rem', 
              borderRadius: '6px',
              fontSize: '0.82rem'
            }}
          >
            <div 
              style={{ 
                width: '34px', 
                height: '34px', 
                borderRadius: '4px', 
                background: '#ffffff', 
                color: '#1e3a8a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 700
              }}
            >
              {profile.avatarEmoji || '👩‍⚕️'}
            </div>
            <div>
              <div style={{ fontWeight: 700 }}>Candidate: {profile.name}</div>
              <div style={{ opacity: 0.85, fontSize: '0.72rem' }}>
                Roll No: {profile.rollNo} • Sys: C042
              </div>
            </div>
          </div>

          {/* Time Remaining Clock */}
          <div 
            style={{ 
              background: timerWarning ? '#dc2626' : '#047857', 
              padding: '0.45rem 1rem', 
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 700,
              fontSize: '1.1rem',
              fontFamily: 'monospace',
              boxShadow: timerWarning ? '0 0 14px rgba(220,38,38,0.7)' : 'none'
            }}
          >
            <Clock size={18} />
            <span>Time Left: {formatTimer(secondsRemaining)}</span>
          </div>

          {/* View Mode & Fullscreen */}
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button 
              onClick={() => setViewStyle(viewStyle === 'nta' ? 'modern' : 'nta')}
              className="btn btn-secondary btn-sm"
              title="Toggle between Official NTA and Modern Theme"
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.7rem' }}
            >
              <Layers size={14} />
              {viewStyle === 'nta' ? 'Modern Dark' : 'Official NTA'}
            </button>
            <button 
              onClick={toggleFullscreen}
              className="btn btn-secondary btn-sm"
              title="Toggle Fullscreen"
              style={{ padding: '0.35rem 0.5rem' }}
            >
              {isFullscreen ? <Minimize size={15} /> : <Maximize size={15} />}
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- SUBJECT SECTIONS NAV BAR ---------------- */}
      <div 
        style={{ 
          backgroundColor: viewStyle === 'nta' ? '#2563eb' : '#1e293b', 
          color: '#ffffff',
          padding: '0.4rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
          borderBottom: '1px solid rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {subjectsList.map((subj) => {
            const isActive = activeSubject === subj;
            const subjQuestions = questions.filter((q) => q.subject === subj);
            const answeredInSubj = subjQuestions.filter((q) => questionStatus[q.id] === 'answered' || questionStatus[q.id] === 'answered_and_marked').length;

            return (
              <button
                key={subj}
                onClick={() => {
                  setActiveSubject(subj);
                  const firstOfSubj = questions.findIndex((q) => q.subject === subj);
                  if (firstOfSubj !== -1) setCurrentIndex(firstOfSubj);
                }}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: isActive ? (viewStyle === 'nta' ? '#ffffff' : '#38bdf8') : 'rgba(255,255,255,0.15)',
                  color: isActive ? '#0f172a' : '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{subj}</span>
                <span 
                  style={{ 
                    fontSize: '0.72rem', 
                    padding: '0.1rem 0.4rem', 
                    borderRadius: '999px',
                    background: isActive ? '#0f172a' : 'rgba(0,0,0,0.25)',
                    color: isActive ? '#ffffff' : '#ffffff'
                  }}
                >
                  {answeredInSubj}/{subjQuestions.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Utility Buttons: Question Paper & Instructions */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setShowQuestionPaperModal(true)}
            style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: 'none' }}
          >
            <FileText size={15} /> Question Paper
          </button>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setShowInstructionsModal(true)}
            style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: 'none' }}
          >
            <HelpCircle size={15} /> Instructions
          </button>
        </div>
      </div>

      {/* ---------------- MAIN EXAM BODY (2 COLUMNS: QUESTION + PALETTE) ---------------- */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* LEFT COLUMN: QUESTION AREA */}
        <div 
          style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            overflowY: 'auto',
            padding: '1.25rem',
            backgroundColor: viewStyle === 'nta' ? '#ffffff' : '#0b1120'
          }}
        >
          {/* Question Subheader with Marking Scheme & Font Zoom */}
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              paddingBottom: '0.85rem',
              borderBottom: viewStyle === 'nta' ? '1px solid #e2e8f0' : '1px solid #1e293b',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span 
                style={{ 
                  fontSize: '1.15rem', 
                  fontWeight: 800, 
                  color: viewStyle === 'nta' ? '#1e3a8a' : '#38bdf8' 
                }}
              >
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '0.78rem' }}>
                {currentQ.subject} {currentQ.section ? `• Sec ${currentQ.section}` : ''}
              </span>
              {currentQ.topic && (
                <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>
                  {currentQ.topic}
                </span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.84rem' }}>
              <span style={{ color: '#16a34a', fontWeight: 700 }}>+4 (Correct)</span>
              <span style={{ color: '#dc2626', fontWeight: 700 }}>-1 (Wrong)</span>
              
              {/* Font Sizer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', marginLeft: '0.5rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.75rem', marginRight: '0.2rem' }}>Text Size:</span>
                {['normal', 'large', 'xl'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setFontSize(sz)}
                    style={{
                      padding: '0.15rem 0.45rem',
                      fontSize: sz === 'normal' ? '0.75rem' : sz === 'large' ? '0.88rem' : '1rem',
                      fontWeight: fontSize === sz ? 800 : 500,
                      background: fontSize === sz ? (viewStyle === 'nta' ? '#1e3a8a' : '#38bdf8') : 'transparent',
                      color: fontSize === sz ? '#ffffff' : (viewStyle === 'nta' ? '#475569' : '#94a3b8'),
                      border: '1px solid #cbd5e1',
                      borderRadius: '3px',
                      cursor: 'pointer'
                    }}
                  >
                    A
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Question Text */}
          <div 
            style={{ 
              fontSize: fontSizeClass, 
              lineHeight: 1.6, 
              fontWeight: 500,
              color: viewStyle === 'nta' ? '#0f172a' : '#f8fafc',
              marginBottom: '1.75rem',
              whiteSpace: 'pre-line'
            }}
          >
            {currentQ.question}
          </div>

          {/* 4 MCQ Radio Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
            {currentQ.options && currentQ.options.map((opt, optIndex) => {
              const isSelected = selectedOption === optIndex;
              return (
                <div 
                  key={optIndex}
                  onClick={() => setSelectedOption(optIndex)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.85rem',
                    padding: '0.85rem 1.15rem',
                    borderRadius: '8px',
                    border: isSelected 
                      ? '2px solid #2563eb' 
                      : (viewStyle === 'nta' ? '1px solid #cbd5e1' : '1px solid #334155'),
                    backgroundColor: isSelected 
                      ? (viewStyle === 'nta' ? '#eff6ff' : 'rgba(37, 99, 235, 0.15)') 
                      : (viewStyle === 'nta' ? '#f8fafc' : '#1e293b'),
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {/* Radio Visual Indicator */}
                  <div 
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      border: isSelected ? '6px solid #2563eb' : '2px solid #94a3b8',
                      backgroundColor: '#ffffff',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  />
                  <div style={{ fontSize: fontSizeClass, color: viewStyle === 'nta' ? '#1e293b' : '#f8fafc' }}>
                    <strong style={{ marginRight: '0.4rem' }}>({String.fromCharCode(65 + optIndex)})</strong>
                    {opt}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sweet Encouraging Reminder Banner for Her */}
          <div 
            style={{ 
              marginTop: 'auto', 
              padding: '0.75rem 1rem', 
              background: viewStyle === 'nta' ? '#fffbeb' : 'rgba(245, 158, 11, 0.08)',
              border: '1px dashed #f59e0b',
              borderRadius: '8px',
              fontSize: '0.85rem',
              color: viewStyle === 'nta' ? '#92400e' : '#fbbf24',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Heart size={16} fill="#f59e0b" />
              <span>Take a breath, read every option calmly. You can do this, Dr. {profile.name}! 🩺</span>
            </div>
            {selectedOption !== null && (
              <span style={{ fontWeight: 700, color: '#16a34a' }}>Option ({String.fromCharCode(65 + selectedOption)}) Selected</span>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: OFFICIAL NTA QUESTION PALETTE */}
        <div 
          style={{ 
            width: '340px', 
            minWidth: '280px',
            backgroundColor: viewStyle === 'nta' ? '#f8fafc' : '#0f172a',
            borderLeft: viewStyle === 'nta' ? '1px solid #cbd5e1' : '1px solid #1e293b',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto'
          }}
        >
          {/* Palette Status Counts Legend (Official NTA Style) */}
          <div 
            style={{ 
              padding: '1rem', 
              borderBottom: viewStyle === 'nta' ? '1px solid #e2e8f0' : '1px solid #1e293b',
              fontSize: '0.78rem'
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: '0.65rem', textTransform: 'uppercase', color: '#94a3b8' }}>
              Question Status Legend
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
              {/* Answered */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span className="nta-tag answered">{statusCounts.answered}</span>
                <span>Answered</span>
              </div>
              {/* Not Answered */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span className="nta-tag not-answered">{statusCounts.not_answered}</span>
                <span>Not Answered</span>
              </div>
              {/* Not Visited */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span className="nta-tag not-visited">{statusCounts.not_visited}</span>
                <span>Not Visited</span>
              </div>
              {/* Marked for Review */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span className="nta-tag marked">{statusCounts.marked}</span>
                <span>Marked for Review</span>
              </div>
            </div>

            {/* Answered & Marked for Review */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem' }}>
              <span className="nta-tag ans-marked">{statusCounts.answered_and_marked}</span>
              <span>Answered & Marked (Evaluated)</span>
            </div>
          </div>

          {/* Section Question Grid */}
          <div style={{ padding: '1rem', flex: 1, overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                {activeSubject || 'All Questions'} ({questions.filter(q => !activeSubject || q.subject === activeSubject).length} Qs)
              </span>
            </div>

            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(5, 1fr)', 
                gap: '0.5rem',
                maxHeight: '400px',
                overflowY: 'auto',
                paddingRight: '4px'
              }}
            >
              {questions.map((q, idx) => {
                const status = questionStatus[q.id] || 'not_visited';
                const isCurrent = idx === currentIndex;
                const isFilteredOut = activeSubject && q.subject !== activeSubject;

                if (isFilteredOut) return null;

                return (
                  <button
                    key={q.id}
                    onClick={() => jumpToQuestion(idx)}
                    className={`palette-num-btn ${status} ${isCurrent ? 'current-q' : ''}`}
                    title={`Question ${idx + 1} - ${q.subject} (${status})`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Palette Actions: Submit Button */}
          <div 
            style={{ 
              padding: '1rem', 
              borderTop: viewStyle === 'nta' ? '1px solid #e2e8f0' : '1px solid #1e293b',
              backgroundColor: viewStyle === 'nta' ? '#ffffff' : '#0b1120'
            }}
          >
            <button 
              className="btn btn-emerald" 
              style={{ width: '100%', padding: '0.85rem', fontWeight: 800 }}
              onClick={() => setShowSubmitModal(true)}
            >
              <CheckCircle size={18} /> Submit NEET Exam
            </button>
          </div>
        </div>

      </div>

      {/* ---------------- OFFICIAL NTA BOTTOM ACTION BAR ---------------- */}
      <footer 
        style={{
          backgroundColor: viewStyle === 'nta' ? '#ffffff' : '#0f172a',
          borderTop: viewStyle === 'nta' ? '2px solid #cbd5e1' : '1px solid #1e293b',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          {/* Save & Next */}
          <button 
            className="btn btn-emerald"
            onClick={handleSaveAndNext}
            style={{ padding: '0.65rem 1.25rem' }}
          >
            Save & Next <ChevronRight size={16} />
          </button>

          {/* Clear Response */}
          <button 
            className="btn btn-secondary"
            onClick={handleClearResponse}
            style={{ padding: '0.65rem 1rem' }}
          >
            <RotateCcw size={15} /> Clear Response
          </button>

          {/* Mark for Review & Next */}
          <button 
            className="btn btn-purple"
            onClick={handleMarkForReviewAndNext}
            style={{ padding: '0.65rem 1.25rem' }}
          >
            Mark for Review & Next
          </button>
        </div>

        {/* Previous / Next Navigation */}
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button 
            className="btn btn-secondary"
            disabled={currentIndex === 0}
            onClick={goToPrevQuestion}
            style={{ opacity: currentIndex === 0 ? 0.4 : 1 }}
          >
            <ChevronLeft size={16} /> Previous
          </button>
          
          <button 
            className="btn btn-secondary"
            disabled={currentIndex === questions.length - 1}
            onClick={goToNextQuestion}
            style={{ opacity: currentIndex === questions.length - 1 ? 0.4 : 1 }}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </footer>

      {/* ================= MODAL: SUBMISSION CONFIRMATION ================= */}
      {showSubmitModal && (
        <div className="modal-backdrop">
          <div className="modal-dialog" style={{ maxWidth: '640px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={22} color="#10b981" /> Exam Summary & Final Submission
              </h3>
              <button 
                onClick={() => setShowSubmitModal(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.3rem' }}>
                  Candidate: {profile.name} (Roll: {profile.rollNo})
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.88rem' }}>
                  Remaining Time: <span style={{ color: '#38bdf8', fontWeight: 700 }}>{formatTimer(secondsRemaining)}</span>
                </div>
              </div>

              {/* Status Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8', textAlign: 'left' }}>
                    <th style={{ padding: '0.6rem' }}>Subject</th>
                    <th style={{ padding: '0.6rem', textAlign: 'center' }}>Total Qs</th>
                    <th style={{ padding: '0.6rem', textAlign: 'center' }}>Answered</th>
                    <th style={{ padding: '0.6rem', textAlign: 'center' }}>Not Answered</th>
                    <th style={{ padding: '0.6rem', textAlign: 'center' }}>Review</th>
                  </tr>
                </thead>
                <tbody>
                  {subjectsList.map((subj) => {
                    const subjQs = questions.filter((q) => q.subject === subj);
                    const ans = subjQs.filter((q) => questionStatus[q.id] === 'answered' || questionStatus[q.id] === 'answered_and_marked').length;
                    const notAns = subjQs.filter((q) => questionStatus[q.id] === 'not_answered').length;
                    const marked = subjQs.filter((q) => questionStatus[q.id] === 'marked' || questionStatus[q.id] === 'answered_and_marked').length;

                    return (
                      <tr key={subj} style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.4)' }}>
                        <td style={{ padding: '0.6rem', fontWeight: 600 }}>{subj}</td>
                        <td style={{ padding: '0.6rem', textAlign: 'center' }}>{subjQs.length}</td>
                        <td style={{ padding: '0.6rem', textAlign: 'center', color: '#10b981', fontWeight: 700 }}>{ans}</td>
                        <td style={{ padding: '0.6rem', textAlign: 'center', color: '#ef4444' }}>{notAns}</td>
                        <td style={{ padding: '0.6rem', textAlign: 'center', color: '#a855f7' }}>{marked}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div 
                style={{ 
                  background: 'rgba(239, 68, 68, 0.1)', 
                  border: '1px solid #ef4444', 
                  borderRadius: '8px', 
                  padding: '0.85rem',
                  fontSize: '0.85rem',
                  color: '#fca5a5'
                }}
              >
                ⚠️ <strong>Note:</strong> Once you submit, your responses will be evaluated with NEET marking scheme (+4 for correct, -1 for incorrect, 0 for unattempted) and you will immediately see your detailed scorecard and solutions!
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowSubmitModal(false)}>
                Return to Exam
              </button>
              <button className="btn btn-emerald" onClick={finalizeSubmission}>
                Yes, Submit Exam Now!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: FULL QUESTION PAPER ================= */}
      {showQuestionPaperModal && (
        <div className="modal-backdrop">
          <div className="modal-dialog" style={{ maxWidth: '850px', maxHeight: '85vh' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={20} color="#38bdf8" /> Full Question Paper View
              </h3>
              <button 
                onClick={() => setShowQuestionPaperModal(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ maxHeight: '65vh', overflowY: 'auto' }}>
              {questions.map((q, idx) => (
                <div 
                  key={q.id}
                  style={{ 
                    padding: '1rem', 
                    borderBottom: '1px solid #334155',
                    backgroundColor: idx % 2 === 0 ? 'rgba(15, 23, 42, 0.4)' : 'transparent',
                    borderRadius: '6px',
                    marginBottom: '0.6rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <strong style={{ color: '#38bdf8' }}>Q{idx + 1}. [{q.subject} - {q.topic || 'General'}]</strong>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        jumpToQuestion(idx);
                        setShowQuestionPaperModal(false);
                      }}
                      style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                    >
                      Solve this Q
                    </button>
                  </div>
                  <div style={{ marginBottom: '0.6rem', color: '#f8fafc', fontSize: '0.92rem' }}>
                    {q.question}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                    {q.options && q.options.map((opt, oIdx) => (
                      <div key={oIdx}>
                        ({String.fromCharCode(65 + oIdx)}) {opt}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowQuestionPaperModal(false)}>
                Close Question Paper
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: INSTRUCTIONS ================= */}
      {showInstructionsModal && (
        <div className="modal-backdrop">
          <div className="modal-dialog" style={{ maxWidth: '680px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HelpCircle size={20} color="#a855f7" /> General NEET Exam Guidelines & Marking Scheme
              </h3>
              <button 
                onClick={() => setShowInstructionsModal(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ maxHeight: '65vh', overflowY: 'auto', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <h4 style={{ color: '#38bdf8', marginBottom: '0.4rem' }}>1. General Instructions:</h4>
              <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.2rem', color: '#cbd5e1' }}>
                <li>Total duration of NEET (UG) is 200 minutes (3 hours 20 minutes).</li>
                <li>The test consists of Physics, Chemistry, Botany, and Zoology.</li>
                <li>Each subject contains Section A and Section B.</li>
                <li>The countdown timer at top right shows remaining test duration.</li>
              </ul>

              <h4 style={{ color: '#10b981', marginBottom: '0.4rem' }}>2. Marking Scheme:</h4>
              <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.2rem', color: '#cbd5e1' }}>
                <li><strong>+4 Marks:</strong> Awarded for each correct response.</li>
                <li><strong>-1 Mark:</strong> Deducted for each incorrect response (Negative Marking).</li>
                <li><strong>0 Marks:</strong> Awarded for unattempted questions.</li>
              </ul>

              <h4 style={{ color: '#f59e0b', marginBottom: '0.4rem' }}>3. Question Palette Color Indicators:</h4>
              <ul style={{ paddingLeft: '1.25rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li><span className="nta-tag not-visited" style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>—</span> <strong>Not Visited:</strong> You have not visited the question yet.</li>
                <li><span className="nta-tag not-answered" style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>—</span> <strong>Not Answered:</strong> You have visited but not answered.</li>
                <li><span className="nta-tag answered" style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>—</span> <strong>Answered:</strong> You have selected an answer.</li>
                <li><span className="nta-tag marked" style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>—</span> <strong>Marked for Review:</strong> You marked the question for review without answering.</li>
                <li><span className="nta-tag ans-marked" style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>—</span> <strong>Answered & Marked:</strong> Answered and marked for review. (Will be evaluated!)</li>
              </ul>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowInstructionsModal(false)}>
                Understood, Return to Exam
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Embedded CSS for NTA Palette Status Badges */}
      <style>{`
        .nta-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #ffffff;
        }
        .nta-tag.answered { background-color: #16a34a; clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 50% 100%, 0% 75%); }
        .nta-tag.not-answered { background-color: #dc2626; clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); }
        .nta-tag.not-visited { background-color: #cbd5e1; color: #334155; }
        .nta-tag.marked { background-color: #7c3aed; border-radius: 50%; }
        .nta-tag.ans-marked { 
          background-color: #7c3aed; 
          border-radius: 50%; 
          position: relative; 
        }
        .nta-tag.ans-marked::after {
          content: '';
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #16a34a;
        }

        .palette-num-btn {
          width: 100%;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 700;
          border: 1px solid transparent;
          cursor: pointer;
          transition: transform 0.15s;
          border-radius: 4px;
        }
        .palette-num-btn:hover {
          transform: scale(1.08);
          z-index: 2;
        }
        .palette-num-btn.current-q {
          outline: 3px solid #38bdf8 !important;
          box-shadow: 0 0 10px rgba(56, 189, 248, 0.6);
        }

        .palette-num-btn.answered {
          background-color: #16a34a;
          color: #ffffff;
        }
        .palette-num-btn.not-answered {
          background-color: #dc2626;
          color: #ffffff;
        }
        .palette-num-btn.not-visited {
          background-color: #e2e8f0;
          color: #475569;
        }
        .palette-num-btn.marked {
          background-color: #7c3aed;
          color: #ffffff;
          border-radius: 50%;
        }
        .palette-num-btn.answered_and_marked {
          background-color: #7c3aed;
          color: #ffffff;
          border-radius: 50%;
          position: relative;
        }
        .palette-num-btn.answered_and_marked::after {
          content: '';
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 7px;
          height: 7px;
          background: #22c55e;
          border-radius: 50%;
          border: 1px solid #ffffff;
        }
      `}</style>
    </div>
  );
}
