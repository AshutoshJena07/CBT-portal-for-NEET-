import React, { useState, useEffect } from 'react';
import { Database, Eye, RefreshCw, Clock, ShieldAlert } from 'lucide-react';

export function SubmissionsList({ onViewSubmission }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubmissions = () => {
    setLoading(true);
    fetch('/api/submissions')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSubmissions(data.submissions || []);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div className="cbt-container">
      <div className="cbt-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Database size={22} /> SQL Database Records: Student Submissions
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.86rem' }}>
              Yeh saara data aapke local SQLite database file (`neet_cbt.db`) me automatically record hua hai.
            </p>
          </div>

          <button className="cbt-btn cbt-btn-secondary" onClick={fetchSubmissions} disabled={loading}>
            <RefreshCw size={15} /> Refresh Records
          </button>
        </div>
      </div>

      <div className="cbt-card">
        {submissions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
            <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>No student submissions recorded in database yet.</p>
            <p style={{ fontSize: '0.82rem' }}>When a candidate completes a test in the Student Portal, the evaluated score and responses will be saved here automatically.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="cbt-table">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Roll No</th>
                  <th>Test Title</th>
                  <th>Score / Max</th>
                  <th>Accuracy</th>
                  <th>Time</th>
                  <th>Security Warnings</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 700, color: '#1e3a8a' }}>
                      {s.candidate_name}
                    </td>
                    <td>{s.roll_no}</td>
                    <td>{s.test_title}</td>
                    <td>
                      <strong style={{ color: s.score >= 0 ? '#2e7d32' : '#d32f2f' }}>
                        {s.score}
                      </strong>
                      <span style={{ color: '#64748b', fontSize: '0.8rem' }}> / {s.total_marks}</span>
                    </td>
                    <td>{s.accuracy}%</td>
                    <td>{Math.round(s.time_spent_seconds / 60) || 1} min</td>
                    <td>
                      {s.tab_switch_count > 0 ? (
                        <span style={{ color: '#d32f2f', fontWeight: 600 }}>
                          ⚠️ {s.tab_switch_count} switches
                        </span>
                      ) : (
                        <span style={{ color: '#2e7d32' }}>Clean (0)</span>
                      )}
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {new Date(s.submitted_at).toLocaleString()}
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
