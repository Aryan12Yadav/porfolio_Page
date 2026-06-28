import React from 'react';
import { ArrowDown } from 'lucide-react';
import './ResumePortal.css';

export default function ResumePortal({ activeResume, setActiveResume }) {
  return (
    <div className="credentials-grid">
      <div className="resume-portal-card">
        <div className="resume-tabs">
          <button 
            className={`resume-tab-btn ${activeResume === 'fullstack' ? 'active' : ''}`}
            onClick={() => setActiveResume('fullstack')}
          >
            Software Developer
          </button>
          <button 
            className={`resume-tab-btn ${activeResume === 'ai' ? 'active' : ''}`}
            onClick={() => setActiveResume('ai')}
          >
            AI/ML Engineer
          </button>
        </div>

        {activeResume === 'fullstack' ? (
          <div className="resume-preview-content">
            <p className="resume-summary">
              B.Tech student specializing in Artificial Intelligence and Machine Learning with strong hands-on experience building end-to-end web applications and deep learning integrations. Proficient in Python, Django, REST APIs, and database engines.
            </p>
            
            <h4 className="resume-section-title">Core Competencies</h4>
            <div className="skills-list" style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <span className="skill-tag" style={{ padding: '6px 12px', fontSize: '12px' }}>Python</span>
              <span className="skill-tag" style={{ padding: '6px 12px', fontSize: '12px' }}>Django & DRF</span>
              <span className="skill-tag" style={{ padding: '6px 12px', fontSize: '12px' }}>FastAPI & Flask</span>
              <span className="skill-tag" style={{ padding: '6px 12px', fontSize: '12px' }}>PostgreSQL & SQL</span>
              <span className="skill-tag" style={{ padding: '6px 12px', fontSize: '12px' }}>Git & GitHub</span>
            </div>

            <h4 className="resume-section-title">Featured Projects</h4>
            <ul className="resume-bullet-list">
              <li>
                <strong>Premium Blogging System with Authentication:</strong> Built a secure blogging platform with user authentication and CRUD operations. Developed REST APIs for content management and validated secure access.
              </li>
              <li>
                <strong>Vehicle Insurance Prediction System:</strong> Built an end-to-end MLOps pipeline for vehicle insurance prediction with automated data ingestion, validation, and transformation.
              </li>
            </ul>

            <h4 className="resume-section-title">Education</h4>
            <ul className="resume-bullet-list">
              <li>
                <strong>Kanpur University (UIET Kanpur)</strong> — Pursuing B.Tech Computer Science (AI), 2023 - 2027 (CPI: 7.4)
              </li>
              <li>
                <strong>Creative Convent College</strong> — Completed X and XII with 88.3% and 87%
              </li>
            </ul>

            <a 
              href="#" 
              className="btn btn-primary" 
              style={{ marginTop: '16px', alignSelf: 'flex-start' }}
              onClick={(e) => {
                e.preventDefault();
                alert('Software Developer Resume PDF download started!');
              }}
            >
              Download Resume <ArrowDown size={16} />
            </a>
          </div>
        ) : (
          <div className="resume-preview-content">
            <p className="resume-summary">
              Passionate AI and Machine Learning enthusiast with a strong foundation in data preprocessing, feature engineering, predictive modeling, and deep learning solutions. Experienced in deploying model pipelines in AWS cloud environments.
            </p>
            
            <h4 className="resume-section-title">Expertise</h4>
            <div className="skills-list" style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <span className="skill-tag" style={{ padding: '6px 12px', fontSize: '12px' }}>PyTorch & TensorFlow</span>
              <span className="skill-tag" style={{ padding: '6px 12px', fontSize: '12px' }}>Pandas & NumPy</span>
              <span className="skill-tag" style={{ padding: '6px 12px', fontSize: '12px' }}>scikit-learn</span>
              <span className="skill-tag" style={{ padding: '6px 12px', fontSize: '12px' }}>NLP & CV</span>
              <span className="skill-tag" style={{ padding: '6px 12px', fontSize: '12px' }}>MLOps (Docker, AWS EC2/S3)</span>
            </div>

            <h4 className="resume-section-title">Experience</h4>
            <ul className="resume-bullet-list">
              <li>
                <strong>AI/ML Subject Matter Expert (Intern)</strong> — House of Couton Private Limited, Lucknow (3 Months): Worked on applied ML tasks including CNNs, LSTM, regression, and time-series forecasting.
              </li>
              <li>
                <strong>Machine Learning Intern (2023 - 2026):</strong> Engineered data cleaning, feature optimization, and validation loops for academic research models.
              </li>
            </ul>

            <h4 className="resume-section-title">AI/ML Projects</h4>
            <ul className="resume-bullet-list">
              <li>
                <strong>NLP Sentiment Analysis System:</strong> Complete GitHub CI/CD pipeline and AWS cloud deployment for automated model training, validation testing, and API inference.
              </li>
              <li>
                <strong>Real-Time AI-Powered Cyber Threat Detection:</strong> Built a real-time ML-based system for cyber attack detection and classification.
              </li>
            </ul>

            <a 
              href="#" 
              className="btn btn-primary" 
              style={{ marginTop: '16px', alignSelf: 'flex-start' }}
              onClick={(e) => {
                e.preventDefault();
                alert('AI/ML Engineer Resume PDF download started!');
              }}
            >
              Download Resume <ArrowDown size={16} />
            </a>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Physics Wallah Certificate Card */}
        <div className="cert-card">
          <div className="cert-header">
            <span className="cert-badge">Verified Credentials</span>
            <h3 className="cert-title">Full Stack Data Science Pro</h3>
            <span className="cert-duration" style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600', display: 'block', marginTop: '4px' }}>2-Year Comprehensive Program</span>
            <span className="cert-authority">Physics Wallah (PW)</span>
          </div>
          
          <div className="cert-body">
            <p className="cert-syllabus-summary">
              A rigorous 2-year industrial program covering advanced Python engineering, exploratory data analysis, machine learning algorithms, deep learning deployments, MLOps cloud pipeline automation, and relational database system management.
            </p>
            
            <div className="cert-meta-info" style={{ margin: '12px 0', fontSize: '13px', color: 'var(--text)', borderLeft: '2px solid var(--primary)', paddingLeft: '10px' }}>
              <div><strong>Issue Date:</strong> January 30, 2025</div>
              <div style={{ marginTop: '2px' }}><strong>Credential ID:</strong> <code style={{ fontSize: '11px', color: 'var(--text-bright)' }}>4e835d36-2fda-4020-ae8b-389803c27cce</code></div>
            </div>

            <h4 style={{ fontSize: '14px', color: 'var(--text-bright)', fontWeight: '700', marginTop: '16px' }}>Key Syllabus Competencies</h4>
            <div className="cert-topics-list">
              <span className="cert-topic-tag">EDA & Modeling</span>
              <span className="cert-topic-tag">Relational DBs</span>
              <span className="cert-topic-tag">Docker Containers</span>
              <span className="cert-topic-tag">MLOps Pipelines</span>
              <span className="cert-topic-tag">Cloud Integration</span>
            </div>

            <a 
              href="https://pwskills.com/learn/certificate/4e835d36-2fda-4020-ae8b-389803c27cce" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
              style={{ marginTop: '16px', justifyContent: 'center' }}
            >
              Verify Certificate
            </a>
          </div>
        </div>

        {/* CodSoft Internship Certificate Card */}
        <div className="cert-card">
          <div className="cert-header">
            <span className="cert-badge" style={{ background: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.3)', color: '#60a5fa' }}>Verified Internship</span>
            <h3 className="cert-title">Python Programming Intern</h3>
            <span className="cert-duration" style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600', display: 'block', marginTop: '4px' }}>4-Week Virtual Internship (First Year)</span>
            <span className="cert-authority">CodSoft</span>
          </div>
          
          <div className="cert-body">
            <p className="cert-syllabus-summary">
              Successfully completed a comprehensive 4-week software engineering internship focusing on core Python architecture, object-oriented concepts, and task automation scripting.
            </p>
            
            <div className="cert-meta-info" style={{ margin: '12px 0', fontSize: '13px', color: 'var(--text)', borderLeft: '2px solid var(--primary)', paddingLeft: '10px' }}>
              <div><strong>Internship Period:</strong> 25/08/2024 to 25/09/2024</div>
              <div style={{ marginTop: '2px' }}><strong>Issue Date:</strong> September 28, 2024</div>
              <div style={{ marginTop: '2px' }}><strong>Certificate ID:</strong> <code style={{ fontSize: '11px', color: 'var(--text-bright)' }}>b405765</code></div>
            </div>

            <h4 style={{ fontSize: '14px', color: 'var(--text-bright)', fontWeight: '700', marginTop: '16px' }}>Key Syllabus Competencies</h4>
            <div className="cert-topics-list">
              <span className="cert-topic-tag">OOPs Concepts</span>
              <span className="cert-topic-tag">Python Scripting</span>
              <span className="cert-topic-tag">Data Structures</span>
              <span className="cert-topic-tag">Task Automation</span>
            </div>

            <a 
              href="https://www.codsoft.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
              style={{ marginTop: '16px', justifyContent: 'center' }}
            >
              Verify Company
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
