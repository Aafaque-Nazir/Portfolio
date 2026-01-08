import About from './pages/About';
import Skills from './pages/Skills';
import Project from './pages/Project';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Home from './pages/Home';


function App() {
  return (
    <div className="relative min-h-screen">


      {/* Pages Content */}
      <Home />
      <About />
      <Skills />
      <Project />
      <Services />
      <Contact />
    </div>
  );
}

export default App;
