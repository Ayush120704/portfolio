export const personalInfo = {
  name: "Ayush Mishra",
  title: "AI/ML Engineer",
  subtitle: "Full-Stack Developer & Creative Technologist",
  email: "aayumishra2024@gmail.com",
  phone: "8960961976",
  github: "https://github.com/Ayush120704",
  leetcode: "https://leetcode.com/u/ayushmishra12345/",
  linkedin: "",
  twitter: "",
  bio: [
    "B.Tech CSE @ United Institute of Technology, Prayagraj (2027) — 8.31 CGPA",
    "Researching multimodal AI & NLP through NeuroWell, a mental-health companion combining facial emotion recognition + cognitive distortion detection",
    "Global Innovation Intern @ Collab4Good, Bangkok — building NGO tech on the MERN stack",
    "GATE CSE 2026 Qualified · Selected for AIT Bangkok internship (1 of ~6,000 applicants), 90% merit scholarship",
    "151-day LeetCode streak — consistency over intensity",
  ],
};

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  category: "ai/ml" | "fullstack" | "web";
  featured: boolean;
  color: string;
}

export const projects: Project[] = [
  {
    id: "simon-says",
    title: "Simon Says Game",
    description:
      "Classic Simon memory game built with JavaScript — test and improve your recall skills.",
    longDescription:
      "Interactive Simon Says memory game featuring pattern generation, progressively harder sequences, sound effects, and score tracking. Built with vanilla JavaScript, HTML5, and CSS3.",
    technologies: ["JavaScript", "HTML5", "CSS3"],
    githubUrl: "https://github.com/Ayush120704/Simon_Says_Game",
    category: "web",
    featured: true,
    color: "#ff6b6b",
  },
  {
    id: "spotify-clone",
    title: "Spotify Clone",
    description:
      "Spotify-inspired music streaming UI clone built with HTML, CSS, and JavaScript.",
    longDescription:
      "Front-end clone of the Spotify web player interface featuring a responsive layout, custom playlist UI, music player controls, and album art display. Built with HTML5, CSS3, and JavaScript.",
    technologies: ["JavaScript", "HTML5", "CSS3", "Responsive Design"],
    githubUrl: "https://github.com/Ayush120704/Spotify_clone",
    category: "web",
    featured: true,
    color: "#1DB954",
  },
  {
    id: "neurowell",
    title: "NeuroWell",
    description:
      "AI-powered mental health companion combining facial emotion recognition with NLP-based cognitive distortion detection.",
    longDescription:
      "Multimodal digital wellness platform featuring real-time facial emotion recognition (DeepFace + FACS Action Units via OpenCV), NLP-based cognitive distortion detection (BERT/ALBERT) for contradiction-aware CBT interventions, RAG pipeline with ChromaDB for grounded responses, and persistent longitudinal user profiling via MongoDB.",
    technologies: [
      "Python",
      "PyTorch",
      "BERT",
      "DeepFace",
      "OpenCV",
      "ChromaDB",
      "MongoDB",
      "React",
      "FastAPI",
    ],
    githubUrl: "https://github.com/Ayush120704/Neurowell-Project",
    category: "ai/ml",
    featured: true,
    color: "#6c63ff",
  },
  {
    id: "ai-assistant",
    title: "AI Assistant",
    description:
      "Full-stack MERN conversational assistant with persistent session history and real-time NLP inference.",
    longDescription:
      "Full-stack MERN conversational assistant with persistent session history, real-time NLP inference pipeline, React.js frontend, and a RESTful Express.js API layer.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "NLP",
      "JavaScript",
    ],
    githubUrl: "https://github.com/Ayush120704/AI-Assistant",
    category: "ai/ml",
    featured: true,
    color: "#4ecdc4",
  },
  {
    id: "legal-lens",
    title: "Legal Lens",
    description:
      "Intelligent legal document analysis tool powered by AI.",
    longDescription:
      "Legal document analysis platform that leverages AI to parse, analyze, and extract key insights from legal texts, making legal information more accessible.",
    technologies: ["JavaScript", "AI/ML", "NLP"],
    githubUrl: "https://github.com/Ayush120704/Legal-Lens",
    category: "ai/ml",
    featured: true,
    color: "#f97316",
  },
  {
    id: "ai-interview-coach",
    title: "AI Interview Coach",
    description:
      "AI-powered interview preparation platform with real-time feedback.",
    longDescription:
      "Intelligent interview coaching platform that uses AI to simulate interview scenarios, provide real-time feedback, and help users improve their interview skills.",
    technologies: ["JavaScript", "AI/ML", "NLP", "React"],
    githubUrl: "https://github.com/Ayush120704/AI_Interview_Coach",
    category: "ai/ml",
    featured: true,
    color: "#e879f9",
  },
  {
    id: "real-estate",
    title: "Real Estate Project",
    description:
      "Responsive real-world real estate web application.",
    longDescription:
      "Full-stack responsive real estate application featuring property listings, search functionality, and modern UI/UX design patterns.",
    technologies: ["JavaScript", "HTML5", "CSS3", "React"],
    githubUrl: "https://github.com/Ayush120704/Real_State_Project",
    category: "fullstack",
    featured: false,
    color: "#22c55e",
  },
  {
    id: "django-python",
    title: "Django with Python",
    description:
      "Full-stack web application built with Django and Python.",
    longDescription:
      "Comprehensive Django-based web application showcasing backend development skills with Python, including database design, REST APIs, and template rendering.",
    technologies: ["Python", "Django", "HTML5", "CSS3"],
    githubUrl: "https://github.com/Ayush120704/Djangowithpython",
    category: "fullstack",
    featured: false,
    color: "#3b82f6",
  },
  {
    id: "meta-hackathon",
    title: "Meta Hackathon",
    description:
      "Hackathon project built for the Meta hackathon event.",
    longDescription:
      "Innovative project developed during the Meta hackathon, demonstrating rapid prototyping and creative problem-solving skills.",
    technologies: ["JavaScript", "React"],
    githubUrl: "https://github.com/Ayush120704/Meta_Hackathon",
    category: "web",
    featured: false,
    color: "#f59e0b",
  },
];

