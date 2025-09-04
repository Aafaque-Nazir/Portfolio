import About from './pages/About';
import Skills from './pages/Skills';
import Project from './pages/Project'; 
import Contact from './pages/Contact';
import Footer from './pages/Footer';
import Home from './pages/Home';
import Particles from './components/Particles';

function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
      {/* Particles Background - Full Page */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
      >
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={300}
          particleSpread={5}
          speed={0.1}
          particleBaseSize={60}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Home />
        <About />
        <Skills />
        <Project />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;