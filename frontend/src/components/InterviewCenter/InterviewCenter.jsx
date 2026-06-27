import React from 'react';
import './InterviewCenter.css';

export default function InterviewCenter({ backToPortfolio }) {
  return (
    <div className="collab-container">
      <button className="collab-back-btn" onClick={backToPortfolio}>
        ← Back to Portfolio
      </button>

      <div className="collab-intro">
        <h1 className="collab-title">Interview Collaboration Center</h1>
        <p className="collab-subtitle">
          Futuristic mockups for real-time collaboration during recruiter interviews and technical evaluation rounds.
        </p>
      </div>

      <div className="collab-grid">
        {/* Card 1: Video Calling */}
        <div className="collab-card">
          <div className="collab-card-header">
            <h3 className="collab-card-title">
              Video Calling
            </h3>
            <span className="collab-mock-badge">Beta Mockup</span>
          </div>
          <div className="collab-mock-screen">
            <div className="mock-webcam-container">
              <div className="mock-webcam-feed">Recruiter Feed</div>
              <div className="mock-webcam-feed" style={{ border: '1px solid var(--primary)' }}>Aryan (You)</div>
            </div>
          </div>
          <p className="collab-card-desc">
            Integrated high-definition WebRTC video calling channel supporting low-latency connection and mute controls.
          </p>
        </div>

        {/* Card 2: Live Code Sharing */}
        <div className="collab-card">
          <div className="collab-card-header">
            <h3 className="collab-card-title">
              Live Coding IDE
            </h3>
            <span className="collab-mock-badge">Beta Mockup</span>
          </div>
          <div className="collab-mock-screen">
            <div className="mock-code-editor">
              1: def train_model(data):<br />
              2: &nbsp;&nbsp;&nbsp;&nbsp;model = compile_architect()<br />
              3: &nbsp;&nbsp;&nbsp;&nbsp;model.fit(data)<br />
              4: &nbsp;&nbsp;&nbsp;&nbsp;print("Model deployed!")
            </div>
          </div>
          <p className="collab-card-desc">
            Collab editor with syntax highlighting, support for python scripts, and standard debugger outputs.
          </p>
        </div>

        {/* Card 3: Whiteboard Drawing */}
        <div className="collab-card">
          <div className="collab-card-header">
            <h3 className="collab-card-title">
              Collaborative Whiteboard
            </h3>
            <span className="collab-mock-badge">Beta Mockup</span>
          </div>
          <div className="collab-mock-screen">
            <div className="mock-whiteboard">
              [ Whiteboard Workspace Canvas ]
            </div>
          </div>
          <p className="collab-card-desc">
            Real-time drawing canvas to explain machine learning topologies, database schemas, and architectural layouts.
          </p>
        </div>
      </div>
    </div>
  );
}
