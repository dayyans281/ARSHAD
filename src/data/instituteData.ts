import { Program, Course, GalleryItem, Announcement, Registration } from '../types';

export const INSTITUTE_INFO = {
  name: "UNIQUE COMMERCE CENTRE",
  shortName: "UCC Karachi",
  tagline: "Learn Today, Lead Tomorrow",
  foundedYear: "2010",
  director: "Sir Arshad Siddiqui",
  phone: "0344-2302526",
  phoneFormatted: "+92 344 2302526",
  whatsapp: "03442302526",
  email: "uniquecommercecentre@gmail.com",
  address: "Near Musharaf Ritoaz Ghar, Rehmat Chowk, Sector 1-F, Orangi Town, Karachi",
  city: "Karachi, Pakistan",
  admissionSession: "2026–2027",
  timings: "Morning: 8:00 AM – 1:00 PM | Evening: 3:00 PM – 9:30 PM",
  mapsQueryUrl: "https://www.google.com/maps/search/?api=1&query=Rehmat+Chowk+Sector+1-F+Orangi+Town+Karachi",
  mapsEmbedUrl: "https://maps.google.com/maps?q=Rehmat%20Chowk,%20Sector%201-F,%20Orangi%20Town,%20Karachi&t=&z=15&ie=UTF8&iwloc=&output=embed"
};

export const PROGRAMS: Program[] = [
  {
    id: "secondary",
    name: "Secondary",
    level: "Class IX & X (Science & General)",
    category: "secondary",
    description: "Build strong academic foundations with comprehensive conceptual coaching.",
    fullDetails: "Designed to provide thorough fundamental education for Class 9th students across Physics, Chemistry, Biology, Computer Science, and General Science groups with regular testing and individual guidance.",
    subjects: ["Physics", "Chemistry", "Biology / Computer", "Mathematics", "English & Urdu", "Islamiat & Pak Studies"],
    duration: "1 Year Academic Session",
    timings: "Morning: 8:30 AM - 12:30 PM | Evening: 4:00 PM - 7:00 PM",
    icon: "BookOpen",
    badge: "Foundation"
  },
  {
    id: "matric",
    name: "Matric",
    level: "Board of Secondary Education Karachi (BSEK)",
    category: "matric",
    description: "Comprehensive Matric preparation with high-scoring test sessions and model papers.",
    fullDetails: "Rigorous preparation for BSEK Matric Board Examinations with proven past paper solving techniques, frequent simulated exams, formula sheets, and personal mentoring by top Karachi board examiners.",
    subjects: ["Advanced Mathematics", "Physics & Practical Coaching", "Chemistry with Labs", "Biology / IT", "Sindhi / English / Urdu"],
    duration: "Full Academic Year + Board Prep Crash Course",
    timings: "Evening: 3:30 PM - 7:30 PM",
    icon: "GraduationCap",
    badge: "High Scoring"
  },
  {
    id: "intermediate",
    name: "Intermediate",
    level: "BIEK Karachi (I.Com, Pre-Eng, Pre-Med, Computer Science)",
    category: "intermediate",
    description: "Commerce and academic programs with specialized commerce faculties.",
    fullDetails: "Our flagship Commerce division (I.Com Part-I & Part-II) led by Sir Arshad Siddiqui alongside Science groups. In-depth principles of accounting, commercial geography, business mathematics, and economics tailored for Karachi Board distinctions.",
    subjects: ["Principles of Accounting", "Business Mathematics & Stats", "Economics & Commercial Geography", "Banking & Commercial Practice", "Pre-Engineering / Medical subjects"],
    duration: "2-Year Intermediate Program",
    timings: "Morning & Evening Batches Available",
    icon: "Building2",
    badge: "Flagship Commerce"
  },
  {
    id: "graduation",
    name: "Graduation",
    level: "University of Karachi Affiliated & Private (B.Com, BBA, ADA/ADS)",
    category: "graduation",
    description: "Professional and academic development for university-level degrees.",
    fullDetails: "Comprehensive guidance for private and regular undergraduate students pursuing Bachelor of Commerce (B.Com / ADC), Associate Degree in Arts/Science, and preparatory modules for University of Karachi semester & annual exams.",
    subjects: ["Financial & Cost Accounting", "Business Law & Taxation", "Auditing & Advanced Economics", "Business Communication", "Corporate Finance"],
    duration: "Annual & Semester Tracks",
    timings: "Flexible Evening Batches: 6:00 PM - 9:30 PM",
    icon: "Award",
    badge: "Degree Prep"
  },
  {
    id: "masters",
    name: "Masters",
    level: "Postgraduate Studies (M.Com, MA, MBA Prep)",
    category: "masters",
    description: "Advanced educational programs fostering career excellence and research.",
    fullDetails: "Specialized postgraduate preparation for master's degrees in Commerce, Economics, and preparation for competitive tests and MBA business school entrance.",
    subjects: ["Advanced Corporate Financial Management", "Strategic Cost Accounting", "Managerial Economics", "Research Methodologies", "Quantitative Analysis"],
    duration: "Advanced Modular Curriculum",
    timings: "Special Weekend & Evening Slots",
    icon: "Scroll",
    badge: "Advanced"
  }
];

