import React from "react";
const projects = [
  {
    title: "BlogPostApp",
    description: "BlogPost App is a minimalist blogging platform designed for users to create and manage blog posts effortlessly. ",
    image: "/your-featured-project-image.png",
    link: " ",
    featured: true,
    tech: ["React","Redux", "Tailwind", "AppWrite"],
  },
  {
    title: "LandingPages Folder",
    description: "ToolyMon is an all-in-one platform that brings together multiple Landing Pages in one place.",
    image: "/your-featured-project-image.png",
    link: "https://lpfolder.netlify.app/",
    target: "_blank",
    featured: true,
    tech: ["React", "TailwindCSS"],
  },
  {
    title: "Toolymon",
    description: "ToolyMon is an all-in-one platform that brings together multiple useful online tools in one place.",
    image: "/your-featured-project-image.png",
    link: "https://toolymon.netlify.app/",
    target: "_blank",
    featured: true,
    tech: ["React", "TailwindCSS"],
  },
  {
    title: "Tasky - Todo App",
    description: "The Tasky Todo List website is a simple and efficient to-do list application designed to help users manage and track their tasks.",
    image: "/project1.png",
    link: "https://tasky-todolist.netlify.app/",
    target: "_blank",
    tech: ["React" , "TailwindCSS"],
  },
  {
    title: "Random Password Generator",
    description: "The Password Randoms website provides a simple and user-friendly tool for generating random passwords.",
    image: "/project2.png",
    link: "https://password-randoms.netlify.app/",
    target: "_blank",
    tech: ["React" , "TailwindCSS"],
  },
  {
    title: "PassMan - Password Manager",
    description: "The PassMan Password Manager is a web application designed to securely store and manage passwords.",
    image: "/project3.png",
    target: "_blank",
    link: "https://passman-passwordmanager.netlify.app/",
    tech: ["React" , "TailwindCSS"],
  },
  {
    title: "Currency Converter",
    description: "The website Currency Converter offers a simple and Real time efficient tool to convert currencies between different nations.",
    image: "/project3.png",
    target: "_blank",
    link: "https://currenccyconnvverter.netlify.app/",
    tech: ["React", "TailwindCSS"],
  },
];

const Project = () => {
  return (
    <section id="projects" className="py-16 px-6 text-white">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Featured Project */}
        <div className="flex flex-col md:flex-row   items-center gap-8 bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/20">

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{projects[0].title}</h2>
            <p className="text-gray-300 mb-6">{projects[0].description}</p>
            <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
              {projects[0].tech.map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-cyan-400/20 text-cyan-300 text-xs rounded-full">{tech}</span>
              ))}
            </div>
            <a href={projects[0].link} className="inline-block px-6 py-3 bg-cyan-400 text-white font-semibold rounded-full hover:bg-cyan-500 transition">
              View Project
            </a>
          </div>
        </div>
       

        {/* Mini Projects */}
        <div className="grid gap-8 md:grid-cols-3">
          {projects.slice(1).map((project, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 hover:scale-105 transition-transform duration-300 flex flex-col">

              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, idx) => (
                  <span key={idx} className="px-2 py-1 bg-cyan-400/20 text-cyan-300 text-xs rounded-full">{tech}</span>
                ))}
              </div>
              <a href={project.link} className="mt-auto px-4 py-2 bg-cyan-400 text-white font-semibold rounded-full hover:bg-cyan-500 transition">
                View
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Project;
