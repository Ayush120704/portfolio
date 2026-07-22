export const personalInfo = {
  name: "Ayush Mishra",
  title: "AI/ML Engineer & Full-Stack Developer",
  email: "aayumishra2024@gmail.com",
  phone: "+91 8960961976",
  location: "Prayagraj, India",
  github: "https://github.com/Ayush120704",
  linkedin: "https://www.linkedin.com/in/ayush-mishra-",
  leetcode: "https://leetcode.com/u/ayushmishra12345/",
  resumeUrl: "/resume/Ayush_Mishra_Resume.pdf",
  bio: `B.Tech CSE student at United Institute of Technology, Prayagraj.
Building intelligent systems with AI, NLP, and modern web technologies.
151-day LeetCode streak. GATE CSE 2026 Qualified.`,
};

export const aboutParagraphs = [
  "I'm a B.Tech CSE student at United Institute of Technology, Prayagraj (2027) with a CGPA of 8.31. I'm passionate about AI/ML, full-stack development, and building intelligent systems that solve real-world problems.",
  "My research focuses on multimodal AI — combining computer vision and NLP to build applications like NeuroWell, a mental health companion that detects facial emotions and cognitive distortions in real-time.",
  "When I'm not coding, you'll find me grinding LeetCode (151-day streak and counting), exploring new tech, or working on open-source projects. I believe in consistency over intensity.",
];

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  role?: string;
  duration?: string;
  color: string;
  image?: string;
  tech: string[];
  liveLink?: string;
  githubLink?: string;
  featured?: boolean;
  featuredDescription?: string;
  comingSoon?: boolean;
  privateRepo?: boolean;
  problem?: string;
  solution?: string;
  architecture?: { step: string; desc: string }[];
  challenges?: string[];
  lessons?: string[];
  timeline?: { phase: string; duration: string }[];
  futureImprovements?: string[];
  achievements?: string[];
}

export const featuredProject: Project = {
  id: "neurowell",
  title: "NeuroWell",
  subtitle: "AI-Powered Mental Health Companion",
  description:
    "Multimodal AI platform combining facial emotion recognition (DeepFace + OpenCV) with NLP-based cognitive distortion detection and RAG-powered long-term memory.",
  role: "AI/ML Engineer & Full-Stack Developer",
  duration: "2024 — Present",
  color: "#4fd1ff",
  tech: [
    "Python",
    "PyTorch",
    "BERT",
    "OpenCV",
    "DeepFace",
    "ChromaDB",
    "MongoDB",
    "React",
    "FastAPI",
  ],
  liveLink: "#",
  githubLink: "https://github.com/Ayush120704/Neurowell-Project",
  featured: true,
  featuredDescription:
    "NeuroWell combines multi-modal AI (text + facial emotion) with long-term memory via RAG and vector databases. It processes emotions in real-time using OpenCV and DeepFace, creating a personalized emotional profile for each user.",
  problem:
    "Mental health support is often inaccessible, expensive, or impersonal. Existing chatbots lack emotional awareness and cannot adapt to users' changing mental states over time.",
  solution:
    "Built a multimodal AI companion that analyzes facial expressions and text simultaneously, detects cognitive distortions using fine-tuned BERT, and maintains long-term context through RAG with ChromaDB for truly personalized support.",
  architecture: [
    { step: "01", desc: "Face capture via webcam → OpenCV preprocessing" },
    { step: "02", desc: "DeepFace emotion classification (7 emotions)" },
    { step: "03", desc: "NLP pipeline detects cognitive distortions" },
    { step: "04", desc: "RAG retrieves user history from ChromaDB" },
    { step: "05", desc: "LLM generates context-aware CBT response" },
    { step: "06", desc: "Longitudinal profile updated in MongoDB" },
  ],
  challenges: [
    "Real-time emotion inference latency optimization",
    "Balancing contradiction detection accuracy with response speed",
    "Handling edge cases in low-light facial capture",
    "Designing a privacy-first architecture for sensitive data",
  ],
  lessons: [
    "Learned to optimize OpenCV pipelines for real-time performance",
    "Deep understanding of RAG and vector database design",
    "Importance of ethical AI in mental health applications",
    "Building for scale with MongoDB aggregation pipelines",
  ],
  timeline: [
    { phase: "Research & Planning", duration: "4 weeks" },
    { phase: "MVP Development", duration: "8 weeks" },
    { phase: "Model Fine-tuning", duration: "6 weeks" },
    { phase: "Integration & Testing", duration: "4 weeks" },
  ],
  futureImprovements: [
    "Mobile app with React Native",
    "Multi-language support",
    "Crisis detection & escalation system",
    "Therapist dashboard integration",
  ],
};

