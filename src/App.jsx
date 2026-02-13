import About from "./pages/About";
import Skills from "./pages/Skills";
import Project from "./pages/Project";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar"; // Ensure Navbar is imported if used
import GlobalBackground from "./components/GlobalBackground";
import SectionDivider from "./components/SectionDivider";
import { useActiveSection } from "./hooks/useActiveSection"; // Import hook
import { useEffect } from "react";

import SmoothScroll from "./components/SmoothScroll"; // Import SmoothScroll

function App() {
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
    <div className="relative min-h-screen">
      <SmoothScroll /> {/* Activate Smooth Scroll */}
      <Navbar /> {/* Ensure Navbar is present if it wasn't before */}
      {/* Pages Content */}
      <Home />
      <SectionDivider />
      <About />
      <SectionDivider />
      {/* Tech Stack (Skills) */}
      <Skills />
      <SectionDivider />
      {/* Projects */}
      <Project />
      <SectionDivider />
      {/* Services */}
      <Services />
      <SectionDivider />
      {/* Contact */}
      <Contact />
      <SectionDivider />
      <Footer />
    </div>
  );
}

export default App;
