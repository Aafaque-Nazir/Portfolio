import React, { Suspense, lazy, useEffect, useState } from "react";
import Home from "./pages/Home";
import SEO from "./components/SEO";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SectionDivider from "./components/SectionDivider";
import SmoothScroll from "./components/SmoothScroll";
import { useActiveSection } from "./hooks/useActiveSection";
import InitialLoader from "./components/InitialLoader";
import { motion } from "framer-motion";

const About = lazy(() => import("./pages/About"));
const Skills = lazy(() => import("./pages/Skills"));
const Project = lazy(() => import("./pages/Project"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));

/**
 * Detect if the current user agent is a search engine bot.
 * Googlebot, Bingbot, etc. should NEVER see the loader —
 * they need immediate access to DOM content for indexing.
 */
const isBot = () => {
  if (typeof navigator === "undefined") return true;
  return /Googlebot|Bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|Sogou|facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|TelegramBot|Applebot|AdsBot|Mediapartners/i.test(
    navigator.userAgent
  );
};

function App() {
  // Bots skip the loader entirely — they see content immediately
  const [isAppLoading, setIsAppLoading] = useState(!isBot());

  const sectionIds = [
    "home",
    "about",
    "skills",
    "projects",
    "services",
    "contact",
  ];
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    if (activeSection) {
      const titles = {
        home: "Aafaque Nazir — Web Developer in Navi Mumbai | React & Next.js Expert",
        about: "About Aafaque Nazir — Freelance Web Developer India",
        skills: "Technical Skills — React, Next.js, TypeScript, Node.js",
        projects: "Portfolio & Case Studies — Web Development Projects",
        services: "Web Development Services — Websites Starting ₹8,999",
        contact: "Hire a Web Developer — Contact Aafaque Nazir",
      };
      document.title = titles[activeSection] || "Aafaque Nazir — Web Developer in Navi Mumbai | React & Next.js Expert";
    }
  }, [activeSection]);

  return (
    <>
      {/* Loader is shown ONLY to real users, never to bots */}
      {isAppLoading && (
        <InitialLoader onComplete={() => setIsAppLoading(false)} />
      )}

      {/*
       * CRITICAL SEO FIX: Content is ALWAYS in the DOM.
       * For real users: hidden behind the loader via opacity.
       * For bots: immediately visible since isAppLoading = false.
       */}
      <motion.div
        initial={{ opacity: isAppLoading ? 0 : 1 }}
        animate={{ opacity: isAppLoading ? 0 : 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="relative min-h-screen overflow-x-hidden"
        style={{ pointerEvents: isAppLoading ? "none" : "auto" }}
      >
        <SEO section={activeSection || "home"} />
        <SmoothScroll />
        <Navbar />

        {/* Home is critical for LCP, keep it static */}
        <Home />
        <SectionDivider />

        <Suspense fallback={<div className="w-full flex items-center justify-center py-20 text-cyan-500/50 mix-blend-screen text-xs uppercase font-mono tracking-widest"><span className="animate-pulse">Loading core modules...</span></div>}>
          <About />
          <SectionDivider />

          <Skills />
          <SectionDivider />

          <Project />
          <SectionDivider />

          <Services />
          <SectionDivider />

          <Contact />
        </Suspense>

        <Footer />
      </motion.div>
    </>
  );
}

export default App;
