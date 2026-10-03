import React from 'react';
import confetti from 'canvas-confetti';

export function WelcomePopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleStartWithCelebration = () => {
    // 1. Center burst
    confetti({
      particleCount: 130,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
    });

    // 2. Left & Right festive cannons
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.75 },
        colors: ['#ec4899', '#f43f5e', '#3b82f6', '#10b981', '#f59e0b']
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.75 },
        colors: ['#ec4899', '#f43f5e', '#3b82f6', '#10b981', '#f59e0b']
      });
    }, 150);

    onClose();
  };

  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.25s ease-out'
      }}
    >
      {/* Pop-up Card */}
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(145deg, #ffffff 0%, #fff1f2 40%, #fdf2f8 100%)',
          borderRadius: '20px',
          padding: '2rem 2.25rem',
          maxWidth: '520px',
          width: '95%',
          textAlign: 'center',
          boxShadow: '0 25px 50px -12px rgba(236, 72, 153, 0.35), 0 0 0 1px rgba(244, 114, 182, 0.25)',
          border: '2px solid #fbcfe8',
          position: 'relative',
          animation: 'popupCardZoom 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          userSelect: 'none'
        }}
      >
        {/* Heading */}
        <h2 style={{
          fontSize: '1.9rem',
          fontWeight: 800,
          color: '#be185d',
          marginBottom: '0.6rem',
          letterSpacing: '-0.5px'
        }}>
          Aparnavatiii 🩷
        </h2>

        {/* Sentence in single line */}
        <div style={{
          fontSize: '1.05rem',
          fontWeight: 600,
          color: '#334155',
          margin: '0.75rem 0 1.25rem',
          whiteSpace: 'nowrap'
        }}>
          Chale gote fresh start kare au bhalse se haan !!
        </div>

        {/* All the best */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          backgroundColor: '#ffe4e6',
          color: '#9f1239',
          padding: '0.45rem 1.25rem',
          borderRadius: '999px',
          fontSize: '1.1rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          boxShadow: '0 2px 8px rgba(244, 63, 94, 0.15)'
        }}>
          <span>All the best 🫂</span>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={handleStartWithCelebration}
            style={{
              width: '100%',
              padding: '0.8rem 1.5rem',
              background: 'linear-gradient(135deg, #e11d48 0%, #db2777 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 8px 20px -4px rgba(225, 29, 72, 0.4)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 24px -4px rgba(225, 29, 72, 0.5)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 20px -4px rgba(225, 29, 72, 0.4)'; }}
          >
            Haa, Let's Start!
          </button>
        </div>
      </div>
    </div>
  );
}
