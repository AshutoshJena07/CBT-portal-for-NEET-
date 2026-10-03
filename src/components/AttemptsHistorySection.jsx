import React, { useState, useEffect } from 'react';
import { 
  Printer, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp,
  History,
  Trash2
} from 'lucide-react';
import { ReportCardModal } from './ReportCardModal';

export function AttemptsHistorySection() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedReportData, setSelectedReportData] = useState(null);
  const [isLogOpen, setIsLogOpen] = useState(false);

  const fetchSubmissions = () => {
    setLoading(true);
    fetch('/api/submissions')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSubmissions(data.submissions || []);
        }
      })
      .catch((err) => console.error('Error fetching submissions:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleClearHistory = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to clear all exam history records? This cannot be undone.')) {
      try {
        const res = await fetch('/api/submissions', { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          setSubmissions([]);
        }
      } catch (err) {
        console.error('Failed to clear history:', err);
        alert('Failed to clear history.');
      }
    }
  };

  if (submissions.length === 0 && !loading) {
    return null;
  }

  return (
    <div style={{ marginTop: '1.75rem' }}>
      
      {/* ALL ATTEMPTS HISTORY TABLE - DROPDOWN ONLY */}
      <div 
        className="cbt-card"
        style={{
          transition: 'all 0.2s ease',
          border: isLogOpen ? '1px solid var(--secondary-blue)' : '1px solid var(--border-main)'
        }}
      >
        {/* DROPDOWN TOGGLE HEADER */}
        <div 
          onClick={() => setIsLogOpen(!isLogOpen)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            userSelect: 'none',
            padding: '0.25rem 0'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <History size={20} style={{ color: 'var(--secondary-blue)' }} />
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', margin: 0 }}>
              Recent Attempts Log & Print Options
            </h3>
            <span 
              style={{ 
                fontSize: '0.78rem', 
                padding: '0.15rem 0.55rem', 
                borderRadius: '999px', 
                backgroundColor: 'rgba(37, 99, 235, 0.12)', 
                color: 'var(--secondary-blue)',
                fontWeight: 700 
              }}
            >
              {submissions.length} attempts
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                fetchSubmissions();
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.78rem'
              }}
              title="Refresh attempts list"
            >
              <RotateCcw size={13} /> Refresh
            </button>

            <button
              onClick={handleClearHistory}
              style={{
                background: 'none',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.78rem',
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                transition: 'all 0.15s ease'
              }}
              title="Clear all exam attempt history"
            >
              <Trash2 size={13} /> Clear History
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--secondary-blue)', fontSize: '0.84rem', fontWeight: 600 }}>
              <span>{isLogOpen ? 'Hide Log' : 'Show Dropdown'}</span>
              {isLogOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </div>
        </div>

        {/* DROPDOWN BODY */}
        {isLogOpen && (
          <div 
            style={{
              marginTop: '1rem',
              paddingTop: '0.85rem',
              borderTop: '1px solid var(--border-subtle)',
              animation: 'fadeIn 0.2s ease'
            }}
          >
            <div style={{ overflowX: 'auto' }}>
              <table className="cbt-table">
                <thead>
                  <tr>
                    <th># Attempt</th>
                    <th>Paper Name</th>
                    <th>Candidate</th>
                    <th>Date & Time</th>
                    <th>Score (/720)</th>
                    <th>Accuracy</th>
                    <th style={{ textAlign: 'center' }}>Report Card</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub, idx) => (
                    <tr key={sub.id}>
                      <td style={{ fontWeight: 700, color: 'var(--text-muted)' }}>
                        #{submissions.length - idx}
                      </td>
                      <td style={{ fontWeight: 600, color: 'var(--text-heading)' }}>
                        {sub.test_title}
                      </td>
                      <td>{sub.candidate_name}</td>
                      <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        {new Date(sub.submitted_at).toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td>
                        <strong style={{ color: sub.score >= 0 ? '#16a34a' : '#d32f2f', fontSize: '0.95rem' }}>
                          {sub.score}
                        </strong>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}> / {sub.total_marks}</span>
                      </td>
                      <td>{sub.accuracy}%</td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          className="cbt-btn"
                          onClick={() => {
                            setSelectedReportData({
                              candidateName: sub.candidate_name,
                              rollNo: sub.roll_no,
                              testTitle: sub.test_title,
                              score: sub.score,
                              totalMarks: sub.total_marks,
                              correctCount: sub.correct_count,
                              incorrectCount: sub.incorrect_count,
                              unattemptedCount: sub.unattempted_count,
                              accuracy: sub.accuracy,
                              submittedAt: sub.submitted_at
                            });
                          }}
                          style={{
                            padding: '0.35rem 0.75rem',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            backgroundColor: '#fdf2f8',
                            color: '#be185d',
                            border: '1px solid #fbcfe8',
                            borderRadius: '4px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            cursor: 'pointer'
                          }}
                          title="Print Report Card with message for Mama"
                        >
                          <Printer size={13} /> Print Card 🩷
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* REPORT CARD PRINT MODAL */}
      <ReportCardModal 
        isOpen={Boolean(selectedReportData)}
        onClose={() => setSelectedReportData(null)}
        data={selectedReportData}
      />

    </div>
  );
}
