// sections/About.jsx
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTailwindcss,
} from "react-icons/si";

const skills = [
  { icon: <SiReact title="React" />, name: "React", color: "#61DAFB" },
  { icon: <SiNextdotjs title="Next.js" />, name: "Next.js", color: "#ffffff" },
  { icon: <SiJavascript title="JavaScript" />, name: "JavaScript", color: "#F0DB4F" },
  { icon: <SiTailwindcss title="Tailwind CSS" />, name: "Tailwind CSS", color: "#06B6D4" },
];

const About = () => {
  return (
    <section
      id="about"
      className="w-full min-h-screen flex flex-col justify-center items-center px-6 text-white "
      aria-labelledby="about-heading"
    >
      <div className="max-w-5xl w-full mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold text-cyan-400 mb-6"
          id="about-heading"
        >
          About Me
        </motion.h2>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-300 text-md md:text-lg max-w-3xl mx-auto leading-relaxed"
        >
          I’m a <span className="text-cyan-300 font-semibold">Frontend Developer</span> based in Navi Mumbai.
          I specialize in building beautiful and responsive websites using
          <span className="text-cyan-300 font-semibold"> React</span>,
          <span className="text-cyan-300 font-semibold"> Tailwind CSS</span>, and
          <span className="text-cyan-300 font-semibold"> Framer Motion</span>.
          I focus on clean code, smooth animations, and seamless user experiences.
          <br />
          <br />
          <span className="text-sm italic text-gray-500">
            Every pixel is intentional. Every interaction tells a story.
          </span>
        </motion.p>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          role="list"
          aria-label="Technologies I work with"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-[#1e293b]/50 hover:bg-[#334155] backdrop-blur-sm rounded-xl px-6 py-6 flex flex-col items-center gap-3 shadow-lg border border-gray-700 transition-all duration-300"
              role="listitem"
            >
              <span
                className="text-4xl"
                style={{ color: skill.color }}
                aria-hidden="true"
              >
                {skill.icon}
              </span>
              <span className="text-base font-medium text-gray-200">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
