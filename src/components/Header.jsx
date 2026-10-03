import React from 'react';
import { 
  Stethoscope, 
  BookOpen, 
  Bookmark, 
  PlusCircle, 
  UserCheck, 
  Heart, 
  Home,
  Award
} from 'lucide-react';

export function Header({ currentView, setCurrentView, profile, onOpenSettings, bookmarkCount }) {
  return (
    <header className="app-header">
      <div className="container">
        <div className="header-inner">
          {/* Brand Logo & Name */}
          <div className="brand-wrapper" onClick={() => setCurrentView('dashboard')}>
            <div className="brand-icon">
              <Stethoscope size={26} color="#ffffff" />
            </div>
            <div>
              <div className="brand-title">Dr. NEET CBT Portal</div>
              <div className="brand-subtitle">
                <span>Mission MBBS</span> • <span style={{ color: '#38bdf8' }}>NTA Official Interface</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="nav-links">
            <button 
              className={`nav-btn ${currentView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentView('dashboard')}
            >
              <Home size={17} />
              <span>Dashboard</span>
            </button>

            <button 
              className={`nav-btn ${currentView === 'mistakes' ? 'active' : ''}`}
              onClick={() => setCurrentView('mistakes')}
            >
              <Bookmark size={17} />
              <span>Mistake Book</span>
              {bookmarkCount > 0 && (
                <span className="badge badge-rose" style={{ padding: '0.1rem 0.4rem', fontSize: '0.7rem' }}>
                  {bookmarkCount}
                </span>
              )}
            </button>

            <button 
              className={`nav-btn ${currentView === 'creator' ? 'active' : ''}`}
              onClick={() => setCurrentView('creator')}
            >
              <PlusCircle size={17} />
              <span>Create Test</span>
            </button>
          </nav>

          {/* Profile & Personal Touch */}
          <div 
            className="candidate-profile-badge" 
            onClick={onOpenSettings}
            title="Edit Candidate Profile & Motivation Note"
          >
            <div className="candidate-avatar">
              {profile.avatarEmoji || '👩‍⚕️'}
            </div>
            <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span>{profile.name || 'Dr. Sahiba'}</span>
                <Heart size={13} fill="#ec4899" color="#ec4899" />
              </div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                {profile.targetCollege ? profile.targetCollege.slice(0, 22) : 'AIIMS Aspirant'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
