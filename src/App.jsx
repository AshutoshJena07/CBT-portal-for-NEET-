import React, { useState, useEffect } from 'react';
import { StudentPortal } from './components/StudentPortal';
import { ExamLockedRoom } from './components/ExamLockedRoom';
import { AnswerKeyUploader } from './components/AnswerKeyUploader';
import { SubmissionsList } from './components/SubmissionsList';
import { ScorecardView } from './components/ScorecardView';
import { WelcomePopup } from './components/WelcomePopup';
import { Lock, LogOut, Sun, Moon } from 'lucide-react';

export function App() {
  // Theme state: 'light' or 'dark'
  const [theme, setTheme] = useState(() => localStorage.getItem('cbt_theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cbt_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Check if admin mode was requested via URL query param: ?admin=true
  const searchParams = new URLSearchParams(window.location.search);
  const initialAdmin = searchParams.get('admin') === 'true';

  const [isAdminMode, setIsAdminMode] = useState(initialAdmin);
  const [activeTab, setActiveTab] = useState('student'); // 'student', 'answer-key', 'database'
  const [tests, setTests] = useState([]);
  const [currentExam, setCurrentExam] = useState(null); // { test, candidate }
  const [submissionResult, setSubmissionResult] = useState(null); // evaluated scorecard from backend
  const [loading, setLoading] = useState(true);
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);

  // Fetch available tests from backend API
  const fetchTests = () => {
    fetch('/api/tests')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTests(data.tests || []);
        }
      })
      .catch((err) => console.error('Failed to fetch tests:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTests();
  }, []);

  // Handler to start exam
  const handleStartExam = async ({ testId, candidate }) => {
    try {
      const res = await fetch(`/api/tests/${testId}`);
      const data = await res.json();
      if (data.success) {
        setCurrentExam({
          test: data.test,
          candidate
        });
      } else {
        alert('Failed to load test questions.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend server.');
    }
  };

  // Handler when exam is submitted and evaluated by backend
  const handleExamSubmitted = (submissionData) => {
    setCurrentExam(null);
    setSubmissionResult(submissionData);
  };

  // Admin Toggle Handler
  const handleAdminToggle = () => {
    if (!isAdminMode) {
      const pass = window.prompt('Enter Administrator Passcode:');
      if (pass === 'admin' || pass === '1234') {
        setIsAdminMode(true);
        setActiveTab('answer-key');
      } else if (pass !== null) {
        alert('Incorrect passcode!');
      }
    } else {
      setIsAdminMode(false);
      setActiveTab('student');
    }
  };

  // If student is taking the exam, show the Fullscreen Locked Exam Room ONLY
  if (currentExam) {
    return (
      <ExamLockedRoom 
        test={currentExam.test}
        candidate={currentExam.candidate}
        theme={theme}
        onToggleTheme={toggleTheme}
        onExamSubmitted={handleExamSubmitted}
        onExitExam={() => setCurrentExam(null)}
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* ---------------- WELCOME MOTIVATIONAL POPUP FOR APARNAVATI ---------------- */}
      <WelcomePopup 
        isOpen={showWelcomePopup} 
        onClose={() => setShowWelcomePopup(false)} 
      />

      {/* ---------------- AUTHENTIC HEADER ---------------- */}
      <header className="nta-portal-header">
        <div className="portal-title-block">
          <h1>CBT based portal</h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* THEME TOGGLE BUTTON */}
          <button
            onClick={toggleTheme}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={15} style={{ color: '#fde047' }} /> : <Moon size={15} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>

        {/* ADMIN CONTROLS (ONLY VISIBLE IF ADMIN MODE IS UNLOCKED) */}
        {isAdminMode && (
          <nav className="portal-nav-tabs">
            <button 
              className={`portal-tab-btn ${activeTab === 'student' && !submissionResult ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('student');
                setSubmissionResult(null);
              }}
            >
              Candidate Portal
            </button>

            <button 
              className={`portal-tab-btn ${activeTab === 'answer-key' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('answer-key');
                setSubmissionResult(null);
              }}
            >
              Upload Answer Key
            </button>

            <button 
              className={`portal-tab-btn ${activeTab === 'database' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('database');
                setSubmissionResult(null);
              }}
            >
              SQL Database Records
            </button>

            <button 
              className="portal-tab-btn"
              onClick={() => {
                setIsAdminMode(false);
                setActiveTab('student');
              }}
              style={{ backgroundColor: '#d32f2f', borderColor: '#d32f2f' }}
              title="Exit Admin Mode"
            >
              <LogOut size={13} style={{ marginRight: '3px' }} /> Exit Admin
            </button>
          </nav>
        )}
      </header>

      {/* ---------------- MAIN VIEW ---------------- */}
      <main style={{ flex: 1, paddingBottom: '3rem' }}>
        {submissionResult ? (
          <ScorecardView 
            submission={submissionResult}
            onRetake={() => {
              const testId = submissionResult.testId;
              const candidate = {
                name: submissionResult.candidateName,
                rollNo: submissionResult.rollNo
              };
              setSubmissionResult(null);
              handleStartExam({ testId, candidate });
            }}
            onBackHome={() => {
              setSubmissionResult(null);
              setActiveTab('student');
              fetchTests();
            }}
          />
        ) : (
          <>
            {/* Candidate Portal: Shown to girlfriend / student by default */}
            {activeTab === 'student' && (
              <StudentPortal 
                tests={tests}
                onStartExam={handleStartExam}
              />
            )}

            {/* Admin Only Views */}
            {isAdminMode && activeTab === 'answer-key' && (
              <AnswerKeyUploader 
                tests={tests}
                onRefreshTests={fetchTests}
              />
            )}

            {isAdminMode && activeTab === 'database' && (
              <SubmissionsList />
            )}
          </>
        )}
      </main>

      {/* ---------------- DISCREET FOOTER WITH HIDDEN ADMIN LOGIN ---------------- */}
      <footer style={{ backgroundColor: '#e2e8f0', borderTop: '1px solid #cbd5e1', padding: '0.6rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#64748b' }}>
        <div>
          © CBT based portal
        </div>

        {/* Hidden discrete Admin Key */}
        <div>
          <button 
            onClick={handleAdminToggle}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem' }}
            title="Administrator Login"
          >
            <Lock size={12} />
            <span>{isAdminMode ? 'Admin Active' : 'Admin'}</span>
          </button>
        </div>
      </footer>

    </div>
  );
}

export default App;
