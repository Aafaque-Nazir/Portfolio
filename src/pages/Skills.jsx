// components/Logos.jsx
import LogoLoop from '../components/Logos'; // assuming this is your custom marquee
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTailwindcss,
  SiFramer,
  SiGithub,
  SiGit,
} from 'react-icons/si';

const techLogos = [
  { node: <SiReact style={{ color: '#61DAFB' }} />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs style={{ color: '#ffffff' }} />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiJavascript style={{ color: '#F0DB4F' }} />, title: "JavaScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss style={{ color: '#06B6D4' }} />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiFramer style={{ color: '#0055FF' }} />, title: "Framer Motion", href: "https://www.framer.com/motion/" },
  { node: <SiGithub style={{ color: '#ffffff' }} />, title: "GitHub", href: "https://github.com" },
  { node: <SiGit style={{ color: '#F1502F' }} />, title: "Git", href: "https://git-scm.com" },
];

export default function TechStack() {
  return (
    <div style={{ height: '80px', position: 'relative', overflow: 'hidden' }}>
      <LogoLoop
        logos={techLogos}
        speed={60}
        direction="left"
        logoHeight={50}
        gap={50}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#000000"
        ariaLabel="Technologies I work with"
      />
    </div>
  );
}