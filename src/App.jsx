import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SEO from "./components/SEO";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SmoothScroll from "./components/SmoothScroll";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
const About = lazy(() => import("./pages/About"));
const Skills = lazy(() => import("./pages/Skills"));
const Project = lazy(() => import("./pages/Project"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));

// Page Transition Wrapper
const PageWrapper = ({ children, sectionName }) => {
  return (
    <m.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {sectionName && <SEO section={sectionName} />}
      {children}
    </m.div>
  );
};

function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative min-h-screen overflow-x-hidden bg-black">
        <SmoothScroll />
        <Navbar />

        <main>
          <Suspense fallback={
            <div className="w-full min-h-screen flex items-center justify-center py-20 text-cyan-500/50 mix-blend-screen text-xs uppercase font-mono tracking-widest">
              <span className="animate-pulse">Loading...</span>
            </div>
          }>
            {/* AnimatePresence for Page Transitions — initial={false} skips cold-boot delay */}
            <AnimatePresence mode="wait" initial={false}>
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
                <PageWrapper>
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
      </div>
    </LazyMotion>
  );
}

export default App;
