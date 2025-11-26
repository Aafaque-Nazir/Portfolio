import About from './pages/About';
import Skills from './pages/Skills';
import Project from './pages/Project'; 
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
      <Contact />
    </div>
  );
}

export default App;
