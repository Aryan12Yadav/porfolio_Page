import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Menu, 
  X, 
  ExternalLink, 
  Briefcase, 
  Mail, 
  User, 
  Code, 
  MapPin, 
  Phone, 
  Database,
  Terminal,
  Server
} from 'lucide-react';

const GithubIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const fallbackProjects = [
  {
    id: 1,
    title: "E-Commerce Cloud Platform",
    description: "A secure, scalable e-commerce application built on React, Django, and PostgreSQL featuring a microservices architecture.",
    demo_url: "https://example.com",
    repo_url: "https://github.com",
  },
  {
    id: 2,
    title: "AI Medical Copilot",
    description: "An AI-powered diagnostic helper built using FastAPI, React, and langchain multi-agent architecture.",
    demo_url: "https://example.com",
    repo_url: "https://github.com",
  },
  {
    id: 3,
    title: "MLOps Training Pipeline",
    description: "An automated pipeline built on AWS, Docker, and GitHub Actions to ingest, validate, and train machine learning models.",
    demo_url: "https://example.com",
    repo_url: "https://github.com",
  }
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch projects from Django Backend
    axios.get('http://127.0.0.1:8000/api/projects/')
      .then(response => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching projects from backend, using fallback data:", err);
        setProjects(fallbackProjects); // Fallback to mock data on connection error
        setLoading(false);
      });
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="app-container">
      
      {/* HEADER / NAVBAR */}
      <header className="header">
        <div className="nav-container">
          <a href="#" className="logo">
            <Terminal size={24} />
            <span>Aryan.Dev</span>
          </a>
          
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          <button className="hamburger" onClick={toggleSidebar} aria-label="Toggle Menu">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* MOBILE SIDEBAR (Android compatible sliding drawer) */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="logo">
            <Terminal size={20} />
            <span>Menu</span>
          </span>
          <button className="close-btn" onClick={toggleSidebar} aria-label="Close Menu">
            <X size={24} />
          </button>
        </div>
        <ul className="sidebar-links">
          <li>
            <a href="#home" onClick={toggleSidebar}>
              <Terminal size={18} /> Home
            </a>
          </li>
          <li>
            <a href="#projects" onClick={toggleSidebar}>
              <Briefcase size={18} /> Projects
            </a>
          </li>
          <li>
            <a href="#about" onClick={toggleSidebar}>
              <User size={18} /> About
            </a>
          </li>
          <li>
            <a href="#contact" onClick={toggleSidebar}>
              <Mail size={18} /> Contact
            </a>
          </li>
        </ul>
      </aside>

      {/* HERO SECTION */}
      <section id="home" className="hero">
        <div className="hero-pill">
          <Terminal size={14} /> Full Stack Developer
        </div>
        <h1 className="hero-title">
          Hi, I am <span>Aryan Yadav</span> <br />
          I Build Modern Web Apps.
        </h1>
        <p className="hero-description">
          Specializing in React, Django, PostgreSQL, and MLOps. Designing clean, premium, and performant web interfaces integrated with scalable backend architectures.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            View My Projects <Briefcase size={16} />
          </a>
          <a href="#contact" className="btn btn-secondary">
            Get in touch
          </a>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="section">
        <div className="section-header">
          <span className="section-subtitle">Portfolio</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        {loading ? (
          <div className="loading-wrapper">
            <div className="loader"></div>
            <p>Fetching projects from Django Backend...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="empty-wrapper">
            <p>No projects found. Add some from the Django admin panel!</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.id}>
                <div className="project-image-placeholder">
                  <Code size={48} strokeWidth={1} />
                </div>
                <div className="project-content">
                  <h3 className="project-card-title">{project.title}</h3>
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
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ABOUT & SKILLS SECTION */}
      <section id="about" className="section">
        <div className="about-grid">
          <div>
            <span className="section-subtitle">Profile</span>
            <h2 className="section-title">About Me</h2>
            <p style={{ marginTop: '20px', fontSize: '16px' }}>
              I'm a full-stack engineer passionate about crafting scalable server architectures and interactive, pixel-perfect user interfaces. I love automating deployments and working with modern databases.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>My Tech Stack</h3>
            <div className="skills-list">
              <span className="skill-tag"><Code size={14} /> React</span>
              <span className="skill-tag"><Server size={14} /> Django</span>
              <span className="skill-tag"><Database size={14} /> PostgreSQL</span>
              <span className="skill-tag"><Terminal size={14} /> Python</span>
              <span className="skill-tag"><Database size={14} /> MongoDB</span>
              <span className="skill-tag"><Code size={14} /> JavaScript</span>
              <span className="skill-tag"><Terminal size={14} /> MLOps</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="section">
        <div className="section-header">
          <span className="section-subtitle">Reach Out</span>
          <h2 className="section-title">Contact Information</h2>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon-wrapper">
                <Mail size={20} />
              </div>
              <div>
                <h4>Email</h4>
                <p>aryanyadav892408@gmail.com</p>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon-wrapper">
                <MapPin size={20} />
              </div>
              <div>
                <h4>Location</h4>
                <p>India</p>
              </div>
            </div>
          </div>

          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon-wrapper">
                <GithubIcon size={20} />
              </div>
              <div>
                <h4>GitHub</h4>
                <a href="https://github.com/Aryan12Yadav" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', textDecoration: 'underline' }}>
                  github.com/Aryan12Yadav
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Aryan Yadav. All rights reserved.</p>
          <ul className="footer-links">
            <li><a href="https://github.com/Aryan12Yadav" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
        </div>
      </footer>

    </div>
  );
}

export default App;
