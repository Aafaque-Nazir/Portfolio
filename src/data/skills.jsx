import React from "react";
import {
  SiReact, SiNextdotjs, SiJavascript, SiTailwindcss, SiFramer, SiGit,
  SiTypescript, SiNodedotjs, SiSupabase, SiPostgresql, SiMysql,
  SiMongodb, SiFirebase, SiGreensock, SiRedux, SiVercel, SiOpenai, SiExpress,
  SiRedis, SiPrisma, SiAppwrite, SiClaude, SiTurso
} from "react-icons/si";

const GeminiIcon = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M11.97 0c0 9.87-2.9 12.18-11.97 12 9.07-.18 11.97 2.13 11.97 12 0-9.87 2.9-12.18 11.97-12-9.07.18-11.97-2.13-11.97-12z" />
  </svg>
);

const ZustandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" height="1em" width="1em" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <text x="12" y="16" fontSize="12" fontWeight="bold" textAnchor="middle" fill="currentColor" stroke="none">Z</text>
  </svg>
);

const ConvexIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" height="1em" width="1em" aria-hidden="true">
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
    <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
  </svg>
);

const NoSQLIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" height="1em" width="1em" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m-8 4v10" />
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
  { icon: SiAppwrite, name: "Appwrite", color: "#F02E65", category: "Backend" },
  { icon: SiVercel, name: "Vercel", color: "#ffffff", category: "DevOps" },
  { icon: SiGit, name: "Git", color: "#F05032", category: "DevOps" },

  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1", category: "Database" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248", category: "Database" },
  { icon: SiMysql, name: "MySQL", color: "#4479A1", category: "Database" },
  { icon: SiRedis, name: "Redis", color: "#DC382D", category: "Database" },
  { icon: SiTurso, name: "Turso", color: "#4CFFA8", category: "Database" },
  { icon: NoSQLIcon, name: "NoSQL", color: "#00684A", category: "Database" },
  { icon: ConvexIcon, name: "Convex", color: "#FA6E4F", category: "Database" },
  { icon: SiPrisma, name: "Prisma", color: "#2D3748", category: "Database" },
  
  { icon: SiOpenai, name: "OpenAI", color: "#10a37f", category: "AI" },
  { icon: GeminiIcon, name: "Gemini", color: "#8E75B2", category: "AI" },
  { icon: SiClaude, name: "Claude", color: "#D97757", category: "AI" },
];
