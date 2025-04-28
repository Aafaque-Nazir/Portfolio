import React from 'react';
import About from './pages/About';
import Skills from './pages/Skills';
import Project from './pages/Project';  
import Contact from './pages/Contact';
import TYP from './pages/TYP';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/thank-you" element={<TYP/>} />
        <Route path="/" element={<About/>} />
      </Routes>
      <Skills />  
      <Project />
      <Contact />

    </>
  );
}
export default App;
