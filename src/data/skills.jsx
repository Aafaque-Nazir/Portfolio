import React from "react";
import {
  SiReact, SiNextdotjs, SiJavascript, SiTailwindcss, SiFramer, SiGit,
  SiTypescript, SiNodedotjs, SiSupabase, SiPostgresql, SiMysql,
  SiMongodb, SiFirebase, SiGreensock, SiRedux, SiVercel, SiOpenai
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const GeminiIcon = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.97 0c0 9.87-2.9 12.18-11.97 12 9.07-.18 11.97 2.13 11.97 12 0-9.87 2.9-12.18 11.97-12-9.07.18-11.97-2.13-11.97-12z" fill="#8E75B2" />
  </svg>
);

const AntigravityIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
    <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" fill="#FFD700" />
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
  { icon: SiNodedotjs, name: "Node.js", color: "#339933", category: "Backend" },
  { icon: SiSupabase, name: "Supabase", color: "#3ECF8E", category: "Backend" },
  { icon: SiFirebase, name: "Firebase", color: "#FFCA28", category: "Backend" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1", category: "Database" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248", category: "Database" },
  { icon: SiMysql, name: "MySQL", color: "#4479A1", category: "Database" },
  { icon: SiVercel, name: "Vercel", color: "#ffffff", category: "DevOps" },
  { icon: SiGit, name: "Git", color: "#F05032", category: "DevOps" },
  { icon: VscVscode, name: "VS Code", color: "#007ACC", category: "Tools" },
  { icon: SiOpenai, name: "OpenAI", color: "#10a37f", category: "AI" },
  { icon: GeminiIcon, name: "Gemini", color: "#8E75B2", category: "AI" },
  { icon: AntigravityIcon, name: "Antigravity", color: "#FFD700", category: "AI" },
];