export const COMPUTER_COURSES: Course[] = [
  {
    id: "cit",
    title: "C.I.T (Certificate in IT)",
    category: "computer",
    duration: "6 Months Diploma",
    level: "Beginner to Intermediate",
    shortDesc: "Complete government-recognized standard IT certificate covering computing fundamentals, software, and networking.",
    fullDesc: "Comprehensive Information Technology curriculum covering computer architecture, Windows OS, complete MS Office suite, basic computer networking, internet protocols, and workplace productivity tools.",
    modules: ["Computer Fundamentals & Windows OS", "MS Word, Excel, PowerPoint & Access", "InPage Urdu & Typing Speed Mastery", "Networking & Internet Concepts", "Hardware Troubleshooting Basics"],
    highlights: ["Hands-on PC lab per student", "Official completion certificate", "InPage Urdu typing certified"],
    badge: "Most Popular",
    icon: "Cpu"
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    category: "computer",
    duration: "3 Months Intensive",
    level: "All Skill Levels",
    shortDesc: "Master Adobe Photoshop, Illustrator, visual branding, social media post creation, and print layouts.",
    fullDesc: "Learn professional graphic design principles from Pakistani industry designers. Create stunning flyers, banners, logos, social media ads, and portfolio projects ready for clients and freelancing.",
    modules: ["Adobe Photoshop (Photo editing, retouching, compositing)", "Adobe Illustrator (Vector art, logos, typography)", "Canva Pro Mastery for Social Media", "Color Theory & Pakistani Print Standards", "Freelancing Profile Setup (Fiverr & Behance)"],
    highlights: ["Live client portfolio project", "Free design resources pack", "Freelancing guidance"],
    badge: "High Demand",
    icon: "Palette"
  },
  {
    id: "special-ai",
    title: "Special Class of A.I",
    category: "computer",
    duration: "2 Months Specialized",
    level: "Modern & Future-Ready",
    shortDesc: "Hands-on Artificial Intelligence, prompt engineering, generative tools, ChatGPT, and automated digital workflows.",
    fullDesc: "Stay ahead in the era of Artificial Intelligence! Unique Commerce Centre's cutting-edge AI course teaches students how to utilize AI for coding, content generation, graphics, educational research, business automation, and career acceleration.",
    modules: ["Generative AI Foundations & LLM Architecture", "Advanced Prompt Engineering with ChatGPT & Claude", "AI Graphic Generation (Midjourney, Stable Diffusion)", "AI for Academic Research & Study Assistance", "Automating Office & Business Tasks with AI Agents"],
    highlights: ["Hands-on modern AI tool licenses", "Real-world productivity automation", "Future-proof career skills"],
    badge: "⭐ Special AI Batch",
    icon: "Sparkles"
  },
  {
    id: "ms-office",
    title: "MS Office Suite",
    category: "computer",
    duration: "2 Months Fast-Track",
    level: "Beginner to Advanced",
    shortDesc: "Master Word, Advanced Excel (Formulas, VLOOKUP, Pivot Tables), PowerPoint, and Access.",
    fullDesc: "Crucial for commerce, banking, and office jobs. Deep dive into Excel spreadsheets, financial reporting formulas, professional presentation design, and database record keeping.",
    modules: ["Advanced Excel (VLOOKUP, INDEX-MATCH, Pivot Tables, Charts)", "MS Word (Official Reports, Tables, Mail Merge)", "PowerPoint (Animated Professional Presentations)", "MS Access (Relational Database Creation)", "Urdu InPage for local office documents"],
    highlights: ["Practical commerce ledger case studies", "Speed shortcuts test", "Certificate issued"],
    badge: "Essential Office",
    icon: "Table"
  },
  {
    id: "digital-skills",
    title: "Digital Skills & Freelancing",
    category: "computer",
    duration: "3 Months",
    level: "Practical & Earning Focused",
    shortDesc: "Learn freelancing on Fiverr & Upwork, social media marketing, e-commerce, and digital earning strategies.",
    fullDesc: "Empower students to earn while studying. Practical training on online freelancing marketplaces, client communication in English, social media marketing for Pakistani businesses, and payment withdrawal methods (JazzCash, Nayapay, Bank).",
    modules: ["Fiverr & Upwork Gig Optimization", "Client Negotiation & English Proposals", "Meta / Instagram Advertising Essentials", "E-commerce & Local Drop-shipping basics", "Safe Payment Gateways in Pakistan"],
    highlights: ["Live gig creation in class", "Real mentor reviews", "Practical income skills"],
    badge: "Earning Oriented",
    icon: "TrendingUp"
  },
  {
    id: "computer-fundamentals",
    title: "Computer Fundamentals",
    category: "computer",
    duration: "1 Month",
    level: "Absolute Beginners",
    shortDesc: "Foundational hardware, keyboard typing mastery, operating system navigation, and secure web browsing.",
    fullDesc: "Perfect for students or professionals stepping into computing for the first time. Learn confident touch-typing, computer assembly components, file organization, email drafting, and cybersecurity safety.",
    modules: ["PC Hardware & Peripheral Architecture", "English & Urdu Touch-Typing Drills", "File Systems, USBs & Cloud Storage", "Safe Web Browsing & Email Protocol", "Troubleshooting Common Glitches"],
    highlights: ["Individual workstation", "Confidence-building environment", "Fast typing certificate"],
    badge: "Foundation",
    icon: "Monitor"
  }
];

