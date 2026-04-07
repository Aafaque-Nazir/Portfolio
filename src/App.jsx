import React, { Suspense, lazy, useEffect, useState } from "react";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import GlobalBackground from "./components/GlobalBackground";
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

function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);

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
        home: "Home | Aafaque Nazir",
        about: "About | Aafaque Nazir",
        skills: "Skills | Aafaque Nazir",
        projects: "Projects | Aafaque Nazir",
        services: "Services | Aafaque Nazir",
        contact: "Contact | Aafaque Nazir",
      };
      document.title = titles[activeSection] || "Aafaque Nazir | Portfolio";
    }
  }, [activeSection]);

  return (
    <>
      {isAppLoading ? (
        <InitialLoader onComplete={() => setIsAppLoading(false)} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="relative min-h-screen overflow-x-hidden"
        >
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
            <SectionDivider />
          </Suspense>

          <Footer />
        </motion.div>
      )}
    </>
  );
}

export default App;
