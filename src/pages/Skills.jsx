import React from 'react'
import Logos from '../components/Logos'

function Skills() {
    const skills = [
        { name: "HTML", level: "90%" },
        { name: "CSS", level: "85%" },
        { name: "JavaScript", level: "80%" },
        { name: "React.js", level: "80%" },
        { name: "TailwindCSS", level: "90%" },
        { name: "Framer Motion", level: "50%" },
        { name: "Node.js", level: "70%" },
      ];
      return (
        <>
        <Logos />
        <section id='skills' className="py-12 text-white">
          <h2 className="text-3xl font-bold text-center mb-6">My Skills</h2>
          <div className="max-w-4xl mx-auto px-6">
            {skills.map((skill, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>{skill.name}</span>
                  <span>{skill.level}</span>
                </div>
                <div className="max-w-4xl bg-gray-700 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full" style={{ width: skill.level }}></div>
                </div>  
              </div>
            ))}
          </div>
        </section>
        </>
      );
    };

export default Skills
