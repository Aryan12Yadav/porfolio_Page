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
  Server,
  Sun,
  Moon,
  ArrowDown
} from 'lucide-react';

// Modular Components
import Typewriter from './components/Typewriter/Typewriter';
import InterviewCenter from './components/InterviewCenter/InterviewCenter';
import GreetingModal from './components/GreetingModal/GreetingModal';
import AIChatbot from './components/AIChatbot/AIChatbot';
import ResumePortal from './components/ResumePortal/ResumePortal';
import ProjectCard from './components/ProjectCard/ProjectCard';

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

const typingPhrases = [
  "Full Stack Python Developer",
  "AI Engineer",
  "MLOps Builder",
  "Software Engineer"
];


const getAIResponse = (userInput, projectsList) => {
  const query = userInput.toLowerCase();

  if (query.includes('project') || query.includes('work') || query.includes('🚀')) {
    if (projectsList && projectsList.length > 0) {
      const projTitles = projectsList.map(p => `• **${p.title}**: ${p.description}`).join('\n\n');
      return `Maine Django aur React par multiple complex projects deploy kiye hain:\n\n${projTitles}\n\nAap details page par inke dynamic tech implementation specifications read kar sakte hain!`;
    }
    return "Main multiple full-stack React-Django aur ML pipeline architectures compile kar chuka hu. Detailed summaries check karne ke liye projects section visit karein!";
  }

  if (query.includes('resume') || query.includes('cv') || query.includes('📄')) {
    return "Aryan ke paas 2 professional resumes structured hain:\n1. **Full Stack Python Developer Resume** (Backend, APIs, SQL focus)\n2. **AI Engineer Resume** (MLOps, Large Models integration)\n\nAap contact section me unhe reach out karke ya direct preview portal se unhe retrieve kar sakte hain.";
  }

  if (query.includes('location') || query.includes('relo') || query.includes('📍') || query.includes('kaha')) {
    return "Aryan India se functional hain aur high-growth tech positions ke liye relocate karne ke liye fully open hain.";
  }

  if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('📞')) {
    return "Aryan ko direct email kiya ja sakta hai at **aryanyadav892408@gmail.com** ya aap local page ke form me custom time slots choose karke schedule query drop kar sakte hain!";
  }

  if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
    return "Hey there! Aap Aryan ke credentials, project structure, ya professional work details ke bare me pooch sakte hain. How can I help you today?";
  }

  return "Ye feedback interesting hai! Main is query ka precise answer find kar raha hu. Aap dynamic projects section verify kar sakte hain ya contact details click kar sakte hain!";
};


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const [formData, setFormData] = useState({
    recruiter_name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    requested_date: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      await axios.post('http://127.0.0.1:8000/api/interview-requests/', formData);
      setFormStatus({
        type: 'success',
        message: 'Aapki request receive ho gayi hai! Aryan will review and reach back shortly.'
      });
      setFormData({
        recruiter_name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
        requested_date: ''
      });
    } catch (err) {
      console.error("Error submitting interview request:", err);
      let errMsg = 'Something went wrong. Please check inputs and try again.';
      if (err.response && err.response.data) {
        errMsg = Object.entries(err.response.data)
          .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(' ') : val}`)
          .join('\n');
      }
      setFormStatus({
        type: 'error',
        message: errMsg
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('theme-light');
    } else {
      root.classList.remove('theme-light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'assistant', text: "Hello Recruiter! Main Aryan ka futuristic AI Assistant hu. Main unke projects explain kar sakta hu, Resumes highlight kar sakta hu, ya contact details provide kar sakta hu. Poochiye!" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [activeResume, setActiveResume] = useState('fullstack');
  const [greetingOpen, setGreetingOpen] = useState(() => {
    return !sessionStorage.getItem('greetingShown');
  });

  const closeGreeting = () => {
    sessionStorage.setItem('greetingShown', 'true');
    setGreetingOpen(false);
  };

  const handleGreetingChat = () => {
    closeGreeting();
    setChatOpen(true);
  };

  const sendChatMessage = (text) => {
    if (!text.trim()) return;

    // Add user message
    const newMessages = [...chatMessages, { sender: 'user', text }];
    setChatMessages(newMessages);
    setChatInput('');

    // Generate assistant response
    setTimeout(() => {
      const response = getAIResponse(text, projects);
      setChatMessages(prev => [...prev, { sender: 'assistant', text: response }]);
    }, 600);
  };

  const handleChatSend = (e) => {
    e.preventDefault();
    sendChatMessage(chatInput);
  };

  const handleSuggestionClick = (suggestionText) => {
    sendChatMessage(suggestionText);
  };

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

  const [currentView, setCurrentView] = useState('portfolio');

  const handleNavClick = (viewName, targetId) => {
    setCurrentView(viewName);
    if (sidebarOpen) setSidebarOpen(false);
    
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

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
            <li><a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('portfolio', 'home'); }}>Home</a></li>
            <li><a href="#projects" onClick={(e) => { e.preventDefault(); handleNavClick('portfolio', 'projects'); }}>Projects</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('portfolio', 'about'); }}>About</a></li>
            <li><a href="#credentials" onClick={(e) => { e.preventDefault(); handleNavClick('portfolio', 'credentials'); }}>Credentials</a></li>
            <li><a href="#collab" onClick={(e) => { e.preventDefault(); handleNavClick('interview-center', 'collab'); }} style={{ color: 'var(--primary)' }}>Interview Collab</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('portfolio', 'contact'); }}>Contact</a></li>
            <li>
              <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme" style={{ marginLeft: '12px' }}>
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </li>
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="theme-toggle-btn hamburger" onClick={toggleTheme} aria-label="Toggle Theme" style={{ display: 'inline-flex' }}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="hamburger" onClick={toggleSidebar} aria-label="Toggle Menu">
              <Menu size={24} />
            </button>
          </div>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button className="close-btn" onClick={toggleSidebar} aria-label="Close Menu">
              <X size={24} />
            </button>
          </div>
        </div>
        <ul className="sidebar-links">
          <li>
            <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('portfolio', 'home'); }}>
              <Terminal size={18} /> Home
            </a>
          </li>
          <li>
            <a href="#projects" onClick={(e) => { e.preventDefault(); handleNavClick('portfolio', 'projects'); }}>
              <Briefcase size={18} /> Projects
            </a>
          </li>
          <li>
            <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('portfolio', 'about'); }}>
              <User size={18} /> About
            </a>
          </li>
          <li>
            <a href="#credentials" onClick={(e) => { e.preventDefault(); handleNavClick('portfolio', 'credentials'); }}>
              <Briefcase size={18} /> Credentials
            </a>
          </li>
          <li>
            <a href="#collab" onClick={(e) => { e.preventDefault(); handleNavClick('interview-center', 'collab'); }}>
              <Server size={18} /> Interview Collab
            </a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('portfolio', 'contact'); }}>
              <Mail size={18} /> Contact
            </a>
          </li>
        </ul>
      </aside>

      {currentView === 'portfolio' ? (
        <>
          {/* HERO SECTION */}
          <section id="home" className="hero">
        <div className="space-bg">
          <div className="stars-overlay"></div>
          <div className="stars-overlay-2"></div>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-pill">
            <Terminal size={14} /> Full Stack Python Developer + AI Engineer
          </div>
          <h1 className="hero-title">
            Hi, I am <span>Aryan Yadav</span> <br />
            I build <span style={{ color: 'var(--primary)' }}><Typewriter phrases={typingPhrases} /></span>
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
              <ProjectCard key={project.id} project={project} />
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

      {/* CREDENTIALS & RESUMES SECTION */}
      <section id="credentials" className="section">
        <div className="section-header">
          <span className="section-subtitle">Credentials</span>
          <h2 className="section-title">Resumes & Certifications</h2>
        </div>

        <ResumePortal activeResume={activeResume} setActiveResume={setActiveResume} />
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="section">
        <div className="section-header">
          <span className="section-subtitle">Reach Out</span>
          <h2 className="section-title">Schedule an Interview</h2>
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

          <form className="interview-form" onSubmit={handleFormSubmit}>
            {formStatus.message && (
              <div className={`form-alert ${formStatus.type}`} style={{ whiteSpace: 'pre-line' }}>
                {formStatus.message}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="recruiter_name">Name</label>
              <input 
                type="text" 
                id="recruiter_name" 
                name="recruiter_name" 
                className="form-input" 
                value={formData.recruiter_name} 
                onChange={handleFormChange} 
                placeholder="Your Name" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input 
                type="text" 
                id="company" 
                name="company" 
                className="form-input" 
                value={formData.company} 
                onChange={handleFormChange} 
                placeholder="Company Name" 
                required 
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="form-input" 
                  value={formData.email} 
                  onChange={handleFormChange} 
                  placeholder="name@company.com" 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone (Optional)</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  className="form-input" 
                  value={formData.phone} 
                  onChange={handleFormChange} 
                  placeholder="+1 (555) 000-0000" 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="requested_date">Preferred Date & Time</label>
              <input 
                type="datetime-local" 
                id="requested_date" 
                name="requested_date" 
                className="form-input" 
                value={formData.requested_date} 
                onChange={handleFormChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message (Optional)</label>
              <textarea 
                id="message" 
                name="message" 
                className="form-textarea" 
                value={formData.message} 
                onChange={handleFormChange} 
                placeholder="Let me know details about the role/interview..."
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ justifyContent: 'center' }}>
              {isSubmitting ? 'Scheduling...' : 'Request Schedule'}
            </button>
          </form>
        </div>
      </section>
        </>
      ) : (
        <InterviewCenter backToPortfolio={() => { setCurrentView('portfolio'); window.scrollTo(0,0); }} />
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Aryan Yadav. All rights reserved.</p>
          <ul className="footer-links">
            <li><a href="https://github.com/Aryan12Yadav" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
        </div>
      </footer>

      {/* Modular AI Chatbot */}
      <AIChatbot 
        chatOpen={chatOpen} 
        setChatOpen={setChatOpen} 
        chatMessages={chatMessages} 
        chatInput={chatInput} 
        setChatInput={setChatInput} 
        handleChatSend={handleChatSend} 
        handleSuggestionClick={handleSuggestionClick} 
      />

      {/* Modular Recruiter Greeting Modal */}
      <GreetingModal 
        isOpen={greetingOpen} 
        onClose={closeGreeting} 
        onTalkToAI={handleGreetingChat} 
      />
    </div>
  );
}

export default App;
