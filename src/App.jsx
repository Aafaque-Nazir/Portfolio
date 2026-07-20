import React, { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SEO from "./components/SEO";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SmoothScroll from "./components/SmoothScroll";
import InitialLoader from "./components/InitialLoader";
import CustomCursor from "./components/ui/CustomCursor";
import { motion, AnimatePresence } from "framer-motion";

const About = lazy(() => import("./pages/About"));
const Skills = lazy(() => import("./pages/Skills"));
const Project = lazy(() => import("./pages/Project"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));

const isBot = () => {
  if (typeof navigator === "undefined") return true;
  return /Googlebot|Bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|Sogou|facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|TelegramBot|Applebot|AdsBot|Mediapartners|Lighthouse|Chrome-Lighthouse|PageSpeed/i.test(
    navigator.userAgent
  );
};

// Page Transition Wrapper
const PageWrapper = ({ children, sectionName }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <SEO section={sectionName} />
      {children}
    </motion.div>
  );
};

function App() {
  const [isAppLoading, setIsAppLoading] = useState(!isBot());
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {isAppLoading && (
        <InitialLoader onComplete={() => setIsAppLoading(false)} />
      )}

      <motion.div
        initial={{ opacity: isAppLoading ? 0 : 1 }}
        animate={{ opacity: isAppLoading ? 0 : 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="relative min-h-screen overflow-x-hidden bg-black"
        style={{ pointerEvents: isAppLoading ? "none" : "auto" }}
      >
        <CustomCursor />
        <SmoothScroll />
        <Navbar />

        <main>
        <Suspense fallback={
          <div className="w-full min-h-screen flex items-center justify-center py-20 text-cyan-500/50 mix-blend-screen text-xs uppercase font-mono tracking-widest">
            <span className="animate-pulse">Loading...</span>
          </div>
        }>
          {/* AnimatePresence for Page Transitions */}
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper sectionName="home"><Home /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper sectionName="about"><About /></PageWrapper>} />
              <Route path="/skills" element={<PageWrapper sectionName="skills"><Skills /></PageWrapper>} />
              <Route path="/projects" element={
                <PageWrapper sectionName="projects">
                  <Project />
                </PageWrapper>
              } />
              <Route path="/projects/:id" element={
                <PageWrapper sectionName="projects">
                  <ProjectDetails />
                </PageWrapper>
              } />
              <Route path="/services" element={<PageWrapper sectionName="services"><Services /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper sectionName="contact"><Contact /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
        </main>

        <Footer />
      </motion.div>
    </>
  );
}

export default App;
