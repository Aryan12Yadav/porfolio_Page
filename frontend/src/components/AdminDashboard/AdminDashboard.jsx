import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, LogOut, Check, Trash2, Mail, Calendar, User, Phone, Briefcase, Lock } from 'lucide-react';
import './AdminDashboard.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export default function AdminDashboard({ backToPortfolio }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authHeader, setAuthHeader] = useState('');
  const [loginError, setLoginError] = useState('');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Authentication states
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  // Check if already logged in this session
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('adminAuth');
    if (savedAuth) {
      setAuthHeader(savedAuth);
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch requests on mount or when authHeader changes
  useEffect(() => {
    fetchRequests();
  }, [authHeader]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const config = authHeader ? { headers: { Authorization: authHeader } } : {};
      const res = await axios.get(`${API_BASE_URL}/api/admin/interview-requests/`, config);
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401 && isAuthenticated) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const executePendingAction = (authHeaderVal, currentPending = pendingAction) => {
    if (!currentPending) return;
    
    if (currentPending.type === 'confirm') {
      const gmailUrl = generateGmailUrl(currentPending.data);
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    } else if (currentPending.type === 'delete') {
      setDeleteConfirmId(currentPending.data);
    }
    setPendingAction(null);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    const token = btoa(`${username}:${password}`);
    const basicAuth = `Basic ${token}`;

    try {
      await axios.get(`${API_BASE_URL}/api/admin/interview-requests/`, {
        headers: { Authorization: basicAuth }
      });
      sessionStorage.setItem('adminAuth', basicAuth);
      setAuthHeader(basicAuth);
      setIsAuthenticated(true);
      setShowAuthPopup(false);
      executePendingAction(basicAuth);
    } catch (err) {
      console.error(err);
      setLoginError('Invalid admin username or password. Please try again.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setAuthHeader('');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const executeDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/interview-requests/${id}/`, {
        headers: { Authorization: authHeader }
      });
      setRequests(requests.filter(req => req.id !== id));
    } catch (err) {
      console.error("Error deleting request:", err);
      alert("Failed to delete the request. Please try again.");
    }
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const generateGmailUrl = (req) => {
    const formattedDate = formatDateTime(req.requested_date);
    const subject = encodeURIComponent(`Interview Schedule Confirmation - Aryan Yadav`);
    const body = encodeURIComponent(
      `Hi ${req.recruiter_name},\n\n` +
      `Thank you for reaching out! I would be glad to connect and discuss potential opportunities.\n\n` +
      `I have marked the proposed slot on my calendar:\n` +
      `📅 ${formattedDate}\n\n` +
      `Please send over a calendar invite or video meeting link at your convenience.\n\n` +
      `Best regards,\n` +
      `Aryan Yadav`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${req.email}&su=${subject}&body=${body}`;
  };

  const handleConfirmClick = (e, req) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setPendingAction({ type: 'confirm', data: req });
      setShowAuthPopup(true);
    }
  };

  const handleDeleteClick = (id) => {
    if (!isAuthenticated) {
      setPendingAction({ type: 'delete', data: id });
      setShowAuthPopup(true);
    } else {
      setDeleteConfirmId(id);
    }
  };

  const filteredRequests = requests.filter(req => 
    req.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.recruiter_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-dashboard-container">
      <header className="admin-dashboard-header">
        <div>
          <span className="section-subtitle">Recruitment Logs</span>
          <h1 className="admin-dashboard-title">Interview Schedules</h1>
        </div>
        <div className="admin-header-actions">
          <button className="btn btn-secondary" onClick={backToPortfolio}>
            Back to Site
          </button>
          {isAuthenticated ? (
            <button className="btn btn-primary logout-btn" onClick={handleLogout}>
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => { setShowAuthPopup(true); }}>
              <Lock size={16} /> Admin Login
            </button>
          )}
        </div>
      </header>

      <div className="admin-stats-bar">
        <div className="admin-stat-widget">
          <span className="widget-label">Total Requests</span>
          <span className="widget-value">{requests.length}</span>
        </div>
        <div className="admin-search-wrapper">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, company, email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-search-input"
          />
        </div>
      </div>

      {loading ? (
        <div className="admin-loading">Loading interview schedules...</div>
      ) : filteredRequests.length === 0 ? (
        <div className="admin-empty-state">
          <p>No interview schedules found.</p>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Recruiter Info</th>
                <th>Company</th>
                <th>Requested Date & Time</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr key={req.id}>
                  <td>
                    <div className="recruiter-meta-block">
                      <div className="recruiter-name-row">
                        <User size={14} /> <strong>{req.recruiter_name}</strong>
                      </div>
                      <div className="recruiter-sub-row">
                        <Mail size={12} /> <a href={`mailto:${req.email}`}>{req.email}</a>
                      </div>
                      {req.phone && (
                        <div className="recruiter-sub-row">
                          <Phone size={12} /> <span>{req.phone}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="company-block">
                      <Briefcase size={14} /> <span>{req.company}</span>
                    </div>
                  </td>
                  <td>
                    <div className="date-block">
                      <Calendar size={14} /> <span>{formatDateTime(req.requested_date)}</span>
                    </div>
                  </td>
                  <td className="message-cell">
                    <p className="request-message-text">{req.message || <em style={{ color: 'var(--text-dim)' }}>No message provided</em>}</p>
                  </td>
                  <td>
                    <div className="table-actions">
                      <a 
                        href={isAuthenticated ? generateGmailUrl(req) : "#"} 
                        onClick={(e) => handleConfirmClick(e, req)}
                        className="action-btn approve-btn" 
                        target={isAuthenticated ? "_blank" : undefined}
                        rel={isAuthenticated ? "noopener noreferrer" : undefined} 
                        title="Confirm & Open Gmail"
                      >
                        <Check size={16} /> Confirm
                      </a>
                      <button className="action-btn delete-btn" onClick={() => handleDeleteClick(req.id)} title="Decline Schedule">
                        <Trash2 size={16} /> Decline
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Custom Modal */}
      {deleteConfirmId && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <h3>Decline Request</h3>
            <p>Are you sure you want to decline and permanently delete this schedule request?</p>
            <div className="admin-modal-actions">
              <button className="btn btn-secondary" onClick={() => setDeleteConfirmId(null)}>
                Cancel
              </button>
              <button 
                className="btn btn-danger" 
                onClick={() => {
                  executeDelete(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                style={{ background: '#ef4444', color: '#fff', border: 'none' }}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Login Popup Dialog Modal */}
      {showAuthPopup && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card auth-popup-card">
            <form onSubmit={handleLoginSubmit} className="admin-form">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Lock size={20} style={{ color: 'var(--primary)' }} />
                <h4 style={{ color: 'var(--text-bright)', margin: 0 }}>Admin Authentication</h4>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-dim)', marginBottom: '16px' }}>
                Please login with your admin credentials to confirm or decline interview schedules.
              </p>
              {loginError && <div className="admin-error" style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>{loginError}</div>}
              
              <div className="form-group">
                <label htmlFor="auth-user">Admin Username</label>
                <input 
                  type="text" 
                  id="auth-user" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  className="form-input" 
                  placeholder="Enter Username"
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="auth-pass">Admin Password</label>
                <input 
                  type="password" 
                  id="auth-pass" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="form-input" 
                  placeholder="Enter Password"
                  required 
                />
              </div>

              <div className="admin-login-actions" style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowAuthPopup(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
