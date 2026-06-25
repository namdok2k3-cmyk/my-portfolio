import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Mail, Code, Gamepad2, Star, ChevronRight, Terminal, Cpu, Linkedin, X, Sparkles, Loader2, Copy, Check, Minus, Maximize2, Minimize2, BadgeCheck, MessageCircle, Heart, Zap, User, Briefcase, Lightbulb, Send } from 'lucide-react';

// --- TYPE DEFINITIONS ---
type ChatMessage = {
  role: 'user' | 'ai';
  text: string;
  isContact?: boolean;
};

// --- GEMINI API CALLER ---
const callGemini = async (prompt: string, systemContext: string) => {
  const p = prompt.toLowerCase();

  // 1. INSTANT PRE-MADE INSIGHTS (No API Cost)
  if (p.includes("insight")) {
if (p.includes("rbc") || p.includes("equity") || p.includes("pitch") || p.includes("financial dashboard")) return     
 if (p.includes("mom")) return "The Challenge: Translating unstructured, handwritten family recipes into a queryable digital format.\n\nEngineering: I architected a custom data parser to normalize inconsistent measurements into a strict JSON schema. This allowed for advanced filtering and search capabilities that raw text couldn't support.\n\nOutcome: A scalable, type-safe culinary database that preserves heritage with engineering precision.";
      if (p.includes("sentinel")) return "The Challenge: Users struggle to identify 'deepfakes' because AI artifacts are often subtle and technical.\n\nEngineering: I implemented a 'Confidence Heatmap' visualization. Instead of a binary Real/Fake output, the app highlights specific pixel clusters characteristic of GAN generation (e.g., warping backgrounds).\n\nOutcome: Empowers users with visual literacy rather than just providing a black-box verdict.";
      if (p.includes("asmr")) return "The Challenge: Simulating hundreds of independent physics bodies caused significant frame drops on mobile browsers.\n\nEngineering: I implemented an Object Pooling pattern. Instead of destroying and instantiating DOM nodes (expensive), I recycle existing elements when they leave the viewport.\n\nOutcome: Achieved a stable 60 FPS on low-end devices, ensuring the relaxation experience remains uninterrupted.";
      if (p.includes("clash")) return "The Challenge: Creating a responsive enemy AI in the browser without blocking the main thread.\n\nEngineering: I built a Utility-Based AI system. Enemy units calculate a dynamic 'threat score' for player entities every 10 frames to prioritize targets intelligently rather than following a static path.\n\nOutcome: A dynamic, non-deterministic opponent that forces players to adapt strategies in real-time.";
      if (p.includes("champong") || p.includes("simulation")) return "The Challenge: Fast-moving objects (the ball) were 'tunneling' through paddles due to discrete time steps in the physics loop.\n\nEngineering: I implemented Continuous Collision Detection (CCD) using raycasting between frames to predict and resolve collisions before they visually occur.\n\nOutcome: Frame-perfect physics accuracy, critical for a competitive arcade game.";
      if (p.includes("retro")) return "The Challenge: Modernizing a 40-year-old game loop without losing the classic feel.\n\nEngineering: Focused on 'Game Juice'—feedback systems. I engineered a custom particle emitter that handles the lifecycle and garbage collection of debris particles upon impact.\n\nOutcome: A highly responsive, visually satisfying loop that feels modern while retaining arcade tightness.";
      if (p.includes("minesweeper")) return "The Challenge: The recursive 'flood fill' algorithm (clearing empty zones) caused stack overflows on massive grids.\n\nEngineering: I refactored the recursion into an iterative breadth-first search (BFS) using a queue data structure.\n\nOutcome: Allows for virtually infinite grid sizes with zero performance penalty or crash risk.";
      if (p.includes("cosmic")) return "The Challenge: Synchronizing user local time with high-precision astronomical calculations in real-time.\n\nEngineering: I utilized high-precision floating-point libraries to map local timestamps to celestial coordinates, ensuring the numerology engine remains accurate down to the millisecond.\n\nOutcome: An instant, personalized data visualization experience.";
      if (p.includes("chill")) return "The Challenge: Animations running at different speeds on high-refresh-rate monitors (144Hz vs 60Hz).\n\nEngineering: I decoupled the simulation logic from the render loop using delta-time calculations within `requestAnimationFrame`.\n\nOutcome: Consistent visual speed and physics behavior across all hardware configurations.";
      if (p.includes("pixel")) return "The Challenge: Input lag and hitbox synchronization in a browser-based fighting game.\n\nEngineering: I designed a deterministic state machine for character actions. Hitboxes are active only during specific animation frames, strictly coupled to the state logic.\n\nOutcome: A 'tight' combat feel where inputs result in immediate, predictable actions.";
      return "The Challenge: Building a scalable, maintainable frontend architecture.\n\nEngineering: I strictly separated the business logic from the UI components using custom hooks, ensuring the codebase is modular and testable.\n\nOutcome: A robust application foundation ready for feature expansion.";
  }

  // 2. INSTANT PRE-MADE GENERAL QUESTIONS (No API Cost)
  if (p === "overview") return "My name is Nam, I'm a Computer Science graduate from UNB, passionate about solving real-world problems using new technology—whether it's building cool video games or creating meaningful solutions for the community!";
  if (p === "tech") return "I'm proficient in Python, JavaScript, and React for building interactive apps. I'm also a master of Excel, Word, and the Microsoft Suite. My strength lies in collaboration and teamwork—together we can build anything!";
  if (p === "experience") return "I interned at the Fredericton Fire Department designing emergency maps (Data/Research) to help people when it counts the most. I also worked as a Prompt Engineer (AI Trainer) at Outlier.ai, gaining hands-on experience with LLMs and AI. Besides that, I was a Teaching Assistant for Algorithm Design at UNB and honed my leadership skills as a Gym Supervisor at UNB Reds Recreation.";
  if (p === "collab") return "Yes, I would love to! I thrive in team environments. Shoot me a message on LinkedIn or Email me directly!";
  if (p === "hire") return "Because I don't just write code; I build relationships. Whether it's analyzing data to save lives or debugging a game level late at night, I bring a 'never give up' attitude and a smile to the team. I care about the people I work with as much as the product we build. Let's win together!";
  if (p === "hobbies") return "Fun fact: I'm a total creativity engine! I love coming up with random new ideas—whether it's coding a new prototype, cooking up a storm in the kitchen, optimizing my workout routine, or inventing new soccer moves. I just love creating cool stuff and seeing what happens!";
  if (p === "future") return `Here are 7 ambitious ideas I'd love to build to help the world:\n\n1. Eco-Waste Link. A real-time app connecting local restaurants with surplus food to nearby shelters and food banks to fight hunger.\n2. Guardian Eye. A privacy-first computer vision system for home cameras that detects falls in the elderly and alerts family instantly.\n3. Crisis Mesh. An offline-first messaging app using Bluetooth mesh networks for communities to communicate during disaster power outages.\n4. Skill Bridge. A platform connecting retired professionals with underprivileged youth for mentorship and skill trading.\n5. Neuro-Focus. A gamified, adaptive task manager designed specifically for ADHD brains to turn daily chores into dopamine hits.\n6. Agri-Smart. An affordable IoT dashboard for small-scale farmers to monitor soil moisture and water usage, saving resources.\n7. Access City. A crowdsourced map highlighting wheelchair-accessible routes and venues in my city, updated by the community.`;

  // 3. CUSTOM TYPED QUESTIONS (Hits Secure Backend)
  try {
    const response = await fetch('/api/chat', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ textToSubmit: prompt, systemInstruction: systemContext }),
    });

    if (!response.ok) {
      const errData = await response.json();
      if (errData.error === 'API key is missing') {
        return "Hi! I am Nam's AI Assistant. My live API connection is currently paused, but I'd love to chat. Please email Nam directly or connect on LinkedIn!";
      }
      throw new Error('Server error');
    }

    const data = await response.json();
    return data.text || "I couldn't think of a response right now.";
  } catch (e) {
    console.error(e);
    return "My brain is taking a quick nap. Please email Nam directly instead!";
  }
};

