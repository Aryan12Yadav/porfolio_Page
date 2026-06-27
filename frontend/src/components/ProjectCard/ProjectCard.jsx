import React, { useState } from 'react';
import { ExternalLink, Code, ChevronDown, ChevronUp } from 'lucide-react';
import './ProjectCard.css';

const GithubIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);

  // Split tags by comma
  const tags = project.tech_stack 
    ? project.tech_stack.split(',').map(tag => tag.trim()) 
    : [];

  return (
    <article className="project-card">
      <div className="project-image-placeholder">
        <Code size={48} strokeWidth={1} />
      </div>
      <div className="project-content">
        <h3 className="project-card-title">{project.title}</h3>
        
        {tags.length > 0 && (
          <div className="project-tech-tags">
            {tags.map((tag, idx) => (
              <span key={idx} className="project-tech-tag">{tag}</span>
            ))}
          </div>
        )}

        <p className="project-card-description">{project.description}</p>
        
        <div className="project-links">
          {project.repo_url && (
            <a 
              href={project.repo_url} 
              className="project-link-btn" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <GithubIcon size={16} /> Code
            </a>
          )}
          {project.demo_url && (
            <a 
              href={project.demo_url} 
              className="project-link-btn" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <ExternalLink size={16} /> Demo
            </a>
          )}
        </div>

        {/* Expandable Details Trigger */}
        {(project.implementation_details || project.challenges_solved || project.key_learnings) && (
          <>
            <button 
              className="project-details-btn" 
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
            >
              {expanded ? (
                <>Hide Engineering Details <ChevronUp size={16} /></>
              ) : (
                <>View Engineering Details <ChevronDown size={16} /></>
              )}
            </button>

            {expanded && (
              <div className="project-details-pane">
                {project.implementation_details && (
                  <div className="project-detail-section">
                    <span className="project-detail-label">Implementation</span>
                    <p className="project-detail-text">{project.implementation_details}</p>
                  </div>
                )}
                {project.challenges_solved && (
                  <div className="project-detail-section">
                    <span className="project-detail-label">Engineering Challenges</span>
                    <p className="project-detail-text">{project.challenges_solved}</p>
                  </div>
                )}
                {project.key_learnings && (
                  <div className="project-detail-section">
                    <span className="project-detail-label">Key Learnings</span>
                    <p className="project-detail-text">{project.key_learnings}</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </article>
  );
}
