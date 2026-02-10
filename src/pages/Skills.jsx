"use client";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
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
  { icon: SiNextdotjs, name: "Next.js", color: "#ffffff", category: "Frontend" },
  { icon: SiJavascript, name: "JavaScript", color: "#F0DB4F", category: "Core" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6", category: "Core" },
  { icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4", category: "Frontend" },
  { icon: SiFramer, name: "Framer Motion", color: "#0055FF", category: "Frontend" },
  { icon: SiGreensock, name: "GSAP", color: "#88CE02", category: "Frontend" },
  { icon: SiRedux, name: "Redux", color: "#764ABC", category: "State" },

  // Backend & DB
  { icon: SiNodedotjs, name: "Node.js", color: "#339933", category: "Backend" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248", category: "Database" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1", category: "Database" },
  { icon: SiMysql, name: "MySQL", color: "#4479A1", category: "Database" },
  { icon: SiSupabase, name: "Supabase", color: "#3ECF8E", category: "Backend" },
  { icon: SiFirebase, name: "Firebase", color: "#FFCA28", category: "Backend" },

  // Tools
  { icon: SiGit, name: "Git", color: "#F05032", category: "Tools" },
  { icon: VscVscode, name: "VS Code", color: "#007ACC", category: "Tools" },
  { icon: SiVercel, name: "Vercel", color: "#ffffff", category: "DevOps" },
  { icon: SiDocker, name: "Docker", color: "#2496ED", category: "DevOps" },
  { icon: SiFigma, name: "Figma", color: "#F24E1E", category: "Design" },

  // AI
  { icon: AntigravityIcon, name: "Antigravity", color: "#FFD700", category: "AI" },
  { icon: GeminiIcon, name: "Gemini", color: "#8E75B2", category: "AI" },
  { icon: SiOpenai, name: "OpenAI", color: "#412991", category: "AI" },
];

const TechCard = ({ tech, index }) => {
  const ref = useRef(null);

  // Mouse position logic for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.02 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white/5 border border-white/10 cursor-pointer perspective-1000"
    >
      {/* Reduced Glow for Performance */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${tech.color}20, transparent 70%)`,
        }}
      />

      {/* Floating Animation Wrapper - Optimized */}
      <motion.div
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 3 + Math.random() * 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 2,
        }}
        className="relative h-full w-full flex flex-col items-center justify-center gap-1 transform-style-3d"
      >
        {/* Icon */}
        <div
          className="text-2xl md:text-3xl transition-transform duration-300 group-hover:scale-110"
          style={{
            color: tech.color,
            filter: "drop-shadow(0 0 5px rgba(0,0,0,0.3))"
          }}
        >
          <tech.icon />
        </div>

        {/* Name Label */}
        <span
          className="text-[8px] md:text-[10px] font-bold tracking-wider opacity-60 group-hover:opacity-100 transition-opacity duration-300 group-hover:text-white"
        >
          {tech.name}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default function TechStack() {
  return (
    <section
      id="techstack" // Corrected ID for navigation
      className="relative w-full h-screen min-h-[600px] flex flex-col justify-center items-center text-white overflow-hidden py-0"
    >
      {/* 🧠 Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-8 md:mb-12 relative z-10"
      >
        <span className="text-cyan-400 font-mono text-xs tracking-[0.2em] mb-2 uppercase block">
           // THE_STACK
        </span>
        <h2 className="text-3xl md:text-5xl font-black mb-2 tracking-tighter">
          TECH{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            ARSENAL
          </span>
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto text-xs md:text-sm">
          My preferred weapons of choice for building scalable apps.
        </p>
      </motion.div>

      {/* Grid Container */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto relative z-10 px-4 content-center">
        {allSkills.map((tech, index) => (
          <TechCard key={index} tech={tech} index={index} />
        ))}
      </div>
    </section>
  );
}
