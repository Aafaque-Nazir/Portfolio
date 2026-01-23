import About from "./pages/About";
import Skills from "./pages/Skills";
import Project from "./pages/Project";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import GlobalBackground from "./components/GlobalBackground";

import SectionDivider from "./components/SectionDivider";

function App() {
  return (
    <div className="relative min-h-screen">
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