export const ENGLISH_COURSES: Course[] = [
  {
    id: "spoken-english",
    title: "Spoken English",
    category: "english",
    duration: "3 Months (Daily Practice)",
    level: "Beginner to Conversational",
    shortDesc: "Overcome hesitation, build everyday conversational fluency, correct Pakistani accent errors, and speak with confidence.",
    fullDesc: "Interactive speech sessions, role-plays, impromptu public speaking, and vocabulary drills designed to eliminate fear of speaking English in class, interviews, and public gatherings.",
    modules: ["Daily Life Conversational Scenarios", "Pronunciation & Phonetics Drills", "Hesitation Removal & Debate Sessions", "Common Grammar Mistakes in Urdu Speakers", "Audio-Visual Listening Exercises"],
    highlights: ["Daily microphone speaking practice", "Friendly supportive atmosphere", "Audio listening lab"],
    badge: "Top Enrolled",
    icon: "MessageSquare"
  },
  {
    id: "ielts-prep",
    title: "IELTS Preparation",
    category: "english",
    duration: "2 Months Intensive",
    level: "Intermediate to Advanced",
    shortDesc: "Target Band 7.0+ with comprehensive training in Listening, Reading, Writing, and Speaking modules.",
    fullDesc: "Specialized coaching for study abroad and immigration candidates. Learn Cambridge-standard scoring criteria, essay structure, graphical analysis (Task 1), skimming techniques, and mock interview tests.",
    modules: ["IELTS Academic & General Module breakdown", "Writing Task 1 & Task 2 band-descriptor analysis", "Speed Reading & Keyword Hunting strategies", "Accented English Audio Listening practice", "One-on-One Mock Speaking Interviews with scoring"],
    highlights: ["Weekly timed full mock tests", "Individual writing band feedback", "Official Cambridge test materials"],
    badge: "Band 7.0+ Focus",
    icon: "Globe"
  },
  {
    id: "grammar-writing",
    title: "Grammar & Writing",
    category: "english",
    duration: "2.5 Months",
    level: "All Academic Levels",
    shortDesc: "Master sentence construction, active-passive voice, direct-indirect speech, essay structure, and error-free syntax.",
    fullDesc: "Ideal for Matric, Inter, and university students whose board grades suffer due to weak English writing. Systematically builds grammar rules with hundreds of solved practice exercises.",
    modules: ["Comprehensive 12 Tenses Mastery", "Active & Passive Voice, Direct & Indirect Speech", "Prepositions, Conjunctions & Modifiers", "Paragraph & Board Exam Essay Writing", "Proofreading & Syntax Correction"],
    highlights: ["Board exam English syllabus aligned", "Daily written feedback", "Grammar rule handbook"],
    badge: "Board Grade Booster",
    icon: "PenTool"
  },
  {
    id: "corporate-communication",
    title: "Corporate Communication",
    category: "english",
    duration: "2 Months",
    level: "Professional & Job Seekers",
    shortDesc: "Business email writing, formal presentations, job interview mastery, and professional corporate etiquette.",
    fullDesc: "Prepare to stand out in corporate Pakistan. Master standard email etiquette, persuasive presentation skills, telephone manners, resume / CV design, and mock job interviews.",
    modules: ["Professional Business Email & Memo Writing", "Persuasive Slide & Verbal Presentations", "Job Interview Behavioral Questions & Answers", "Cross-Cultural Communication & Etiquette", "LinkedIn Profile Optimization"],
    highlights: ["Mock interview video recordings", "Professional CV review", "Corporate certification"],
    badge: "Career Ready",
    icon: "Briefcase"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "State-of-the-Art Computer & AI Lab",
    category: "Computer Lab",
    image: "/assets/images/computer_ai_lab_1789799512764.jpg",
    caption: "Students actively learning computer programming, IT certifications, and practical AI applications on high-speed workstations."
  },
  {
    id: "gal-2",
    title: "Billboard Branding & Campus Entrance",
    category: "Campus",
    image: "/assets/images/billboard_branding_1789799461084.jpg",
    caption: "The iconic navy & gold billboard branding of Unique Commerce Centre located at Rehmat Chowk, Orangi Town, Karachi."
  },
  {
    id: "gal-3",
    title: "Confident Commerce & Science Students",
    category: "Students",
    image: "/assets/images/students_hero_1789799480943.jpg",
    caption: "Bright students preparing for Karachi Board and university examinations under expert faculty mentorship."
  },
  {
    id: "gal-4",
    title: "Interactive Lecture Classrooms",
    category: "Classroom",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
    caption: "Well-ventilated, multimedia-equipped academic lecture halls designed for focused conceptual study."
  },
  {
    id: "gal-5",
    title: "Annual Prize Distribution & Position Holders",
    category: "Events",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    caption: "Celebrating outstanding Karachi Board position holders and top performers with medals and scholarships."
  },
  {
    id: "gal-6",
    title: "English Language Group Discussions",
    category: "Activities",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1200&auto=format&fit=crop",
    caption: "Spoken English and IELTS debate circles where students overcome stage fright through structured dialogue."
  },
  {
    id: "gal-7",
    title: "Senior Commerce & Accounting Faculty",
    category: "Teachers",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop",
    caption: "Experienced mentors led by Sir Arshad Siddiqui providing individual academic counseling."
  },
  {
    id: "gal-8",
    title: "Graphic Design & AI Showcase Day",
    category: "Activities",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
    caption: "Students presenting their creative design portfolios, client work, and AI workflows to peers."
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-1",
    title: "📢 ADMISSIONS OPEN 2026–2027: Early Bird 20% Fee Concession on Computer & English Batches this week!",
    date: "Sep 2026",
    tag: "Admissions",
    active: true
  },
  {
    id: "ann-2",
    title: "⭐ Special Class of A.I & Prompt Engineering: New evening batch commences next Monday. Limited 20 seats!",
    date: "Sep 2026",
    tag: "AI Course",
    active: true
  },
  {
    id: "ann-3",
    title: "🎓 Matric & Intermediate Karachi Board Crash Test Session Starting Soon. Register at campus office.",
    date: "Sep 2026",
    tag: "Board Exams",
    active: true
  }
];

