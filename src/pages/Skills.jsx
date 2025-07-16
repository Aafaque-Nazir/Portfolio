import React from 'react'
import Logos from '../components/Logos'
import { motion } from "framer-motion";

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
        <section id='skills' className="  py-12 text-white">
          <motion.h2 className="text-3xl font-bold text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>My Skills</motion.h2>
          <div className="max-w-4xl mx-auto px-6">
            {skills.map((skill, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>{skill.name}</span>
                  <span>{skill.level}</span>
                </div>
                <div className="max-w-4xl bg-gray-700 rounded-full h-3">
                  <motion.div className="bg-gradient-to-r to-cyan-400 via-teal-400 from-blue-600 h-3 rounded-full"
                   initial={{ width: 0 }}
  whileInView={{ width: skill.level }}
  viewport={{ once: true }}
  transition={{ duration: 1.4, delay: index * 0.2 }}>

   </motion.div>
                </div>  
              </div>
            ))}
          </div>
        </section>
        </>
      );
    };

export default Skills
