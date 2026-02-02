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
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { RiBrainLine, RiCursorFill } from "react-icons/ri";

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
  </svg>
);

const AntigravityIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
    <path
      d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"
      fill="#FFD700"
    />
  </svg>
);

const allSkills = [
  // Frontend
  { icon: SiReact, name: "React", color: "#61DAFB", category: "Frontend" },
  {
    icon: SiNextdotjs,
    name: "Next.js",
    color: "#ffffff",
    category: "Frontend",
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
    category: "Core",
  },
  {
    icon: SiTailwindcss,
    name: "Tailwind",
    color: "#06B6D4",
    category: "Frontend",
  },
  { icon: SiFramer, name: "Motion", color: "#0055FF", category: "Frontend" },
  { icon: SiGreensock, name: "GSAP", color: "#88CE02", category: "Frontend" },
  { icon: SiRedux, name: "Redux", color: "#764ABC", category: "Frontend" },

  // Backend & DB
  { icon: SiNodedotjs, name: "Node.js", color: "#339933", category: "Backend" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248", category: "Database" },
  {
    icon: SiPostgresql,
    name: "PostgreSQL",
    color: "#4169E1",
    category: "Database",
  },
  { icon: SiMysql, name: "MySQL", color: "#4479A1", category: "Database" },
  { icon: SiSupabase, name: "Supabase", color: "#3ECF8E", category: "Backend" },
  { icon: SiFirebase, name: "Firebase", color: "#FFCA28", category: "Backend" },
  { icon: SiPrisma, name: "Prisma", color: "#2D3748", category: "Backend" },
  { icon: SiGraphql, name: "GraphQL", color: "#E10098", category: "Backend" },

  // Tools & DevOps
  { icon: SiGit, name: "Git", color: "#F05032", category: "Tools" },
  { icon: VscVscode, name: "VS Code", color: "#007ACC", category: "Tools" },
  { icon: SiVercel, name: "Vercel", color: "#ffffff", category: "DevOps" },
  { icon: SiVite, name: "Vite", color: "#646CFF", category: "Tools" },
  { icon: SiPostman, name: "Postman", color: "#FF6C37", category: "Tools" },
  { icon: SiFigma, name: "Figma", color: "#F24E1E", category: "Design" },

  // AI & New Tech
  {
    icon: AntigravityIcon,
    name: "Antigravity",
    color: "#FFD700",
    category: "AI",
  },
  { icon: GeminiIcon, name: "Gemini", color: "#8E75B2", category: "AI" },
  { icon: SiOpenai, name: "OpenAI", color: "#412991", category: "AI" },
  { icon: RiBrainLine, name: "ChatGPT", color: "#10A37F", category: "AI" },
  { icon: RiCursorFill, name: "Cursor", color: "#ffffff", category: "Tools" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

export default function TechStack() {
  return (
    <section
      id="techstack"
      className="relative w-full py-20 px-4 flex flex-col justify-center items-center text-white overflow-hidden"
    >
      {/* 🔮 Background Glow */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-900/10 rounded-[100%] blur-[100px] pointer-events-none" />

      {/* 🧠 Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12 relative z-10"
      >
        <span className="text-cyan-400 font-mono text-sm tracking-[0.2em] mb-3 uppercase block">
          // THE_STACK
        </span>
        <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
          TECH{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
            ARSENAL
          </span>
        </h2>
      </motion.div>

      {/* Compact Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto relative z-10 px-2"
      >
        {allSkills.map((tech, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative"
          >
            {/* Tooltip (only visible on hover) */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
              <div className="bg-slate-900 text-white text-xs font-bold py-1 px-3 rounded-lg border border-white/10 shadow-xl whitespace-nowrap">
                {tech.name}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-b border-r border-white/10"></div>
              </div>
            </div>

            {/* Icon Card */}
            <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl flex items-center justify-center text-2xl md:text-3xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:bg-slate-800/60 group-hover:border-white/20 shadow-lg hover:shadow-cyan-500/20">
              <tech.icon
                style={{ color: tech.color }}
                className="opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 rounded-2xl bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