export const projects: Project[] = [
  {
    id: "ai-assistant",
    title: "AI Assistant",
    subtitle: "Conversational AI Platform",
    description:
      "Full-stack MERN conversational assistant with persistent session history, real-time NLP inference, and RESTful API layer.",
    color: "#34d399",
    tech: ["React", "Node.js", "Express", "MongoDB", "NLP"],
    githubLink: "https://github.com/Ayush120704/AI-Assistant",
    role: "Full-Stack Developer",
    duration: "2025",
  },
  {
    id: "legal-lens",
    title: "Legal Lens",
    subtitle: "AI Legal Document Analysis",
    description:
      "Intelligent legal document analysis platform that leverages AI to parse, analyze, and extract key insights from legal texts.",
    color: "#f97316",
    tech: ["JavaScript", "AI/ML", "NLP", "React"],
    githubLink: "https://github.com/Ayush120704/Legal-Lens",
    role: "Developer",
    duration: "2025",
  },
  {
    id: "ai-interview-coach",
    title: "AI Interview Coach",
    subtitle: "Interview Preparation Platform",
    description:
      "AI-powered interview preparation platform that simulates interviews and provides real-time feedback.",
    color: "#e879f9",
    tech: ["JavaScript", "AI/ML", "NLP", "React"],
    githubLink: "https://github.com/Ayush120704/AI_Interview_Coach",
    role: "Developer",
    duration: "2025",
  },
  {
    id: "spotify-clone",
    title: "Spotify Clone",
    subtitle: "Music Streaming UI",
    description:
      "Spotify-inspired music streaming UI clone with responsive layout, custom playlist UI, and music player controls.",
    color: "#1db954",
    tech: ["JavaScript", "HTML5", "CSS3"],
    githubLink: "https://github.com/Ayush120704/Spotify_clone",
    role: "Frontend Developer",
    duration: "2024",
  },
  {
    id: "real-estate",
    title: "Real Estate Platform",
    subtitle: "Property Listings Website",
    description:
      "Full-stack responsive real estate application with property listings, search, and modern UI/UX.",
    color: "#22c55e",
    tech: ["JavaScript", "HTML5", "CSS3", "React"],
    githubLink: "https://github.com/Ayush120704/Real_State_Project",
    role: "Full-Stack Developer",
    duration: "2024",
  },
];

export const timeline = [
  {
    year: "2023",
    title: "Started B.Tech CSE",
    detail:
      "Joined United Institute of Technology, Prayagraj. Began journey in computer science with a focus on AI/ML.",
  },
  {
    year: "2024",
    title: "AI/ML Research Begins",
    detail:
      "Started developing NeuroWell — a multimodal AI mental health companion. Began LeetCode journey.",
  },
  {
    year: "2025",
    title: "Global Innovation Intern",
    detail:
      "Selected as Global Innovation Intern at Collab4Good, Bangkok. Building NGO tech solutions on MERN stack.",
  },
  {
    year: "2026",
    title: "GATE Qualified & AIT Bangkok",
    detail:
      "Qualified GATE CSE 2026. Selected for AIT Bangkok internship (1 of ~6,000 applicants) with 90% merit scholarship.",
  },
];

