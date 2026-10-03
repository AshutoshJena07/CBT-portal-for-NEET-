import React from 'react';
import { Printer, X, Award, Heart, CheckCircle2, XCircle, Clock, Calendar } from 'lucide-react';

export function ReportCardModal({ isOpen, onClose, data }) {
  if (!isOpen || !data) return null;

  const {
    candidateName = 'Aparna',
    rollNo = 'NEET-2026-AIR1',
    testTitle = 'NEET Exam Paper',
    score = 0,
    totalMarks = 720,
    correctCount = 0,
    incorrectCount = 0,
    unattemptedCount = 0,
    accuracy = 0,
    submittedAt = new Date().toISOString()
  } = data;

  const formattedDate = new Date(submittedAt).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="report-card-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(5px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        overflowY: 'auto'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        id="printable-report-card"
        style={{
          backgroundColor: 'var(--bg-card, #ffffff)',
          color: 'var(--text-main, #1e293b)',
          borderRadius: '16px',
          maxWidth: '650px',
          width: '100%',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          border: '2px solid #fbcfe8',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          animation: 'popupCardZoom 0.25s ease-out'
        }}
      >
        {/* Header - Non-Print / Display */}
        <div 
          className="no-print"
          style={{
            padding: '0.85rem 1.25rem',
            background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1rem' }}>
            <Award size={20} style={{ color: '#fde047' }} />
            <span>Official Examination Report Card</span>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Printable Card Area */}
        <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Institution / Portal Header */}
          <div style={{ textAlign: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.85rem' }}>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1e3a8a', letterSpacing: '0.5px' }}>
              CBT based portal
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.15rem' }}>
              Candidate Performance & Evaluation Statement
            </div>
          </div>

          {/* Candidate & Paper Info Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.75rem',
            backgroundColor: 'var(--bg-subtle, #f8fafc)',
            padding: '1rem',
            borderRadius: '10px',
            border: '1px solid var(--border-main, #e2e8f0)',
            fontSize: '0.88rem'
          }}>
            <div>
              <span style={{ color: '#64748b', fontSize: '0.76rem', textTransform: 'uppercase', fontWeight: 600 }}>Candidate Name</span>
              <div style={{ fontWeight: 700, color: '#1e3a8a', fontSize: '1.05rem' }}>{candidateName}</div>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: '0.76rem', textTransform: 'uppercase', fontWeight: 600 }}>Roll Number</span>
              <div style={{ fontWeight: 600 }}>{rollNo}</div>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <span style={{ color: '#64748b', fontSize: '0.76rem', textTransform: 'uppercase', fontWeight: 600 }}>Question Paper Attempted</span>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>{testTitle}</div>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: '0.76rem', textTransform: 'uppercase', fontWeight: 600 }}>Date & Time</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.84rem' }}>
                <Calendar size={13} style={{ color: '#64748b' }} /> {formattedDate}
              </div>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: '0.76rem', textTransform: 'uppercase', fontWeight: 600 }}>Final Score</span>
              <div style={{ fontWeight: 800, fontSize: '1.15rem', color: score >= 0 ? '#16a34a' : '#d32f2f' }}>
                {score} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#64748b' }}>/ {totalMarks}</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.5rem',
            textAlign: 'center'
          }}>
            <div style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #bbf7d0', backgroundColor: '#f0fdf4' }}>
              <div style={{ fontSize: '0.72rem', color: '#166534', fontWeight: 600 }}>CORRECT</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#15803d' }}>{correctCount}</div>
            </div>
            <div style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #fecaca', backgroundColor: '#fef2f2' }}>
              <div style={{ fontSize: '0.72rem', color: '#991b1b', fontWeight: 600 }}>INCORRECT</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#b91c1c' }}>{incorrectCount}</div>
            </div>
            <div style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>UNATTEMPTED</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#475569' }}>{unattemptedCount}</div>
            </div>
            <div style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #bfdbfe', backgroundColor: '#eff6ff' }}>
              <div style={{ fontSize: '0.72rem', color: '#1e40af', fontWeight: 600 }}>ACCURACY</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2563eb' }}>{accuracy}%</div>
            </div>
          </div>

          {/* ---------------- SPECIAL MESSAGE FOR MAMA ---------------- */}
          <div 
            style={{
              background: 'linear-gradient(135deg, #fff1f2 0%, #fdf2f8 50%, #fae8ff 100%)',
              border: '2px dashed #f472b6',
              borderRadius: '14px',
              padding: '1.25rem 1.5rem',
              boxShadow: '0 4px 15px rgba(244, 114, 182, 0.15)',
              position: 'relative'
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              color: '#be185d', 
              fontWeight: 800, 
              fontSize: '0.9rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.5px',
              marginBottom: '0.6rem' 
            }}>
              <Heart size={16} fill="#ec4899" color="#ec4899" />
              <span>Message for Mama</span>
            </div>

            <div 
              style={{
                fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
                fontSize: '1.02rem',
                lineHeight: 1.65,
                color: '#831843',
                fontWeight: 600,
                whiteSpace: 'pre-line'
              }}
            >
{`Mama !!
Aparna ${testTitle} attempt kala au ${score} etiki aasichi .
Next re auri bhala kariba 
Gali karibani mamaaa ...
Lovee you mama !! 🩷`}
            </div>
          </div>

        </div>

        {/* Footer Actions - Non-Print */}
        <div 
          className="no-print"
          style={{
            padding: '0.85rem 1.5rem',
            backgroundColor: 'var(--bg-subtle, #f8fafc)',
            borderTop: '1px solid var(--border-subtle, #e2e8f0)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.75rem'
          }}
        >
          <button 
            className="cbt-btn cbt-btn-secondary" 
            onClick={onClose}
          >
            Close
          </button>
          <button 
            className="cbt-btn cbt-btn-primary" 
            onClick={handlePrint}
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              fontWeight: 700,
              gap: '0.5rem',
              padding: '0.55rem 1.25rem'
            }}
          >
            <Printer size={16} /> Print Report Card
          </button>
        </div>

      </div>
    </div>
  );
}
