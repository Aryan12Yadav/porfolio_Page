import React from 'react';
import './GreetingModal.css';

export default function GreetingModal({ isOpen, onClose, onTalkToAI }) {
  if (!isOpen) return null;

  return (
    <div className="greeting-overlay">
      <div className="greeting-card">
        <div className="greeting-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rocket">
            <path d="M4.5 16.5c-1.5 1.26-2 3.43-2 3.43s2.17-.5 3.43-2" />
            <path d="m22 2-8 8" />
            <path d="M12 18H8l-4 4V18H3c-1.1 0-2-.9-2-2v-3c0-1.1.9-2 2-2h3l4-4h4" />
            <path d="M19 5.4 18.6 5a2 2 0 0 0-2.8 0L9.4 11.4a2 2 0 0 0 0 2.8l.4.4" />
          </svg>
        </div>
        <h2 className="greeting-title">Welcome, Recruiter! 🚀</h2>
        <p className="greeting-text">
          Hey! Main Aryan Yadav ka digital space portal hu. Aap unke projects live browse kar sakte hain, custom interview slot request trigger kar sakte hain, ya right-bottom me present custom AI Copilot widget se immediately query double check kar sakte hain!
        </p>
        <div className="greeting-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Explore Page
          </button>
          <button className="btn btn-primary" onClick={onTalkToAI}>
            Talk to AI Bot
          </button>
        </div>
      </div>
    </div>
  );
}