export const achievements = [
  { number: "151+", text: "Day LeetCode streak — consistency over intensity" },
  { number: "8.31", text: "CGPA — maintaining academic excellence while building" },
  { number: "GATE '26", text: "Qualified Graduate Aptitude Test in Engineering CSE" },
  { number: "6,000:1", text: "Selected for AIT Bangkok internship from thousands" },
  { number: "250+", text: "Problems solved on LeetCode across DSA topics" },
  { number: "90%", text: "Merit scholarship for AIT Bangkok program" },
];

export const skills = [
  {
    category: "AI/ML & Deep Learning",
    icon: "🧠",
    items: [
      "PyTorch",
      "Hugging Face",
      "BERT",
      "ALBERT",
      "Fine-Tuning",
      "Transfer Learning",
    ],
  },
  {
    category: "NLP & Computer Vision",
    icon: "👁️",
    items: [
      "NLP Preprocessing",
      "Cognitive Distortion Detection",
      "Facial Emotion Recognition",
      "DeepFace",
      "OpenCV",
    ],
  },
  {
    category: "Generative AI & RAG",
    icon: "⚡",
    items: [
      "RAG Pipelines",
      "ChromaDB",
      "LLM Integration",
      "Vector Databases",
      "Prompt Engineering",
    ],
  },
  {
    category: "Languages & Frameworks",
    icon: "💻",
    items: [
      "Python",
      "Java",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "FastAPI",
    ],
  },
  {
    category: "Data & Databases",
    icon: "📊",
    items: [
      "NumPy",
      "Pandas",
      "MongoDB",
      "MySQL",
      "scikit-learn",
      "TensorFlow",
    ],
  },
  {
    category: "Tools & Platforms",
    icon: "🛠️",
    items: [
      "Git",
      "Docker",
      "Linux",
      "Postman",
      "VS Code",
      "Vercel",
      "Netlify",
    ],
  },
];

export const experience = [
  {
    title: "Global Innovation Intern",
    company: "Collab4Good",
    location: "Bangkok, Thailand",
    period: "2025 — Present",
    description:
      "Building NGO tech solutions on the MERN stack. Developing full-stack web applications for social impact organizations.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    title: "AI/ML Researcher",
    company: "Independent Research",
    location: "India",
    period: "2024 — Present",
    description:
      "Developing NeuroWell — a multimodal mental health companion using facial emotion recognition, NLP-based cognitive distortion detection, and RAG pipelines with ChromaDB.",
    tech: ["Python", "PyTorch", "BERT", "OpenCV", "ChromaDB", "MongoDB"],
  },
  {
    title: "B.Tech CSE Student",
    company: "United Institute of Technology",
    location: "Prayagraj, India",
    period: "2023 — 2027",
    description:
      "CGPA: 8.31. GATE CSE 2026 Qualified. Active in coding competitions with a 151-day LeetCode streak.",
    tech: ["DSA", "Java", "Python", "Web Development"],
  },
];

export const profileLinks = [
  {
    name: "LeetCode",
    label: "LeetCode Profile",
    url: "https://leetcode.com/u/ayushmishra12345/",
    icon: "⚡",
  },
  {
    name: "GitHub",
    label: "GitHub Profile",
    url: "https://github.com/Ayush120704",
    icon: "📦",
  },
];

export const navItems = [
  { name: "Home", section: "home", shortcut: "H" },
  { name: "About", section: "about", shortcut: "A" },
  { name: "Skills", section: "skills", shortcut: "S" },
  { name: "Projects", section: "projects", shortcut: "P" },
  { name: "Timeline", section: "timeline", shortcut: "T" },
  { name: "Contact", section: "contact", shortcut: "C" },
  { name: "Resume", action: "resume", shortcut: "R" },
  { name: "GitHub", action: "github", shortcut: "G" },
  { name: "LeetCode", action: "leetcode", shortcut: "L" },
];

