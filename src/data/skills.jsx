import React from "react";
import {
  SiReact, SiNextdotjs, SiJavascript, SiTailwindcss, SiFramer, SiGit,
  SiTypescript, SiNodedotjs, SiSupabase, SiPostgresql, SiMysql,
  SiMongodb, SiFirebase, SiGreensock, SiRedux, SiVercel, SiOpenai, SiExpress
} from "react-icons/si";

const GeminiIcon = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.97 0c0 9.87-2.9 12.18-11.97 12 9.07-.18 11.97 2.13 11.97 12 0-9.87 2.9-12.18 11.97-12-9.07.18-11.97-2.13-11.97-12z" />
  </svg>
);

const ClaudeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5c-2.48 0-4.5-2.02-4.5-4.5S8.52 7.5 11 7.5c1.17 0 2.23.45 3.03 1.18l-1.32 1.39C12.27 9.61 11.66 9.3 11 9.3c-1.49 0-2.7 1.21-2.7 2.7s1.21 2.7 2.7 2.7c1.1 0 2.05-.66 2.47-1.6h-2.47v-1.7h4.31c.06.3.1.61.1.94 0 2.5-1.68 4.66-4.41 4.66z" />
  </svg>
);

const ZustandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" height="1em" width="1em">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <text x="12" y="16" fontSize="12" fontWeight="bold" textAnchor="middle" fill="currentColor" stroke="none">Z</text>
  </svg>
);

export const allSkills = [
  { icon: SiReact, name: "React", color: "#61DAFB", category: "Frontend" },
  { icon: SiNextdotjs, name: "Next.js", color: "#ffffff", category: "Frontend" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6", category: "Frontend" },
  { icon: SiJavascript, name: "JavaScript", color: "#F0DB4F", category: "Frontend" },
  { icon: SiTailwindcss, name: "Tailwind CSS", color: "#06B6D4", category: "Frontend" },
  { icon: SiFramer, name: "Framer Motion", color: "#ffffff", category: "Frontend" },
  { icon: SiGreensock, name: "GSAP", color: "#88CE02", category: "Frontend" },
  { icon: SiRedux, name: "Redux", color: "#764ABC", category: "Frontend" },
  { icon: ZustandIcon, name: "Zustand", color: "#45322E", category: "Frontend" },
  
  { icon: SiNodedotjs, name: "Node.js", color: "#339933", category: "Backend" },
  { icon: SiExpress, name: "Express.js", color: "#ffffff", category: "Backend" },
  { icon: SiSupabase, name: "Supabase", color: "#3ECF8E", category: "Backend" },
  { icon: SiFirebase, name: "Firebase", color: "#FFCA28", category: "Backend" },
  { icon: SiVercel, name: "Vercel", color: "#ffffff", category: "DevOps" },
  { icon: SiGit, name: "Git", color: "#F05032", category: "DevOps" },

  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1", category: "Database" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248", category: "Database" },
  { icon: SiMysql, name: "MySQL", color: "#4479A1", category: "Database" },
  
  { icon: SiOpenai, name: "OpenAI", color: "#10a37f", category: "AI" },
  { icon: GeminiIcon, name: "Gemini", color: "#8E75B2", category: "AI" },
  { icon: ClaudeIcon, name: "Claude", color: "#D19A66", category: "AI" },
];
