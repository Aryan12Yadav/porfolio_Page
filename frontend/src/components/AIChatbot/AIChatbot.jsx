import React from 'react';
import { X } from 'lucide-react';
import './AIChatbot.css';

export default function AIChatbot({ 
  chatOpen, 
  setChatOpen, 
  chatMessages, 
  chatInput, 
  setChatInput, 
  handleChatSend, 
  handleSuggestionClick 
}) {
  return (
    <>
      {/* AI Assistant Launcher Orb */}
      <button className="ai-orb-launcher" onClick={() => setChatOpen(true)} aria-label="Open AI Assistant">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot">
          <path d="M12 8V4H8" />
          <rect width="16" height="12" x="4" y="8" rx="2" />
          <path d="M2 14h2" />
          <path d="M20 14h2" />
          <path d="M15 13v2" />
          <path d="M9 13v2" />
        </svg>
      </button>

      {/* AI Chat Window Modal */}
      {chatOpen && (
        <>
          <div className="ai-chat-overlay" onClick={() => setChatOpen(false)}></div>
          <div className="ai-chat-window">
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="chat-avatar-orb">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 8V4H8" />
                    <rect width="16" height="12" x="4" y="8" rx="2" />
                    <path d="M2 14h2" />
                    <path d="M20 14h2" />
                    <path d="M15 13v2" />
                    <path d="M9 13v2" />
                  </svg>
                </div>
                <div className="chat-title">
                  <h3>Aryan Yadav's AI Copilot</h3>
                  <p>Online & Responsive</p>
                </div>
              </div>
              <button className="chat-close-btn" onClick={() => setChatOpen(false)} aria-label="Close Chat">
                <X size={20} />
              </button>
            </div>

            <div className="chat-messages">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`chat-msg ${msg.sender}`}>
                  <div className="chat-bubble" style={{ whiteSpace: 'pre-line' }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="chat-suggestions">
              <button className="suggestion-chip" onClick={() => handleSuggestionClick("Explain projects 🚀")}>
                Explain projects 🚀
              </button>
              <button className="suggestion-chip" onClick={() => handleSuggestionClick("Download Resume 📄")}>
                Download Resume 📄
              </button>
              <button className="suggestion-chip" onClick={() => handleSuggestionClick("Are you open to relocate? 📍")}>
                Open to relocate? 📍
              </button>
              <button className="suggestion-chip" onClick={() => handleSuggestionClick("How to contact? 📞")}>
                How to contact? 📞
              </button>
            </div>

            <form className="chat-input-area" onSubmit={handleChatSend}>
              <input 
                type="text" 
                className="chat-input" 
                placeholder="Ask something about Aryan..." 
                value={chatInput} 
                onChange={(e) => setChatInput(e.target.value)} 
              />
              <button type="submit" className="chat-send-btn">
                Send
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
