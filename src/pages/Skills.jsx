"use client";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTailwindcss,
  SiFramer,
  SiGit,
  SiTypescript,
  SiNodedotjs,
  SiSupabase,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiFirebase,
  SiHtml5,
  SiCss3,
  SiVite,
  SiGreensock,
  SiRedux,
  SiVercel,
  SiPostman,
  SiDocker,
  SiPrisma,
  SiGraphql,
  SiFigma,
  SiOpenai,
  // SiGoogle, // Replaced with custom SVG for Gemini
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaRobot } from "react-icons/fa";
import { RiBrainLine, RiCursorFill } from "react-icons/ri"; // Cursor icon proxy

const GeminiIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.97 0c0 9.87-2.9 12.18-11.97 12 9.07-.18 11.97 2.13 11.97 12 0-9.87 2.9-12.18 11.97-12-9.07.18-11.97-2.13-11.97-12z"
      fill="#8E75B2"
    />
  </svg> // Simplified Sparkle for Gemini
);

const AntigravityIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
    <path
      d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"
      fill="#FFD700"
    />
  </svg> // Abstract geometric shape for Antigravity
);

const techCategories = [
  {
    title: "Frontend Engineering",
    skills: [
      { icon: SiReact, name: "React", color: "#61DAFB", category: "Lib" },
      {
        icon: SiNextdotjs,
        name: "Next.js",
        color: "#ffffff",
        category: "Framework",
      },
      {
        icon: SiJavascript,
        name: "JavaScript",
        color: "#F0DB4F",
        category: "Core",
      },
      {
        icon: SiTypescript,
        name: "TypeScript",
        color: "#3178C6",
        category: "Language",
      },
      {
        icon: SiTailwindcss,
        name: "Tailwind",
        color: "#06B6D4",
        category: "Style",
      },
      { icon: SiFramer, name: "Motion", color: "#0055FF", category: "Anim" },
      { icon: SiGreensock, name: "GSAP", color: "#88CE02", category: "Anim" },
      { icon: SiRedux, name: "Redux", color: "#764ABC", category: "State" },
    ],
  },
  {
    title: "Backend & Architectures",
    skills: [
      {
        icon: SiNodedotjs,
        name: "Node.js",
        color: "#339933",
        category: "Runtime",
      },
      { icon: SiMongodb, name: "MongoDB", color: "#47A248", category: "NoSQL" },
      {
        icon: SiPostgresql,
        name: "PostgreSQL",
        color: "#4169E1",
        category: "SQL",
      },
      { icon: SiMysql, name: "MySQL", color: "#4479A1", category: "SQL" },
      {
        icon: SiSupabase,
        name: "Supabase",
        color: "#3ECF8E",
        category: "BaaS",
      },
      {
        icon: SiFirebase,
        name: "Firebase",
        color: "#FFCA28",
        category: "BaaS",
      },
      { icon: SiPrisma, name: "Prisma", color: "#2D3748", category: "ORM" },
      { icon: SiGraphql, name: "GraphQL", color: "#E10098", category: "API" },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { icon: SiGit, name: "Git", color: "#F05032", category: "Version" },
      { icon: VscVscode, name: "VS Code", color: "#007ACC", category: "IDE" },
      { icon: SiVercel, name: "Vercel", color: "#ffffff", category: "Deploy" },
      { icon: SiVite, name: "Vite", color: "#646CFF", category: "Build" },
      { icon: SiPostman, name: "Postman", color: "#FF6C37", category: "Test" },
      { icon: SiFigma, name: "Figma", color: "#F24E1E", category: "Design" },
    ],
  },
  {
    title: "Artificial Intelligence",
    skills: [
      {
        icon: AntigravityIcon,
        name: "Antigravity",
        color: "#FFD700",
        category: "Agent",
      },
      { icon: GeminiIcon, name: "Gemini", color: "#8E75B2", category: "LLM" },
      { icon: SiOpenai, name: "OpenAI", color: "#412991", category: "Model" },
      {
        icon: RiBrainLine,
        name: "ChatGPT",
        color: "#10A37F",
        category: "Chat",
      },
      {
        icon: RiCursorFill,
        name: "Cursor",
        color: "#ffffff",
        category: "Editor",
      },
      { icon: SiGit, name: "Copilot", color: "#F05032", category: "Assistant" },
      { icon: SiVercel, name: "v0.dev", color: "#ffffff", category: "GenUI" },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function TechStack() {
  return (
    <section
      id="techstack"
      className="relative w-full py-12 px-4 flex flex-col justify-center items-center text-white overflow-hidden" // Reduced padding
      aria-label="Technologies I work with"
    >
      {/* 🔮 Background Glow */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* 🧠 Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent tracking-tight">
          TECH ARSENAL
        </h2>
        <p className="text-gray-400 text-sm md:text-base font-mono tracking-widest uppercase">
          // production_ready_systems
        </p>
      </motion.div>

      {/* Categories Loop */}
      <div className="w-full max-w-6xl space-y-8 relative z-10">
        {techCategories.map((cat, catIndex) => (
          <div key={catIndex}>
            {/* Category Title */}
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-white mb-8 border-l-4 border-cyan-500 pl-4 flex items-center gap-3"
            >
              {cat.title}
              <div className="h-[1px] flex-grow bg-gradient-to-r from-cyan-900/50 to-transparent ml-4"></div>
            </motion.h3>

            {/* Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
            >
              {cat.skills.map((tech, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative"
                >
                  {/* Glass Card */}
                  <div className="relative bg-slate-900/30 backdrop-blur-md border border-white/5 rounded-2xl p-4 flex flex-col items-center gap-3 transition-all duration-300 hover:bg-slate-800/50 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] group-hover:-translate-y-1 overflow-hidden h-full justify-center">
                    {/* Hover Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                    {/* Tech Icon */}
                    <div className="relative w-10 h-10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                      <tech.icon style={{ color: tech.color }} />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col items-center">
                      <span className="text-white font-bold tracking-wide text-sm group-hover:text-cyan-300 transition-colors">
                        {tech.name}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono uppercase group-hover:text-cyan-400/70">
                        {tech.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Footer Line REMOVED */}
    </section>
  );
}