export const terminalCommands: Record<string, string> = {
  help: "Available commands: help, projects, skills, about, resume, contact, github, leetcode, clear",
  projects: `Projects:
  1. NeuroWell - AI Mental Health Companion (featured)
  2. Khazaana - Personal Expense Tracker
  3. AI Assistant - Conversational AI Platform
  4. Legal Lens - AI Legal Document Analysis
  5. AI Interview Coach - Interview Prep Platform
  6. Spotify Clone - Music Streaming UI
  7. Real Estate Platform - Property Listings`,
  skills: "Skills: PyTorch, React, NLP, Computer Vision, Python, Java, FastAPI, MongoDB, Docker, OpenCV, BERT, DeepFace",
  about: "Ayush Mishra - B.Tech CSE student, AI/ML Engineer, Full-Stack Developer. Building intelligent web applications with a focus on multimodal AI.",
  resume: "Downloading Ayush's resume PDF... It's a LaTeX-typeset, ATS-optimized single pager highlighting AI/ML, full-stack, and multimodal AI experience.",
  contact: `Email: aayumishra2024@gmail.com\nPhone: +91 8960961976\nLinkedIn: linkedin.com/in/ayush-mishra-\nGitHub: github.com/Ayush120704`,
  github: "GitHub: github.com/Ayush120704",
  leetcode: "LeetCode: 250+ problems solved, 151-day streak.\nProfile: leetcode.com/u/ayushmishra12345/",
  clear: "__CLEAR__",
};

export const aiKnowledge: Record<string, string> = {
  neurowell: `NeuroWell is Ayush's flagship project — an AI-powered mental health companion. It uses OpenCV and DeepFace for facial emotion recognition, RAG with ChromaDB for long-term memory, and a React/FastAPI stack. It detects cognitive distortions using fine-tuned BERT models.`,
  projects: `Ayush has built 7 major projects: NeuroWell (AI mental health), Khazaana (expense tracker), AI Assistant (conversational AI), Legal Lens (legal document analysis), AI Interview Coach, Spotify Clone, and Real Estate Platform. Most use the MERN stack with AI integrations.`,
  skills: `Ayush's core expertise: AI/ML (PyTorch, BERT, OpenCV, DeepFace), NLP (cognitive distortion detection, RAG), Full-Stack (React, Next.js, Node.js, FastAPI), Databases (MongoDB, ChromaDB), and Tools (Docker, Git, Linux).`,
  resume: `Ayush's resume is a LaTeX-typeset, ATS-optimized single page covering his AI/ML experience, projects (NeuroWell, Legal Lens, AI Interview Coach), education (B.Tech CSE, 8.31 CGPA), GATE CSE 2026 qualification, and AIT Bangkok selection. You can download it from the navbar (Resume button), Hero section, Contact section, or Ctrl+K → Resume.`,
  contact: `You can reach Ayush via email at aayumishra2024@gmail.com, phone at +91 8960961976, LinkedIn, or through the contact form on this page.`,
  experience: `Ayush is a B.Tech CSE student (2023-2027) at United Institute of Technology, Prayagraj with 8.31 CGPA. He's a Global Innovation Intern at Collab4Good Bangkok, an AI/ML researcher building NeuroWell, and GATE CSE 2026 qualified.`,
  leetcode: `Ayush has solved 250+ problems on LeetCode with a 151-day active streak. He focuses on data structures and algorithms consistently.`,
  gate: `Ayush qualified GATE CSE 2026 — the Graduate Aptitude Test in Engineering. This is a competitive exam for postgraduate admissions and PSU recruitment in India.`,
  about: `Ayush Mishra is a B.Tech CSE student, AI/ML Engineer, and Full-Stack Developer. He's passionate about multimodal AI, building intelligent systems, and maintaining a 151-day LeetCode streak.`,
  ait: `Ayush was selected for the AIT Bangkok internship (1 of ~6,000 applicants) with a 90% merit scholarship. He also works as a Global Innovation Intern at Collab4Good.`,
  default: `I can tell you about Ayush's projects, skills, experience, LeetCode, GATE qualification, AIT Bangkok internship, or how to contact him. Try asking about NeuroWell, his tech stack, or his LeetCode streak!`,
};