export const skills = {
  "AI/ML & Deep Learning": [
    "PyTorch",
    "Hugging Face Transformers",
    "BERT",
    "ALBERT",
    "Model Fine-Tuning",
    "Transfer Learning",
    "Vector Embeddings",
  ],
  "NLP & Computer Vision": [
    "NLP Preprocessing",
    "Cognitive Distortion Detection",
    "Facial Emotion Recognition",
    "DeepFace",
    "OpenCV",
  ],
  "Generative AI": [
    "RAG Pipelines",
    "ChromaDB",
    "LLM Integration",
    "Vector Databases",
  ],
  "Languages & Frameworks": [
    "Python",
    "Java",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Django",
    "FastAPI",
  ],
  "Data & Databases": [
    "NumPy",
    "Pandas",
    "MongoDB",
    "MySQL",
    "SQLite",
    "scikit-learn",
    "TensorFlow",
    "Keras",
  ],
  "Tools & Platforms": [
    "Git",
    "GitHub",
    "Vercel",
    "Netlify",
    "Postman",
    "VS Code",
    "Linux",
    "Docker",
  ],
};

export const experience = [
  {
    title: "Global Innovation Intern",
    company: "Collab4Good",
    location: "Bangkok, Thailand (In-Campus)",
    period: "2025 — Present",
    description:
      "Building NGO tech solutions on the MERN stack. Developing full-stack web applications for social impact organizations.",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    title: "AI/ML Researcher",
    company: "Personal Research",
    location: "India",
    period: "2024 — Present",
    description:
      "Developing NeuroWell — a multimodal mental health companion using facial emotion recognition, NLP-based cognitive distortion detection, and RAG pipelines.",
    technologies: [
      "Python",
      "PyTorch",
      "BERT",
      "OpenCV",
      "ChromaDB",
      "MongoDB",
    ],
  },
  {
    title: "B.Tech CSE Student",
    company: "United Institute of Technology",
    location: "Prayagraj, India",
    period: "2023 — 2027",
    description:
      "CGPA: 8.31. GATE CSE 2026 Qualified. Active in coding competitions with a 151-day LeetCode streak.",
    technologies: ["DSA", "Java", "Python", "Web Development"],
  },
];

export const stats = [
  { label: "CGPA", value: 8.31, suffix: "" },
  { label: "LeetCode Streak", value: 151, suffix: " days" },
  { label: "Projects", value: projects.length, suffix: "+" },
  { label: "GitHub Repos", value: 9, suffix: "+" },
];

export interface TechCategory {
  category: string;
  items: string[];
  color: string;
}

export const techCategories: TechCategory[] = [
  {
    category: "AI/ML & Deep Learning",
    items: ["PyTorch", "Hugging Face Transformers", "BERT", "ALBERT", "Model Fine-Tuning", "Transfer Learning", "Vector Embeddings"],
    color: "#6c63ff",
  },
  {
    category: "NLP & Computer Vision",
    items: ["NLP Preprocessing", "Cognitive Distortion Detection", "Facial Emotion Recognition", "DeepFace", "OpenCV"],
    color: "#4ecdc4",
  },
  {
    category: "Generative AI",
    items: ["RAG Pipelines", "ChromaDB", "LLM Integration", "Vector Databases"],
    color: "#e879f9",
  },
  {
    category: "Languages & Frameworks",
    items: ["Python", "Java", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Django", "FastAPI"],
    color: "#f97316",
  },
  {
    category: "Data & Databases",
    items: ["NumPy", "Pandas", "MongoDB", "MySQL", "SQLite", "scikit-learn", "TensorFlow", "Keras"],
    color: "#22c55e",
  },
  {
    category: "Tools & Platforms",
    items: ["Git", "GitHub", "Vercel", "Netlify", "Postman", "VS Code", "Linux", "Docker"],
    color: "#3b82f6",
  },
];

export const marqueeItems = [
  "PyTorch",
  "TensorFlow",
  "React",
  "Next.js",
  "Python",
  "NLP",
  "Computer Vision",
  "FastAPI",
  "Node.js",
  "MongoDB",
  "BERT",
  "Docker",
  "TypeScript",
  "Java",
  "Machine Learning",
];
