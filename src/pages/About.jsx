import { motion } from "framer-motion";
import {
  SiReact,
  SiTailwindcss,
  SiFramer,
  SiGithub,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiRedux,
} from "react-icons/si";

const skills = [
  { icon: <SiReact />, name: "React" },
  { icon: <SiTailwindcss />, name: "Tailwind CSS" },
  { icon: <SiFramer />, name: "Framer Motion" },
  { icon: <SiGithub />, name: "GitHub" },
  { icon: <SiJavascript />, name: "JavaScript" },
  { icon: <SiHtml5 />, name: "HTML5" },
  { icon: <SiCss3 />, name: "CSS3" },
  { icon: <SiRedux />, name: "Redux" },
];

const About = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-16 py-20  text-white overflow-hidden"
    >
      <div className="max-w-5xl w-full mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-cyan-400 mb-4"
        >
          About Me
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-400 text-md md:text-lg max-w-3xl mx-auto leading-relaxed"
        >
          I’m a <span className="text-cyan-300 font-medium">Frontend Developer</span> based in Navi Mumbai.
          I specialize in building beautiful and responsive websites using
          <span className="text-cyan-300 font-medium"> React</span>,
          <span className="text-cyan-300 font-medium"> Tailwind CSS</span>, and
          <span className="text-cyan-300 font-medium"> Framer Motion</span>.
          I focus on clean code, smooth animations, and seamless user experiences.
        </motion.p>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-300"
        >
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08 }}
              className="bg-[#111827]/50 hover:bg-[#1e293b] backdrop-blur-sm rounded-xl px-4 py-5 flex flex-col items-center gap-2 shadow-md border border-gray-700 transition-all duration-300"
            >
              <span className="text-3xl text-cyan-400">{skill.icon}</span>
              <span className="text-base">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
