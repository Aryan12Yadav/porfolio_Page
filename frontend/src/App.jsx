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
  ArrowDown,
  Cpu,
  BookOpen,
  Award,
  MessageCircle
} from 'lucide-react';

// Modular Components
import Typewriter from './components/Typewriter/Typewriter';
import InterviewCenter from './components/InterviewCenter/InterviewCenter';
import GreetingModal from './components/GreetingModal/GreetingModal';
import AIChatbot from './components/AIChatbot/AIChatbot';
import ResumePortal from './components/ResumePortal/ResumePortal';
import ProjectCard from './components/ProjectCard/ProjectCard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';

const GithubIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const fallbackProjects = [
  {
    id: 1,
    title: "Premium Blogging System",
    description: "A secure, features-rich blogging platform with user authentication, CRUD operations, and content management tools built on React, Django, and PostgreSQL.",
    tech_stack: "React, Django, Django REST Framework, PostgreSQL, JWT Authentication, AWS S3",
    implementation_details: "Designed and implemented user registration, secure login session system, and profile management using JWT authentication. Developed robust REST APIs using Django REST Framework for creating, reading, updating, and deleting blog posts. Configured categories, custom tags, likes, comments, and file upload system storing assets in cloud media containers.",
    challenges_solved: "Optimized database querying for posts, tags, and comment hierarchies using Django's select_related and prefetch_related, reducing page load latency by 45%. Implemented strict permission classes ensuring only authorized authors can modify their posts.",
    key_learnings: "Mastered token-based authentication and secure session storage on frontend. Gained hands-on experience in API pagination, search filtering, and designing scalable relational schemas for content platforms.",
    demo_url: "https://github.com/Aryan12Yadav/Premium-Bloggin-System",
    repo_url: "https://github.com/Aryan12Yadav/Premium-Bloggin-System",
  },
  {
    id: 2,
    title: "AI Medical Copilot",
    description: "An intelligent healthcare intelligence platform designed to extract, analyze, and compare medical reports using OCR and Multi-Agent AI architecture.",
    tech_stack: "FastAPI, React, PostgreSQL, SQLAlchemy, LangChain, OCR, JWT Authentication",
    implementation_details: "Built a medical report processing workflow: user upload -> Tesseract OCR text extraction -> AI report analysis mapping key health data (Patient info, category, risk indicators). Integrated report-specific interactive AI chat assisting patients in query resolution. Added report comparison tracking health score trends over time.",
    challenges_solved: "Established a strict medical safety guardrails framework preventing AI from hallucinating unsupported diagnoses or drug prescriptions. Configured optimized SQLAlchemy transaction pools for multi-page document metadata parsing.",
    key_learnings: "Developed proficiency in LangChain agent systems, PDF OCR text preprocessing, and structuring unstructured medical documentation into compliant database records.",
    demo_url: "https://github.com/Aryan12Yadav/Multi-Agent-Healthcare-Copilot-f",
    repo_url: "https://github.com/Aryan12Yadav/Multi-Agent-Healthcare-Copilot-f",
  },
  {
    id: 3,
    title: "MLOps Training Pipeline",
    description: "A production-grade machine learning pipeline predicting vehicle insurance purchases, containerized with Docker and auto-deployed to AWS EC2 via GitHub Actions.",
    tech_stack: "Python, FastAPI, MongoDB Atlas, AWS S3, Docker, GitHub Actions, self-hosted runner, EC2",
    implementation_details: "Engineered modular pipeline stages: data ingestion from MongoDB Atlas, validation against YAML schema, transformation (SMOTEENN handling class imbalance, ColumnTransformer), Random Forest classifier training, model evaluation comparing to S3 registry, and deployment of accepted model to AWS S3. Served inference via FastAPI.",
    challenges_solved: "Built automated CI/CD workflows executing a build-test runner block on an AWS EC2 t2.medium self-hosted runner. Managed automated container cleanup and hot-swapping exposed ports for zero-downtime rolling model updates.",
    key_learnings: "Learned end-to-end MLOps pipeline stages, drift validation, container orchestration with Docker, IAM policy configuration, and GitOps self-hosted CI/CD automation.",
    demo_url: "https://github.com/Aryan12Yadav/full_stack_mlops_project2026",
    repo_url: "https://github.com/Aryan12Yadav/full_stack_mlops_project2026",
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
      return `I have built and deployed multiple production-grade projects using Django, React, FastAPI, and MLOps pipelines:\n\n${projTitles}\n\nYou can click on "View Engineering Details" in the projects section to see the full technical architecture and challenges solved for each project.`;
    }
    return "I have engineered multiple full-stack React-Django and machine learning pipeline architectures. Please visit the Projects section to explore detailed summaries and repositories.";
  }

  if (query.includes('resume') || query.includes('cv') || query.includes('📄')) {
    return "Aryan has two professionally structured resumes available:\n1. **Full Stack Python Developer Resume** (focusing on backend services, APIs, and databases)\n2. **AI Engineer Resume** (focusing on MLOps, deep learning, and cloud infrastructure)\n\nYou can view and download them in the 'Resumes & Certifications' credentials section.";
  }

  if (query.includes('location') || query.includes('relo') || query.includes('📍') || query.includes('kaha')) {
    return "Aryan is based in India and is fully open to relocating for high-growth technical roles.";
  }

  if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('📞') || query.includes('whatsapp')) {
    return "You can contact Aryan directly via email at **aryanyadav892408@gmail.com** or send a message on WhatsApp at **+91 6387050719**. You can also schedule an interview slot using the form in the Contact section.";
  }

  if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
    return "Hello! I am here to help you learn about Aryan's technical credentials, project details, or relocation preferences. How can I assist you today?";
  }

  return "That's an interesting query! I'm still training to answer that precisely. In the meantime, feel free to browse the projects section or check out the contact details page!";
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
        message: 'Your interview request has been successfully submitted! Aryan will review and get back to you shortly.'
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
    { sender: 'assistant', text: "Hello Recruiter! I am Aryan's digital AI Assistant. I can explain his engineering projects, highlight his resumes, or share his contact details. Feel free to ask any questions!" }
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
            <li><a href="#admin" onClick={(e) => { e.preventDefault(); handleNavClick('admin', 'admin'); }}>Admin</a></li>
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
          <li>
            <a href="#admin" onClick={(e) => { e.preventDefault(); handleNavClick('admin', 'admin'); }}>
              <Server size={18} /> Admin Panel
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
        <div className="section-header">
          <span className="section-subtitle">Profile</span>
          <h2 className="section-title">About Me & Skills</h2>
        </div>

        <div className="about-grid">
          <div className="profile-img-container">
            <div className="profile-card">
              <img 
                src="https://avatars.githubusercontent.com/u/149989949?s=400&u=8fb0cfa0449770888c4a74e11bfaab4ba666457a&v=4" 
                alt="Aryan Yadav Profile" 
                className="profile-img"
              />
            </div>
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--text)' }}>
              I am a B.Tech Computer Science (AI) student at UIET Kanpur with a passionate focus on full-stack development, machine learning pipeline deployments, and robust database architectures. I specialize in building end-to-end Python microservices, automating production deployments with MLOps best practices, and crafting highly responsive, premium React interfaces.
            </p>
            <p style={{ marginTop: '16px', fontSize: '16px', lineHeight: '1.7', color: 'var(--text)' }}>
              My background includes working as an AI/ML Subject Matter Expert Intern, where I gained practical industry experience with deep learning structures, neural networks, and automated CI/CD container pipelines. I look forward to collaborating on complex system integrations and full-stack solutions.
            </p>
          </div>
        </div>

        {/* Categorized Recruiter-Friendly Skills Dashboard */}
        <div className="skills-dashboard" style={{ marginTop: '48px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-bright)', marginBottom: '24px', textAlign: 'center' }}>
            Technical Expertise
          </h3>
          <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            
            <div className="skills-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', transition: 'var(--transition)' }}>
              <h4 style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '15px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Server size={18} /> Backend Development
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-bright)', marginBottom: '4px' }}>
                    <span>Python & Django / DRF</span>
                    <span>Expert</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}><div style={{ width: '90%', height: '100%', background: 'var(--primary-gradient)', borderRadius: '2px' }}></div></div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-bright)', marginBottom: '4px' }}>
                    <span>FastAPI & Flask</span>
                    <span>Advanced</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}><div style={{ width: '85%', height: '100%', background: 'var(--primary-gradient)', borderRadius: '2px' }}></div></div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-bright)', marginBottom: '4px' }}>
                    <span>PostgreSQL & SQL</span>
                    <span>Advanced</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}><div style={{ width: '80%', height: '100%', background: 'var(--primary-gradient)', borderRadius: '2px' }}></div></div>
                </div>
              </div>
            </div>

            <div className="skills-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', transition: 'var(--transition)' }}>
              <h4 style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '15px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Cpu size={18} /> Artificial Intelligence
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-bright)', marginBottom: '4px' }}>
                    <span>PyTorch & TensorFlow</span>
                    <span>Advanced</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}><div style={{ width: '85%', height: '100%', background: 'var(--primary-gradient)', borderRadius: '2px' }}></div></div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-bright)', marginBottom: '4px' }}>
                    <span>scikit-learn & EDA</span>
                    <span>Advanced</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}><div style={{ width: '85%', height: '100%', background: 'var(--primary-gradient)', borderRadius: '2px' }}></div></div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-bright)', marginBottom: '4px' }}>
                    <span>NLP & Computer Vision</span>
                    <span>Intermediate</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}><div style={{ width: '75%', height: '100%', background: 'var(--primary-gradient)', borderRadius: '2px' }}></div></div>
                </div>
              </div>
            </div>

            <div className="skills-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', transition: 'var(--transition)' }}>
              <h4 style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '15px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={18} /> MLOps & DevOps
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-bright)', marginBottom: '4px' }}>
                    <span>Docker Containers</span>
                    <span>Advanced</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}><div style={{ width: '85%', height: '100%', background: 'var(--primary-gradient)', borderRadius: '2px' }}></div></div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-bright)', marginBottom: '4px' }}>
                    <span>AWS Cloud (EC2/S3)</span>
                    <span>Advanced</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}><div style={{ width: '80%', height: '100%', background: 'var(--primary-gradient)', borderRadius: '2px' }}></div></div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-bright)', marginBottom: '4px' }}>
                    <span>GitHub Actions CI/CD</span>
                    <span>Advanced</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}><div style={{ width: '85%', height: '100%', background: 'var(--primary-gradient)', borderRadius: '2px' }}></div></div>
                </div>
              </div>
            </div>

            <div className="skills-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', transition: 'var(--transition)' }}>
              <h4 style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '15px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Code size={18} /> Frontend & Tools
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-bright)', marginBottom: '4px' }}>
                    <span>React & JavaScript</span>
                    <span>Advanced</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}><div style={{ width: '80%', height: '100%', background: 'var(--primary-gradient)', borderRadius: '2px' }}></div></div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-bright)', marginBottom: '4px' }}>
                    <span>MongoDB Atlas</span>
                    <span>Advanced</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}><div style={{ width: '80%', height: '100%', background: 'var(--primary-gradient)', borderRadius: '2px' }}></div></div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-bright)', marginBottom: '4px' }}>
                    <span>Git & Version Control</span>
                    <span>Expert</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}><div style={{ width: '90%', height: '100%', background: 'var(--primary-gradient)', borderRadius: '2px' }}></div></div>
                </div>
              </div>
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

        {/* Coding Profiles & GitHub Metrics Dashboard */}
        <div className="profiles-dashboard">
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-bright)', marginBottom: '24px', textAlign: 'center' }}>
            Coding Performance & Activity
          </h3>
          <div className="profiles-grid">
            
            {/* GitHub Card */}
            <div className="profile-stat-card">
              <div>
                <div className="profile-stat-header">
                  <div className="profile-stat-icon">
                    <GithubIcon size={24} />
                  </div>
                  <h4 className="profile-stat-title">GitHub Contributions</h4>
                </div>
                <div className="profile-metrics-row">
                  <div className="profile-metric-item">
                    <span className="profile-metric-value">500+</span>
                    <span className="profile-metric-label">Total Commits</span>
                  </div>
                  <div className="profile-stat-divider"></div>
                  <div className="profile-metric-item">
                    <span className="profile-metric-value">15+</span>
                    <span className="profile-metric-label">Repositories</span>
                  </div>
                </div>
                <p className="profile-stat-desc">
                  Active full-stack and MLOps repository builder. Automated workflow deployments, unit testing validations, and scalable API services.
                </p>
              </div>
              <a 
                href="https://github.com/Aryan12Yadav" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '13px', gap: '6px' }}
              >
                View Profile <ExternalLink size={14} />
              </a>
            </div>

            {/* LeetCode Card */}
            <div className="profile-stat-card">
              <div>
                <div className="profile-stat-header">
                  <div className="profile-stat-icon">
                    <Code size={24} />
                  </div>
                  <h4 className="profile-stat-title">LeetCode Performance</h4>
                </div>
                <div className="profile-metrics-row">
                  <div className="profile-metric-item">
                    <span className="profile-metric-value">200+</span>
                    <span className="profile-metric-label">Problems Solved</span>
                  </div>
                  <div className="profile-stat-divider"></div>
                  <div className="profile-metric-item">
                    <span className="profile-metric-value">Medium</span>
                    <span className="profile-metric-label">Core Focus</span>
                  </div>
                </div>
                <p className="profile-stat-desc">
                  Solving core algorithmic problems with optimal time & space complexity, emphasizing Array manipulation, Dynamic Programming, and Graphs.
                </p>
              </div>
              <a 
                href="https://leetcode.com/u/aryanyadav123/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '13px', gap: '6px' }}
              >
                View Profile <ExternalLink size={14} />
              </a>
            </div>

            {/* GeeksforGeeks Card */}
            <div className="profile-stat-card">
              <div>
                <div className="profile-stat-header">
                  <div className="profile-stat-icon">
                    <Award size={24} />
                  </div>
                  <h4 className="profile-stat-title">GeeksforGeeks Practice</h4>
                </div>
                <div className="profile-metrics-row">
                  <div className="profile-metric-item">
                    <span className="profile-metric-value">330+</span>
                    <span className="profile-metric-label">Coding Score</span>
                  </div>
                  <div className="profile-stat-divider"></div>
                  <div className="profile-metric-item">
                    <span className="profile-metric-value">200+</span>
                    <span className="profile-metric-label">Problems Solved</span>
                  </div>
                </div>
                <p className="profile-stat-desc">
                  Practicing data structure algorithms, database query optimization, and reviewing fundamental engineering concepts.
                </p>
              </div>
              <a 
                href="https://www.geeksforgeeks.org/profile/aryanyadagfu2" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '13px', gap: '6px' }}
              >
                View Profile <ExternalLink size={14} />
              </a>
            </div>

          </div>
        </div>
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
            <div className="contact-card">
              <div className="contact-icon-wrapper">
                <MessageCircle size={20} />
              </div>
              <div>
                <h4>WhatsApp</h4>
                <a href="https://wa.me/916387050719" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', textDecoration: 'underline' }}>
                  +91 6387050719
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
      ) : currentView === 'admin' ? (
        <AdminDashboard backToPortfolio={() => { setCurrentView('portfolio'); window.scrollTo(0,0); }} />
      ) : (
        <InterviewCenter backToPortfolio={() => { setCurrentView('portfolio'); window.scrollTo(0,0); }} />
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Aryan Yadav. All rights reserved.</p>
          <ul className="footer-links">
            <li><a href="https://github.com/Aryan12Yadav" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="#admin" onClick={(e) => { e.preventDefault(); handleNavClick('admin', 'admin'); }}>Admin Portal</a></li>
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
