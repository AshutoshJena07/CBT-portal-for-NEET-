import React, { useState } from 'react';
import { User, Heart, X, Sparkles, Check, Stethoscope } from 'lucide-react';

export function SettingsModal({ profile, onSaveProfile, onClose }) {
  const [name, setName] = useState(profile.name || 'Dr. Sahiba');
  const [rollNo, setRollNo] = useState(profile.rollNo || 'NEET-2026-AIR1');
  const [targetCollege, setTargetCollege] = useState(profile.targetCollege || 'AIIMS New Delhi');
  const [avatarEmoji, setAvatarEmoji] = useState(profile.avatarEmoji || '👩‍⚕️');
  const [personalNote, setPersonalNote] = useState(
    profile.personalNote || 'Proud of your hard work! Take your time, read questions carefully and remember I am always rooting for you! 🩺💖'
  );

  const emojis = ['👩‍⚕️', '🩺', '🥼', '🌸', '✨', '🦋', '🧬', '💉', '🌟', '🤍'];

  const popularColleges = [
    'AIIMS New Delhi',
    'Maulana Azad Medical College (MAMC)',
    'Lady Hardinge Medical College (LHMC)',
    'VMMC & Safdarjung Hospital',
    'King George Medical University (KGMU)',
    'JIPMER Puducherry',
    'CMC Vellore',
    'Top Govt Medical College (GMC)'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveProfile({
      name: name.trim() || 'Dr. Sahiba',
      rollNo: rollNo.trim() || 'NEET-2026-AIR1',
      targetCollege: targetCollege.trim() || 'AIIMS New Delhi',
      avatarEmoji,
      personalNote: personalNote.trim()
    });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog" style={{ maxWidth: '580px' }}>
        <div className="modal-header">
          <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff' }}>
            <Stethoscope size={22} color="#38bdf8" /> Customize Candidate Profile & Love Note
          </h3>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            
            {/* Avatar Picker */}
            <div className="form-group">
              <label className="form-label">Choose Avatar Emoji</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {emojis.map((em) => (
                  <button
                    key={em}
                    type="button"
                    onClick={() => setAvatarEmoji(em)}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '8px',
                      fontSize: '1.4rem',
                      background: avatarEmoji === em ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.6)',
                      border: avatarEmoji === em ? '2px solid #38bdf8' : '1px solid var(--border-color)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.15s'
                    }}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>

            {/* Candidate Name */}
            <div className="form-group">
              <label className="form-label">Her Name / Title</label>
              <input 
                type="text" 
                className="form-input" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dr. Sneha or Dr. Sahiba"
              />
            </div>

            {/* Roll Number */}
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Candidate Roll Number</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  placeholder="NEET-2026-AIR1"
                />
              </div>

              {/* Target College */}
              <div className="form-group">
                <label className="form-label">Dream Medical College</label>
                <input 
                  type="text" 
                  className="form-input" 
                  list="colleges-list"
                  value={targetCollege}
                  onChange={(e) => setTargetCollege(e.target.value)}
                  placeholder="AIIMS New Delhi"
                />
                <datalist id="colleges-list">
                  {popularColleges.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Boyfriend's Heartfelt Personal Motivation Note */}
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#fb7185' }}>
                <Heart size={14} fill="#fb7185" /> Your Encouraging Personal Note (Appears on her Dashboard & Exam Room)
              </label>
              <textarea 
                className="form-textarea" 
                rows="3"
                value={personalNote}
                onChange={(e) => setPersonalNote(e.target.value)}
                placeholder="Write a sweet message to encourage her..."
              />
            </div>

          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Check size={16} /> Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