const App = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  
  // --- AI CHAT STATE ---
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [isChatMaximized, setIsChatMaximized] = useState(false);
  const [chatInput, setChatInput] = useState('');
  
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: 'ai', text: "Hi! I'm Nam's Digital Assistant. Click a topic or type a question! 👇" }
  ]);
  
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(true); 
  const chatEndRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- INSIGHT MODAL STATE ---
  const [insightModal, setInsightModal] = useState<{isOpen: boolean, title: string, content: string} | null>(null);
  const [isInsightLoading, setIsInsightLoading] = useState(false);

  // --- IMAGES STRATEGY ---
  const getMicrolink = (url: string) => `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;

  // --- PROJECT DATA ---
  const projects = [
    {
      id: 11,
title: "RBC Equity Research & Financial Dashboard",      category: "Web App",
      description: "Built for the UNB & RBC Pitch Competition. A high-fidelity financial dashboard transforming Shopify data into institutional-grade insights, complete with a live market engine and AI defense assistant.",
      tech: ["Next.js", "Tailwind", "Gemini AI", "Financial Modeling"],
      repo: "https://github.com/namdok2k3-cmyk/shopify-pitch-dashboard",
      demo: "https://shopify-pitch-dashboard.vercel.app", 
      image: getMicrolink("https://shopify-pitch-dashboard.vercel.app"), 
      featured: true
    },
    {
      id: 1,
      title: "Mom's Kitchen",
      category: "Web App",
      description: "Dedicated to my mom. A digital archive for our family's culinary history, ensuring her recipes and love are preserved forever through precise data structuring.",
      tech: ["React", "Data Analysis", "Adv. Algorithms", "UI/UX"],
      repo: "https://github.com/namdok2k3-cmyk/Moms-Kitchen",
      demo: "https://moms-kitchen-three.vercel.app",
      image: getMicrolink("https://moms-kitchen-three.vercel.app"), 
      featured: true
    },
    {
      id: 2,
      title: "AI Sentinel: Educator",
      category: "Web App",
      description: "Born from concern for the vulnerable. I built this to protect kids and the elderly from AI scams, helping them distinguish real human connections from synthetic manipulation.",
      tech: ["React", "AI Integration", "EdTech", "Tailwind"],
      repo: "https://github.com/namdok2k3-cmyk/Ai-Sentinel",
      demo: "https://ai-sentinel-vert.vercel.app",
      image: getMicrolink("https://ai-sentinel-vert.vercel.app"), 
      featured: true
    },
    {
      id: 4,
      title: "Clash Battle: Dark Fantasy",
      category: "Game",
      description: "Real-time strategy pushing browser limits. Combines intelligent unit AI with resource management for immersive battles.",
      tech: ["React", "TypeScript", "Canvas API", "Game Loop"],
      repo: "https://github.com/namdok2k3-cmyk/Clash-Battle-Game-Project", 
      demo: "https://clash-battle-game-project.vercel.app", 
      image: getMicrolink("https://clash-battle-game-project.vercel.app"), 
      featured: true
    },
    {
      id: 3,
      title: "ASMR Drop Miner",
      category: "Web App",
      description: "Sometimes the world is too loud. I designed this physics simulation purely for satisfaction and stress relief, creating a digital space to unwind.",
      tech: ["React", "Physics Engine", "Sound Design", "Interactive UI"],
      repo: "https://github.com/namdok2k3-cmyk/ASMR-Drop-Miner",
      demo: "https://asmr-drop-miner.vercel.app",
      image: getMicrolink("https://asmr-drop-miner.vercel.app"), 
      featured: true
    },
    {
      id: 8,
      title: "Cosmic Calculator",
      category: "Web App",
      description: "We've all looked to the stars for answers. This app blends math with astrology, visualizing the curiosity we all feel about our future.",
      tech: ["React", "Math Logic", "CSS Effects", "Futuristic UI"],
      repo: "https://github.com/namdok2k3-cmyk/Cosmic-Calculator",
      demo: "https://cosmic-calculator-sand.vercel.app",
      image: getMicrolink("https://cosmic-calculator-sand.vercel.app"), 
      featured: true
    },
    {
      id: 6,
      title: "Chill Background & Timer",
      category: "Web App",
      description: "A generative art piece designed to bring calm and focus to your workspace. Algorithmic beauty in motion.",
      tech: ["React", "Generative Art", "Real-time Logic", "CSS Animations"],
      repo: "https://github.com/namdok2k3-cmyk/Chill-Background",
      demo: "https://chill-background.vercel.app",
      image: getMicrolink("https://chill-background.vercel.app"), 
      featured: false
    },
    {
      id: 7,
      title: "UEFA Champong League",
      category: "Game",
      description: "Arcade soccer meets Pong. Captures sports energy with responsive physics and competitive AI for stadium excitement.",
      tech: ["React", "Game Physics", "Canvas", "AI Logic"],
      repo: "https://github.com/namdok2k3-cmyk/UEAFA-Champong-league",
      demo: "https://ueafa-champong-league.vercel.app",
      image: getMicrolink("https://ueafa-champong-league.vercel.app"), 
      featured: true
    },
    {
      id: 5,
      title: "Minesweeper Tactical",
      category: "Game",
      description: "A modern tactical overhaul of the classic logic puzzle. Designed for those who love deep, algorithmic thinking.",
      tech: ["React", "Game Logic", "Algorithms", "State Management"],
      repo: "https://github.com/namdok2k3-cmyk/minesweeper-tactical",
      demo: "https://minesweeper-tactical.vercel.app",
      image: getMicrolink("https://minesweeper-tactical.vercel.app"), 
      featured: false
    },
    {
      id: 9,
      title: "Retro Breaker",
      category: "Game",
      description: "Polished arcade nostalgia. Enhanced physics and particle effects turn a simple concept into an addictive loop.",
      tech: ["React", "Canvas", "Physics", "Particle Effects"],
      repo: "https://github.com/namdok2k3-cmyk/retro-breaker",
      demo: "https://retro-breaker.vercel.app",
      image: getMicrolink("https://retro-breaker.vercel.app"), 
      featured: false
    },
    {
      id: 10,
      title: "Pixel Fighting",
      category: "Game",
      description: "Raw 8-bit combat. Demonstrates complex state management and sprite animation for a responsive fighting experience.",
      tech: ["React", "Sprite Animation", "State Machines", "Game Logic"],
      repo: "https://github.com/namdok2k3-cmyk/Pixel-Fighting-Game",
      demo: "https://pixel-fighting-game.vercel.app",
      image: getMicrolink("https://pixel-fighting-game.vercel.app"), 
      featured: false
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  // --- HELPER: Copy Email ---
  const copyEmail = async () => {
      const email = "namdok2k3@gmail.com";
      try {
        await navigator.clipboard.writeText(email);
        setCopiedEmail(true);
      } catch (err) {
        try {
            const textArea = document.createElement("textarea");
            textArea.value = email;
            textArea.style.position = "fixed";
            textArea.style.left = "-9999px";
            textArea.style.top = "0";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            if (successful) setCopiedEmail(true);
        } catch (fallbackErr) {
            console.error("Failed to copy email:", fallbackErr);
        }
      }
      setTimeout(() => setCopiedEmail(false), 2000);
  };

  // --- ORIGINAL BUTTON LOGIC ---
  const handleQuestionClick = async (questionId: string, label: string) => {
    if (isChatLoading) return;
    setChatHistory(prev => [...prev, { role: 'user', text: label }]);
    setIsChatLoading(true);
    setShowOptions(false); 

    let prompt = "";
    switch (questionId) {
        case 'overview': prompt = "overview"; break;
        case 'tech': prompt = "tech"; break;
        case 'experience': prompt = "experience"; break;
        case 'collab': prompt = "collab"; break;
        case 'hire': prompt = "hire"; break;
        case 'hobbies': prompt = "hobbies"; break;
        case 'future': prompt = "future"; break;
        default: prompt = "overview";
    }

    // Call Gemini (which will instantly return the pre-made answer)
    const response = await callGemini(prompt, "");
    
    // Add fake delay to look natural
    setTimeout(() => {
        setChatHistory(prev => {
            const newMessages: ChatMessage[] = [...prev, { role: 'ai', text: response }];
            if (questionId === 'collab') {
                 newMessages.push({ role: 'ai', text: "Connect:", isContact: true });
            }
            return newMessages;
        });
        setIsChatLoading(false);
    }, 600);
  };

  // --- NEW CUSTOM TYPING LOGIC ---
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;
    
    const textToSubmit = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: textToSubmit }]);
    setIsChatLoading(true);
    setShowOptions(false);

   const systemContext = `
  You are an enthusiastic AI assistant for Nhat Nam Do, a CS graduate targeting Project Management and Finance roles.
  TONE: Professional, warm, inspiring. Max 3 sentences. Make the reader feel like they're talking about someone exceptional.
  CRITICAL: Always frame Nam as a PROJECT MANAGER, LEADER, and VISIONARY — not a developer.

  VISION & CHARACTER (weave this naturally, don't be obvious):
  - Nam genuinely cares about making the world better — not just as a tagline, but through every project he picks
  - He mapped emergency buildings so firefighters could save lives faster. He built AI tools to protect elderly people from scams. He analyzed soccer data to help a team win a national championship. Every project has a human behind it.
  - He thinks at a systems level — sees the big picture, connects the dots between people, data, and outcomes
  - He's the kind of person who shows up, figures it out, and brings others along with him
  - Strong communicator who bridges technical teams and non-technical stakeholders effortlessly
  - Quietly driven by a mission: use technology to serve people, not the other way around

  PM & BUSINESS FACTS:
  - CS Graduate from UNB (gives him technical credibility to lead and manage technical teams)
  - Research Project Coordinator at City of Fredericton Fire Department — coordinated 50+ building mapping projects across city staff, building owners, and frontline firefighters
  - AI Model Evaluator at Outlier.ai — structured quality control, issue logging, escalation workflows
  - Teaching Assistant at UNB — led 50+ students weekly, broke down complexity into clarity
  - Target role: Project Manager R&D at CAE Inc. (defense simulation, government R&D programs, SR&ED funding)
  - Skills: SQL, Power BI, Advanced Excel, Financial Modeling, DCF, Stakeholder Reporting, Agile/Jira, Python
  - Eligible for Canadian Security Clearance

  PROJECTS (always frame as leadership and business outcomes, not technical builds):
  - RBC Equity Research & Financial Dashboard: Led financial modeling for RBC pitch competition, built 10-year DCF valuation, placed Top 4 of 30 teams presenting to RBC executives
  - AI Sentinel: Delivered risk detection pipeline protecting vulnerable users from AI scams, reduced manual review overhead by 40%
  - Fredericton Fire Dept: Coordinated emergency mapping across 5 stakeholder groups, directly deployed for first responder navigation in life-safety environments
  - Champong League: Managed full project lifecycle of a real-time simulation system, extensive scenario testing and performance validation
  - Mom's Kitchen: Built a stakeholder-friendly database interface preserving family heritage through precise data architecture
  EXTRA CONTEXT TO WEAVE IN NATURALLY:
  - Awards: Thomas E. Hoben Scholarship & Ward Chipman Founder's Scholarship at UNB — not everyone gets those
  - Leadership: Investment Analyst at UNB Finance Club, Operations Coordinator at UNB Cybersecurity Club, Volunteer Researcher at UNB HCI Labs
  - Soccer Analytics: Provided data analytics for UNB Reds varsity soccer — the team won the AUS championship and competed at U SPORTS nationals. Nam's dashboards shaped in-season strategy directly.
  - Financial modeling: Built full 3-statement financial model with DCF, comparable company analysis, and sensitivity tables for RBC pitch
  - CAE relevance: Nam understands R&D funding ecosystems — SR&ED tax credits, NSERC Alliance, MITACS, NRC-IRAP. He knows how government-funded R&D projects are structured, tracked, and reported.
  - Security clearance eligible: Canadian citizen, clean background, eligible for Government of Canada security clearance
  - Relocating to Montreal for CAE opportunity, fully committed

  IF ASKED ABOUT WEAKNESSES OR GAPS:
  - French is developing but he thrives in English-immersion environments and picks up fast
  - Turn it positive: he closes gaps fast and has a track record of figuring things out
  ATHLETICS & LEADERSHIP (big deal, mention with pride):
  - Data & Performance Analyst for UNB Reds Varsity Men's Soccer for 4 years — built SQL workflows and Power BI dashboards that replaced manual tracking and directly shaped in-season coaching strategy
  - The team WON the AUS Championship and placed SECOND at U SPORTS Nationals under his analytics support — that's a national-level result with his fingerprints on it
  - This shows he delivers under pressure in high-stakes, team-driven environments — exactly what CAE R&D needs

  CLUBS & CAMPUS LEADERSHIP (mention naturally when asked about involvement):
  - Investment Analyst | UNB Finance Club — analyzed equities, built financial models, sharpened business acumen
  - Operations Coordinator | UNB Cybersecurity Club — managed club operations, organized events, led initiatives across members
  - Volunteer Researcher | UNB HCI Labs — contributed to human-computer interaction research, data integrity work
  - UNB F1 Club — passionate about engineering, simulation, and performance optimization (connects well to CAE's simulation world)
  - These aren't resume fillers — they show someone who shows up, leads, and contributes beyond what's required

  SCHOLARSHIPS (drop naturally when asked about achievements):
  - Thomas E. Hoben Scholarship — awarded for academic excellence
  - Ward Chipman Founder's Scholarship — prestigious UNB founding award
  - These were earned, not given
`;

    const response = await callGemini(textToSubmit, systemContext);
    
    setChatHistory(prev => {
        const newMessages: ChatMessage[] = [...prev, { role: 'ai', text: response }];
        if (textToSubmit.toLowerCase().includes('collab') || textToSubmit.toLowerCase().includes('hire') || textToSubmit.toLowerCase().includes('contact')) {
             newMessages.push({ role: 'ai', text: "Connect:", isContact: true });
        }
        return newMessages;
    });
    
    setIsChatLoading(false);
  };

  // --- INSIGHT MODAL HANDLER ---
  const handleInsightClick = async (project: any) => {
    setInsightModal({ isOpen: true, title: `Project Breakdown: ${project.title}`, content: "Analyzing architecture..." });
    setIsInsightLoading(true);

    const prompt = `insight ${project.title}`;
    const response = await callGemini(prompt, ""); 
    
    setTimeout(() => {
      setInsightModal({ isOpen: true, title: `Project Breakdown: ${project.title}`, content: response });
      setIsInsightLoading(false);
    }, 600);
  };

  const closeInsightModal = () => {
      setInsightModal(null);
  };

  const resetChat = () => {
      setShowOptions(true);
  };

  const openChat = () => {
    setIsChatOpen(true);
    setIsChatMinimized(false);
    setIsChatMaximized(false);
  };

  const toggleChat = () => {
      if (isChatOpen) {
          setIsChatOpen(false);
          setIsChatMinimized(false);
          setIsChatMaximized(false);
      } else {
          openChat();
      }
  };

  const minimizeChat = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsChatMinimized(!isChatMinimized);
      if(isChatMaximized) setIsChatMaximized(false);
  };
  
  const maximizeChat = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsChatMaximized(!isChatMaximized);
      if(isChatMinimized) setIsChatMinimized(false);
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isChatOpen, showOptions, isChatMinimized, isChatMaximized, isChatLoading]);

  // --- BACKGROUND ANIMATION LOOP ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return; 

    let animationFrameId: number;
    let stars: {x: number, y: number, size: number, phase: number, speed: number}[] = [];
    let galaxy: {angle: number, r: number, size: number, speed: number, color: string}[] = [];
    let shootingStars: {x: number, y: number, length: number, speed: number, angle: number, life: number}[] = [];
    let meteoroids: {x: number, y: number, size: number, dx: number, dy: number, angle: number, spin: number, shape: number[]}[] = [];
    
    let satellite = { angle: Math.PI, orbitRadius: 0 }; 
    let spaceship = { x: -200, y: 200, speed: 5, active: false, timer: 0 };
    let ufo = { x: -100, y: 100, speed: 4, active: false, timer: 0 };
    let astronaut = { x: canvas.width * 0.8, y: canvas.height * 0.2, angle: 0, dx: 0.2, dy: 0.1 };

    const resizeCanvas = () => {
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
            initGalaxy();
            initMeteoroids();
            astronaut.x = canvas.width * 0.15;
            astronaut.y = canvas.height * 0.3;
            
            const earthRadius = Math.min(canvas.width, canvas.height) * 0.35;
            satellite.orbitRadius = earthRadius * 1.3;
        }
    };

    const initStars = () => {
      stars = Array.from({ length: 150 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        phase: Math.random() * Math.PI * 2, 
        speed: Math.random() * 0.05 + 0.01
      }));
    };

    const initGalaxy = () => {
        galaxy = [];
        const particleCount = 250;
        for(let i = 0; i < particleCount; i++) {
            galaxy.push({
                angle: Math.random() * Math.PI * 2,
                r: Math.random() * 200 + 50,
                size: Math.random() * 2 + 0.5,
                speed: (Math.random() * 0.002 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
                color: Math.random() < 0.5 ? '#8b5cf6' : '#3b82f6'
            });
        }
    };

    const initMeteoroids = () => {
        meteoroids = Array.from({ length: 12 }).map(() => {
            const points = [];
            const numPoints = 6 + Math.floor(Math.random() * 4);
            for(let i=0; i<numPoints; i++) {
                const angle = (i / numPoints) * Math.PI * 2;
                const r = 0.8 + Math.random() * 0.4;
                points.push(angle, r);
            }
            
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 15 + 10,
                dx: (Math.random() - 0.5) * 0.3,
                dy: (Math.random() - 0.5) * 0.3,
                angle: Math.random() * Math.PI * 2,
                spin: (Math.random() - 0.5) * 0.01,
                shape: points
            };
        });
    };

    const createShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height / 2,
        length: Math.random() * 80 + 20,
        speed: Math.random() * 15 + 10,
        angle: Math.PI / 4, 
        life: 1.0
      });
    };

    const drawGalaxy = (time: number) => {
        const cx = canvas.width * 0.5;
        const cy = canvas.height * 0.5;

        galaxy.forEach(p => {
            p.angle += p.speed;
            const x = cx + Math.cos(p.angle + time * 0.0001) * p.r * 1.5;
            const y = cy + Math.sin(p.angle + time * 0.0001) * p.r;
            
            ctx.fillStyle = p.color;
            ctx.globalAlpha = 0.6;
            ctx.fillRect(x, y, p.size, p.size);
            ctx.globalAlpha = 1.0;
        });
    };

    const drawMeteoroids = () => {
        ctx.fillStyle = '#334155';
        ctx.strokeStyle = '#475569';
        
        meteoroids.forEach(m => {
            m.x += m.dx;
            m.y += m.dy;
            m.angle += m.spin;

            if (m.x < -50) m.x = canvas.width + 50;
            if (m.x > canvas.width + 50) m.x = -50;
            if (m.y < -50) m.y = canvas.height + 50;
            if (m.y > canvas.height + 50) m.y = -50;

            ctx.save();
            ctx.translate(m.x, m.y);
            ctx.rotate(m.angle);
            ctx.beginPath();
            const points = m.shape;
            for(let i=0; i<points.length; i+=2) {
                const a = points[i];
                const r = points[i+1] * m.size;
                const px = Math.cos(a) * r;
                const py = Math.sin(a) * r;
                if(i===0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            
            ctx.fillStyle = '#1e293b';
            ctx.beginPath();
            ctx.arc(m.size * 0.2, m.size * 0.2, m.size * 0.15, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        });
    };

    const drawSatellite = () => {
        const earthX = canvas.width * 0.85;
        const earthY = canvas.height * 0.85;
        
        satellite.angle += 0.005;
        const satX = earthX + Math.cos(satellite.angle) * satellite.orbitRadius;
        const satY = earthY + Math.sin(satellite.angle) * satellite.orbitRadius;

        ctx.save();
        ctx.translate(satX, satY);
        ctx.rotate(satellite.angle + Math.PI / 2);

        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(-15, -5, 10, 10);
        ctx.fillRect(5, -5, 10, 10);
        
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(-5, -5, 10, 10);
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -10);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, -10, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    };

    const drawSpaceship = () => {
        if (!spaceship.active) {
            spaceship.timer++;
            if (spaceship.timer > 400 && Math.random() < 0.005) {
                spaceship.active = true;
                spaceship.y = Math.random() * (canvas.height * 0.6);
                spaceship.x = -100;
            }
            return;
        }

        spaceship.x += spaceship.speed;
        
        ctx.save();
        ctx.translate(spaceship.x, spaceship.y);
        
        ctx.fillStyle = '#f1f5f9';
        ctx.beginPath();
        ctx.ellipse(0, 0, 30, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#0ea5e9';
        ctx.beginPath();
        ctx.ellipse(10, -2, 8, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(-20, 0);
        ctx.lineTo(-30, -10);
        ctx.lineTo(-15, 0);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-20, 0);
        ctx.lineTo(-30, 10);
        ctx.lineTo(-15, 0);
        ctx.fill();

        const flicker = Math.random() * 5;
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.moveTo(-30, 0);
        ctx.lineTo(-40 - flicker, -3);
        ctx.lineTo(-40 - flicker, 3);
        ctx.fill();

        ctx.restore();

        if (spaceship.x > canvas.width + 100) {
            spaceship.active = false;
            spaceship.timer = 0;
        }
    };

    const drawMoon = () => {
        const moonX = canvas.width - 100;
        const moonY = 100;
        const radius = 40;

        const glow = ctx.createRadialGradient(moonX, moonY, radius, moonX, moonY, radius * 3);
        glow.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(moonX, moonY, radius * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.arc(moonX, moonY, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#cbd5e1';
        [{x: -10, y: -10, r: 8}, {x: 15, y: 5, r: 10}, {x: -5, y: 20, r: 6}].forEach(c => {
            ctx.beginPath();
            ctx.arc(moonX + c.x, moonY + c.y, c.r, 0, Math.PI * 2);
            ctx.fill();
        });
    };

    const drawEarth = (time: number) => {
        const earthX = canvas.width * 0.85;
        const earthY = canvas.height * 0.85;
        const radius = Math.min(canvas.width, canvas.height) * 0.35;

        ctx.save();
        ctx.beginPath();
        ctx.arc(earthX, earthY, radius, 0, Math.PI * 2);
        ctx.clip();

        const gradient = ctx.createRadialGradient(
            earthX - radius * 0.3, earthY - radius * 0.3, radius * 0.1,
            earthX, earthY, radius
        );
        gradient.addColorStop(0, '#2563eb'); 
        gradient.addColorStop(1, '#0f172a');

        ctx.fillStyle = gradient;
        ctx.fillRect(earthX - radius, earthY - radius, radius * 2, radius * 2);

        const rotation = time * 0.0005;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'; 
        for(let i=0; i<5; i++) {
             const angle = rotation + (i * Math.PI * 2) / 5;
             const cx = earthX + Math.sin(angle) * (radius * 0.6);
             const cy = earthY + Math.cos(angle * 0.8) * (radius * 0.3);
             ctx.beginPath();
             ctx.ellipse(cx, cy, radius * 0.4, radius * 0.2, angle, 0, Math.PI * 2);
             ctx.fill();
        }
        
        ctx.restore();

        ctx.fillStyle = 'rgba(96, 165, 250, 0.1)';
        ctx.beginPath();
        ctx.arc(earthX, earthY, radius * 1.05, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(96, 165, 250, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(earthX, earthY, radius, 0, Math.PI * 2);
        ctx.stroke();
    };

    const drawUFO = (time: number) => {
        if (!ufo.active) {
            ufo.timer++;
            if (ufo.timer > 300 && Math.random() < 0.01) { 
                ufo.active = true;
                ufo.x = -50;
                ufo.y = Math.random() * (canvas.height / 2);
            }
            return;
        }

        ufo.x += ufo.speed;
        const wobbleY = ufo.y + Math.sin(time * 0.01) * 10;

        ctx.save();
        ctx.translate(ufo.x, wobbleY);
        
        ctx.fillStyle = '#a855f7'; 
        ctx.beginPath();
        ctx.arc(0, -5, 15, Math.PI, 0);
        ctx.fill();

        ctx.fillStyle = '#94a3b8'; 
        ctx.beginPath();
        ctx.ellipse(0, 0, 30, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = `rgba(250, 204, 21, ${Math.abs(Math.sin(time * 0.02))})`; 
        [-15, 0, 15].forEach(x => {
            ctx.beginPath();
            ctx.arc(x, 0, 3, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.restore();

        if (ufo.x > canvas.width + 50) {
            ufo.active = false;
            ufo.timer = 0;
        }
    };

    const drawAstronaut = (time: number) => {
        astronaut.x += astronaut.dx * Math.sin(time * 0.001);
        astronaut.y += astronaut.dy * Math.cos(time * 0.001);
        const rotation = Math.sin(time * 0.0005) * 0.2; 

        ctx.save();
        ctx.translate(astronaut.x, astronaut.y);
        ctx.rotate(rotation);
        ctx.scale(0.8, 0.8);

        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(-15, -15, 30, 35);
        ctx.fillStyle = '#f1f5f9';
        ctx.beginPath();
        ctx.roundRect(-12, -10, 24, 40, 5);
        ctx.fill();
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.arc(0, -15, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.ellipse(0, -15, 8, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.beginPath();
        ctx.ellipse(-2, -17, 3, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    };

    const render = () => {
      if (!ctx || !canvas) return;
      
      const time = Date.now();

      ctx.fillStyle = '#020617'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGalaxy(time);
      drawMeteoroids();
      drawEarth(time);
      drawMoon();
      drawAstronaut(time);
      drawSatellite(); 
      drawSpaceship(); 
      drawUFO(time);

      stars.forEach(star => {
        const blink = Math.sin(time * 0.002 + star.phase);
        const opacity = 0.55 + 0.45 * blink; 
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });

      if (Math.random() < 0.03) createShootingStar();

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += s.speed * Math.cos(s.angle);
        s.y += s.speed * Math.sin(s.angle);
        s.life -= 0.02;

        if (s.life <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = s.x - s.length * Math.cos(s.angle);
        const tailY = s.y - s.length * Math.sin(s.angle);

        const gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${s.life})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-indigo-500/30 relative">
      
      {/* Custom Keyframe Animations */}
      <style>{`
        @keyframes reveal {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes blurIn {
          0% { opacity: 0; filter: blur(10px); transform: translateY(10px); }
          100% { opacity: 1; filter: blur(0); transform: translateY(0); }
        }
        .animate-reveal { animation: reveal 1s ease-out forwards; }
        .animate-blur-in { animation: blurIn 1.5s ease-out forwards; }
        .glass-text {
            color: transparent;
            background-clip: text;
            background-image: linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.6) 100%);
            text-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
      `}</style>

      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-20 pointer-events-none" />

      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden opacity-10">
        <Gamepad2 className="absolute top-1/4 left-1/4 w-32 h-32 text-indigo-400 animate-pulse" style={{ animationDuration: '4s' }} />
        <Terminal className="absolute bottom-1/4 right-1/4 w-40 h-40 text-purple-400 animate-pulse" style={{ animationDuration: '6s' }} />
        <Cpu className="absolute top-1/3 right-1/3 w-24 h-24 text-blue-400 animate-pulse" style={{ animationDuration: '5s' }} />
        <Code className="absolute bottom-1/3 left-1/3 w-20 h-20 text-slate-400 animate-pulse" style={{ animationDuration: '7s' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
<div className="w-full px-10 h-16 flex items-center justify-between">          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">N</div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent leading-none flex items-center gap-2">
                Nhat Nam Do <BadgeCheck className="w-5 h-5 text-blue-400" fill="currentColor" stroke="black"/>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide flex items-center gap-1 mt-1">
                🇨🇦 University of New Brunswick
              </span>
            </div>
          </div>

          <div className="flex gap-6 text-sm font-medium text-slate-400 items-center">
              <a 
    href="/resumegod.pdf" 
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg transition-all"
  >
    📄 Resume
  </a>
            <a href="#projects" className="hover:text-white transition-colors flex items-center gap-1"><Code className="w-4 h-4"/> Projects</a>
            
            <div className="relative">
              <button 
                onClick={() => setIsContactOpen(!isContactOpen)}
                className={`hover:text-white transition-colors flex items-center gap-1 focus:outline-none ${isContactOpen ? 'text-white' : ''}`}
              >
                <Mail className="w-4 h-4"/> Contact
              </button>

              {isContactOpen && (
                <>
                  <div className="fixed inset-0 z-40 cursor-default" onClick={() => setIsContactOpen(false)} />
                  <div className="absolute right-0 top-full mt-4 w-72 bg-slate-900/95 border border-slate-700 rounded-xl shadow-2xl p-4 flex flex-col gap-3 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200 z-50 ring-1 ring-white/10">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">Get in touch</div>
                      
                      <div onClick={copyEmail} className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg group cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                            {copiedEmail ? <Check className="w-4 h-4"/> : "📧"}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-400 group-hover:text-indigo-300">Email (Click to copy)</span>
                            <span className="text-sm font-mono">namdok2k3@gmail.com</span>
                        </div>
                      </div>

                      <a href="https://www.linkedin.com/in/nam-do-4aa1a6231/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg group">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <Linkedin className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-400 group-hover:text-blue-300">LinkedIn</span>
                            <span className="text-sm font-medium">Nam Do</span>
                        </div>
                      </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative">
        <div className="max-w-6xl mx-auto text-center md:text-left">
          <div className="max-w-3xl">
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6 animate-reveal">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Open to Work
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider">
                📍 Toronto (Open to Relocate)
              </div>
            </div>

            <div className="block mb-6 animate-reveal" style={{ animationDelay: '0.1s' }}>
              <div className="inline-flex items-center justify-center md:justify-start gap-2 px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                <Cpu className="w-3 h-3" />
                CS Graduate
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight animate-reveal" style={{ animationDelay: '0.2s' }}>
<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Delivering</span> a World Worth Building, One Goal Worth Fulfilling.            </h1>
            
            <p className="text-xl md:text-2xl font-medium leading-relaxed mb-10 max-w-2xl mx-auto md:mx-0 animate-blur-in glass-text" style={{ animationDelay: '0.4s' }}>
Hi there! My name is Nam. I'm a Computer Science graduate passionate about making the world a better place every day. I love learning new things to build something meaningful. I hope you have fun exploring my projects and have a wonderful day!            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start animate-reveal" style={{ animationDelay: '0.7s' }}>
              <a href="#projects" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2 transform hover:-translate-y-1">
                View My Work <ChevronRight className="w-5 h-5" />
              </a>
              <a href="https://github.com/namdok2k3-cmyk" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold rounded-xl transition-all flex items-center gap-2 transform hover:-translate-y-1">
                <Github className="w-5 h-5" /> GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-slate-900/30 border-t border-slate-800 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">My Projects</h2>
              <p className="text-slate-400">Selected works and experiments.</p>
            </div>
            
            <div className="flex gap-2 bg-slate-900/50 p-1 rounded-lg border border-slate-800 self-start">
              {['All', 'Game', 'Web App'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeFilter === filter 
                    ? 'bg-slate-700 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group relative bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 flex flex-col backdrop-blur-md">
                
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10 bg-yellow-500/10 border border-yellow-500/50 text-yellow-500 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-md">
                    <Star className="w-3 h-3 fill-yellow-500" /> FEATURED
                  </div>
                )}

                <div className="relative h-52 overflow-hidden bg-slate-900 group-hover:bg-slate-950 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                  
                  <img 
                    src={project.image} 
                    alt={project.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.opacity = '0';
                      const placeholder = (e.target as HTMLImageElement).nextElementSibling;
                      if (placeholder && placeholder.classList.contains('image-placeholder')) {
                          placeholder.classList.remove('hidden');
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                  />
                  
                  <div className="image-placeholder hidden absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 group-hover:scale-110 transition-transform duration-700">
                    <div className="flex flex-col items-center gap-2 p-4 text-center">
                        {project.category === 'Game' ? <Gamepad2 className="w-12 h-12 text-slate-700" /> : <Code className="w-12 h-12 text-slate-700" />}
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Preview Unavailable</span>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 z-20 p-2 bg-slate-950/50 backdrop-blur-md rounded-lg text-indigo-400 border border-slate-800">
                    {project.category === 'Game' ? <Gamepad2 className="w-6 h-6" /> : <Code className="w-6 h-6" />}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 block">{project.category}</span>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t, i) => (
                        <span key={i} className="text-[11px] font-medium px-2.5 py-1 bg-slate-900 text-slate-300 rounded-md border border-slate-700/50">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                      <div className="flex items-center gap-2">
                        <a 
                          href={project.repo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-slate-400 flex items-center gap-2 hover:text-white transition-colors"
                        >
                          <Github className="w-4 h-4" /> Source
                        </a>
                        <button 
                          onClick={() => handleInsightClick(project)}
                          className="text-xs font-bold bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded hover:bg-indigo-500/20 transition-colors flex items-center gap-1"
                          title="Get AI Insight"
                        >
                          <Sparkles className="w-3 h-3" /> Insight
                        </button>
                      </div>
                      
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`
                          flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all
                          ${project.demo === '#' 
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'}
                        `}
                      >
                        {project.demo === '#' ? 'Coming Soon' : 'View Project'} 
                        {project.demo !== '#' && <ExternalLink className="w-4 h-4" />}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-600 p-10 hover:border-slate-700 hover:bg-slate-900/30 transition-all cursor-default">
              <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-4">
                <Code className="w-8 h-8 text-slate-700" />
              </div>
              <p className="font-medium">More Projects Coming Soon</p>
              <p className="text-xs text-slate-700 mt-2">Checking back tomorrow!</p>
            </div>

          </div>
        </div>
      </section>

      {/* --- INSIGHT MODAL --- */}
      {insightModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl shadow-2xl max-w-lg w-full p-6 relative animate-in zoom-in-95 duration-200 ring-1 ring-white/10">
                <button 
                    onClick={closeInsightModal}
                    className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">{insightModal.title}</h3>
                    </div>
                </div>
                
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 text-slate-300 text-sm leading-relaxed mb-4 whitespace-pre-line">
                    {isInsightLoading ? (
                        <div className="flex items-center gap-2 text-slate-500">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Analyzing codebase...
                        </div>
                    ) : (
                        insightModal.content
                    )}
                </div>

                <div className="flex justify-end">
                    <button 
                        onClick={closeInsightModal}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-lg transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
      )}

      <footer className="py-12 border-t border-slate-800 px-6 bg-slate-950 z-10 relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Nhat Nam Do. All rights reserved.</p>
        </div>
      </footer>

      {/* --- FLOATING AI CHAT BUTTON --- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-none">
        
        {/* Chat Window */}
        {isChatOpen && (
          <div className={`
            pointer-events-auto
            mb-2 bg-slate-900/95 border border-indigo-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-md transition-all duration-300 origin-bottom-right
            ${isChatMinimized ? 'h-14 w-64 md:w-72 opacity-90' : isChatMaximized ? 'w-[90vw] h-[80vh] fixed right-4 bottom-20' : 'w-64 md:w-72 h-[500px] animate-in slide-in-from-bottom-4'}
          `}>
            {/* Header */}
            <div 
              className="bg-slate-800/80 p-3 border-b border-indigo-500/20 flex items-center justify-between cursor-pointer"
              onClick={minimizeChat}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Ask the Dev (AI)</div>
                  {!isChatMinimized && (
                    <div className="text-[9px] text-slate-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                 <button onClick={minimizeChat} className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors">
                    <Minus className="w-3.5 h-3.5" />
                 </button>
                 <button onClick={maximizeChat} className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors">
                    {isChatMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                 </button>
                 <button onClick={() => setIsChatOpen(false)} className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors">
                    <X className="w-3.5 h-3.5" />
                 </button>
              </div>
            </div>

            {/* Chat Content (Hidden if minimized) */}
            {!isChatMinimized && (
              <>
                <div className={`overflow-y-auto p-3 space-y-3 bg-slate-950/50 ${isChatMaximized ? 'flex-1' : 'flex-1'}`}>
                  {chatHistory.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.isContact ? (
                        <div className="flex flex-col gap-2">
                            <a href="https://www.linkedin.com/in/nam-do-4aa1a6231/" target="_blank" className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-3 py-1.5 text-xs font-bold flex items-center gap-2 transition-transform hover:scale-105 shadow-lg justify-center">
                                <Linkedin className="w-3 h-3" /> Message
                            </a>
                            <div className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 flex items-center justify-between group">
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <span className="text-[10px] font-mono text-slate-300 truncate">namdok2k3@gmail.com</span>
                                </div>
                                <button onClick={copyEmail} className="text-slate-400 hover:text-white transition-colors" title="Copy Email">
                                    {copiedEmail ? <Check className="w-3 h-3 text-green-400"/> : <Copy className="w-3 h-3"/>}
                                </button>
                            </div>
                        </div>
                      ) : (
                        <div className={`
                            max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed
                            ${msg.role === 'user' 
                            ? 'bg-slate-700 text-white rounded-br-none' 
                            : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'}
                        `}>
                            <div className="whitespace-pre-line">{msg.text}</div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isChatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-800 border border-slate-700 rounded-xl rounded-bl-none px-3 py-2 flex items-center gap-2">
                        <Loader2 className="w-3 h-3 text-indigo-400 animate-spin" />
                        <span className="text-[10px] text-slate-400">Thinking...</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="bg-slate-900 border-t border-slate-800 flex flex-col">
                    {/* ORIGINAL BIG MENU */}
                    {showOptions ? (
                        <div className="p-2 border-b border-slate-800/50 grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto">
                            <button onClick={() => handleQuestionClick('overview', 'Give me a quick overview')} className="text-left px-3 py-2 bg-slate-800 hover:bg-indigo-600/20 hover:border-indigo-500 border border-slate-700 rounded-lg text-xs text-slate-300 transition-all flex justify-between group">
                                <span className="flex items-center gap-2"><Sparkles className="w-3 h-3 text-yellow-500"/> Quick Overview</span>
                                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                            <button onClick={() => handleQuestionClick('tech', 'What is his tech stack?')} className="text-left px-3 py-2 bg-slate-800 hover:bg-indigo-600/20 hover:border-indigo-500 border border-slate-700 rounded-lg text-xs text-slate-300 transition-all flex justify-between group">
                                <span className="flex items-center gap-2"><Code className="w-3 h-3 text-blue-400"/> Tech Stack & Skills</span>
                                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                             <button onClick={() => handleQuestionClick('experience', 'What is his experience?')} className="text-left px-3 py-2 bg-slate-800 hover:bg-indigo-600/20 hover:border-indigo-500 border border-slate-700 rounded-lg text-xs text-slate-300 transition-all flex justify-between group">
                                <span className="flex items-center gap-2"><Briefcase className="w-3 h-3 text-purple-400"/> Work Experience</span>
                                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                            <button onClick={() => handleQuestionClick('hire', 'Why should I hire Nam?')} className="text-left px-3 py-2 bg-slate-800 hover:bg-indigo-600/20 hover:border-indigo-500 border border-slate-700 rounded-lg text-xs text-slate-300 transition-all flex justify-between group">
                                <span className="flex items-center gap-2"><Heart className="w-3 h-3 text-red-500"/> Why Hire Me?</span>
                                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                            <button onClick={() => handleQuestionClick('hobbies', 'What are his hobbies?')} className="text-left px-3 py-2 bg-slate-800 hover:bg-indigo-600/20 hover:border-indigo-500 border border-slate-700 rounded-lg text-xs text-slate-300 transition-all flex justify-between group">
                                <span className="flex items-center gap-2"><Zap className="w-3 h-3 text-orange-400"/> Fun Fact / Hobbies</span>
                                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                            <button onClick={() => handleQuestionClick('future', 'Future Project Ideas')} className="text-left px-3 py-2 bg-slate-800 hover:bg-indigo-600/20 hover:border-indigo-500 border border-slate-700 rounded-lg text-xs text-slate-300 transition-all flex justify-between group">
                                <span className="flex items-center gap-2"><Lightbulb className="w-3 h-3 text-yellow-400"/> Future Project Ideas</span>
                                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                            <button onClick={() => handleQuestionClick('collab', 'Is he open to collab?')} className="text-left px-3 py-2 bg-slate-800 hover:bg-indigo-600/20 hover:border-indigo-500 border border-slate-700 rounded-lg text-xs text-slate-300 transition-all flex justify-between group">
                                <span className="flex items-center gap-2"><User className="w-3 h-3 text-green-400"/> Open to Collab?</span>
                                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </div>
                    ) : (
                        <div className="p-2 border-b border-slate-800/50 flex gap-2">
                            <button onClick={resetChat} className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition-colors">
                                Show Quick Options
                            </button>
                        </div>
                    )}

                    {/* TYPING INPUT BOX (Hits backend API) */}
                    <form onSubmit={handleChatSubmit} className="p-2 flex gap-2">
                        <input 
                            type="text" 
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Or type a custom question..."
                            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium placeholder-slate-500"
                            disabled={isChatLoading}
                        />
                        <button 
                            type="submit"
                            disabled={!chatInput.trim() || isChatLoading}
                            className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white p-2 rounded-lg transition-colors flex items-center justify-center w-8 h-8 shrink-0"
                        >
                            <Send size={14} />
                        </button>
                    </form>
                </div>
              </>
            )}
          </div>
        )}

        {/* Bubble + Button bounce together when closed */}
        {!isChatOpen && (
          <div className="flex flex-col items-end gap-2 pointer-events-none animate-bounce">
            <div className="pointer-events-auto">
              <button 
                onClick={openChat}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-2xl rounded-br-none shadow-lg shadow-indigo-500/50 flex items-center gap-2 transform transition-all hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span className="text-xs font-bold whitespace-nowrap">✨ Ask my AI Assistant!</span>
              </button>
            </div>
            <div className="relative pointer-events-auto self-end">
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-xs font-bold flex items-center justify-center text-white z-10 shadow-lg shadow-red-500/50">1</span>
              <button 
                onClick={toggleChat}
                className="p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-110"
              >
                <Sparkles className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* When open: just X button, no bounce */}
        {isChatOpen && (
          <div className="relative pointer-events-auto">
            <button 
              onClick={toggleChat}
              className="p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center bg-slate-800 text-slate-400 rotate-90"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default App;