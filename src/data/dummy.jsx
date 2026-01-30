const dummy = {
  firstName: "James",
  lastName: "Carter",
  jobTitle: "Full Stack Developer",
  address: "525 N Tryon Street, NC 28117",
  phone: "1234567890",
  email: "example@gmail.com",
  themeColor: "#ff6666",

  summary:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

  experience: [
    {
      id: 1,
      title: "Full Stack Developer",
      companyName: "Amazon",
      city: "New York",
      state: "NY",
      startDate: "Jan 2021",
      endDate: "",
      currentlyWorking: true,
      workSummary:
        "Designed, developed, and maintained full-stack web applications.\n" +
        "• Implemented responsive user interfaces with React for various devices and browsers.\n" +
        "• Maintained React Native in-house organization apps.\n" +
        "• Created RESTful APIs with Node.js and Express, facilitating communication between front-end and back-end systems."
    },

    {
      id: 2,
      title: "Full Stack Developer",
      companyName: "Amazon",
      city: "New York",
      state: "NY",
      startDate: "Jan 2021",
      endDate: "",
      currentlyWorking: true,
      workSummary:
        "Designed, developed, and maintained full-stack web applications.\n" +
        "• Implemented responsive user interfaces with React for various devices and browsers.\n" +
        "• Maintained React Native in-house organization apps.\n" +
        "• Created RESTful APIs with Node.js and Express, facilitating communication between front-end and back-end systems."
    }
  ],

  education: [
    {
      id:1,
      degree: "Bachelor of Technology",
      stream: "Computer Science Engineering",
      institute: "JIS University",
      city: "Kolkata",
      state: "West Bengal",
      year: "2026",
      score: "8.89 CGPA"
    },
    {
      id:2,
      degree: "Higher Secondary",
      stream: "Science",
      institute: "Purwanchal Vidya Mandir",
      city: "Kolkata",
      state: "West Bengal",
      year: "2022",
      score: "89.5%"
    }
  ],


  /* ✅ PROJECTS (added like image) */
  projects: [
    {
      id: 1,
      title: "AI Powered Code Reviewer",
      techStack: ["React", "Supabase", "Tailwind CSS", "Gemini API",  "n8n"],
      description: [
        "Built and maintained an AI-powered platform capable of analyzing user-submitted code, identifying formatting, syntax, and runtime errors by integrating Gemini API with a React and Tailwind CSS user interface.",
        "Assess code submissions in multiple programming languages, highlighting formatting and runtime errors and generating possible solutions.",
        "Implemented AI functionalities enabling users to automatically identify, review, and resolve formatting, syntax, and runtime errors in code submissions.",
        "Implemented a customizable chatbot feature leveraging React and Gemini API to address user queries in real time, enhancing support capabilities."
      ]
    },
    {
      id: 2,
      title: "URL Shortener",
      description: [
        "Developed a platform to transform extended URLs into concise links utilizing web development technologies.",
        "Implemented QR code creation tied to shortened links, improving accessibility.",
        "Enabled QR code and short URL download and deletion features.",
        "Implemented analytics tracking for clicks, locations, and devices."
      ]
    }
  ],

  /* ✅ CERTIFICATIONS (added like image) */
  certifications: [
    {
      id: 1,
      name: "Full-Stack Web Developer (React, Node, Express, MongoDB)",
      organization: "Ardent Computech Pvt. Ltd.",
      year: "2025"
    },
    {
      id: 2,
      name: "Front End Web Developer Certification",
      organization: "Infosys",
      year: "2025"
    },
    {
      id: 3,
      name: "Programming in Java",
      organization: "NPTEL",
      year: "2025"
    },
    {
      id: 4,
      name: "Python with Django",
      organization: "MTA Learning Private",
      year: "2024"
    }
  ],

  /* ✅ SKILLS (restructured like image) */
  skills: [
  {
    id: 1,
    category: "Programming",
    items: ["Java", "JavaScript (ES6+)"]
  },
  {
    id: 2,
    category: "Frontend",
    items: ["HTML", "CSS", "React.js", "Tailwind CSS", "Redux", "Shadcn UI"]
  },
  {
    id: 3,
    category: "Backend",
    items: ["Node.js", "Express.js", "REST API"]
  },
  {
    id: 4,
    category: "Database",
    items: ["Supabase", "SQL", "MongoDB", "MySQL", "NeonDB"]
  },
  {
    id: 5,
    category: "API and Automation Tool",
    items: ["Open API", "Gemini API", "Postman (Testing)", "n8n"]
  },
  {
    id: 6,
    category: "DevOps",
    items: ["Docker", "Docker Compose"]
  },
  {
    id: 7,
    category: "Version Control and Deployment",
    items: ["Git", "GitHub", "Vercel"]
  }
]

};

export default dummy;