export const INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: "reg-1",
    slipNumber: "UCC-2026-1082",
    studentName: "Muhammad Hamza",
    fatherName: "Abdul Rauf",
    dob: "2007-04-15",
    phone: "0312-8876543",
    whatsapp: "03128876543",
    email: "hamza.rauf@gmail.com",
    address: "Sector 1-E, Orangi Town, Karachi",
    program: "Intermediate (Commerce - I.Com)",
    course: "Special Class of A.I",
    previousQualification: "Matric Science (Karachi Board) - 82%",
    message: "Seeking admission in I.Com Part-1 evening batch along with AI certification.",
    status: "Confirmed",
    createdAt: "2026-09-15T10:30:00Z"
  },
  {
    id: "reg-2",
    slipNumber: "UCC-2026-1083",
    studentName: "Ayesha Siddiqua",
    fatherName: "Tariq Mahmood",
    dob: "2006-11-20",
    phone: "0333-2198765",
    whatsapp: "03332198765",
    email: "ayesha.tariq@outlook.com",
    address: "Mansoor Nagar, Near Rehmat Chowk, Orangi Town",
    program: "Short Courses",
    course: "Graphic Design",
    previousQualification: "Intermediate Arts",
    message: "Interested in morning batch for Adobe Photoshop and freelance gig optimization.",
    status: "Pending",
    createdAt: "2026-09-17T14:15:00Z"
  },
  {
    id: "reg-3",
    slipNumber: "UCC-2026-1084",
    studentName: "Zubair Ahmed",
    fatherName: "Nisar Ahmed",
    dob: "2005-08-05",
    phone: "0345-6677889",
    whatsapp: "03456677889",
    email: "zubair.nisar@gmail.com",
    address: "Sector 11-1/2, Orangi Town, Karachi",
    program: "Graduation (B.Com)",
    course: "Spoken English & IELTS",
    previousQualification: "I.Com (BIEK Karachi)",
    message: "Want evening classes after 6:00 PM due to job timings.",
    status: "Contacted",
    createdAt: "2026-09-18T09:45:00Z"
  }
];

export const TESTIMONIALS = [
  {
    quote: "Sir Arshad Siddiqui's accounting lectures made intermediate commerce crystal clear for me. I secured an A-1 grade in BIEK Karachi Board exams. The computer lab facilities are outstanding in Orangi Town.",
    author: "Danial Khan",
    batch: "Intermediate Commerce Batch (A-1 Grade)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "The Special Class of A.I and Graphic Design course completely changed my career path. Within 2 months, I started getting international client projects on Fiverr right from Karachi!",
    author: "Zainab Fatima",
    batch: "CIT & AI Course Graduate",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "From being scared to speak a single English sentence, the Spoken English & IELTS faculty trained me to achieve a 7.5 Band. Unique Commerce Centre delivers on every single promise.",
    author: "Bilal Farooqui",
    batch: "IELTS Band 7.5 Candidate",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  }
];
