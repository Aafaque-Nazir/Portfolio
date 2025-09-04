import React from 'react';
import Logos from '../components/Logos';
import { motion } from "framer-motion";
import { RiNextjsFill } from "react-icons/ri";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
} from "react-icons/fa";
import { SiTailwindcss, SiFramer } from "react-icons/si";

const skills = [
  { name: "HTML", level: "90%", icon: <FaHtml5 className="text-orange-500" /> },
  { name: "CSS", level: "85%", icon: <FaCss3Alt className="text-blue-500" /> },
  { name: "JavaScript", level: "80%", icon: <FaJs className="text-yellow-400" /> },
  { name: "React.js", level: "80%", icon: <FaReact className="text-cyan-400" /> },
  { name: "TailwindCSS", level: "90%", icon: <SiTailwindcss className="text-sky-400" /> },
  { name: "Framer Motion", level: "60%", icon: <SiFramer className="text-pink-400" /> },
  { name: "Next.Js", level: "80%", icon: <RiNextjsFill className="text-black" /> },
];

function Skills() {
  return (
    <>
      <Logos />
      <section id='skills' className=" py-16 px-6 text-white">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-cyan-400"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Skills
        </motion.h2>

        <div className="max-w-4xl mx-auto grid gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-lg font-medium">
                  <span className="text-xl">{skill.icon}</span>
                  <span>{skill.name}</span>
                </div>
                <span className="text-sm text-gray-300">{skill.level}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 via-teal-400 to-cyan-400 h-2 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: skill.level }}
                  transition={{ duration: 1.2, delay: index * 0.2 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Skills;
