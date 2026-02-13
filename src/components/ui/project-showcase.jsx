import React from "react";
import { Link } from "react-router-dom";
import { CardContainer, CardBody, CardItem } from "./3d-card";
import {
    RiSignalTowerFill,
    RiShoppingCartFill,
    RiMotorbikeFill,
    RiRestaurantFill,
    RiCarFill,
    RiBusFill,
    RiBrainFill,
    RiArrowRightUpLine,
    RiGithubFill,
} from "react-icons/ri";

const projects = [
    {
        title: "Coursira",
        description:
            "Revolutionizing self-education with an AI engine that generates custom study plans, proctored tests, and instant feedback loops.",
        image: "./coursira-thumbnail.png",
        link: "https://coursira.vercel.app/",
        icon: <RiBrainFill />,
        category: "EdTech & AI",
        techStack: ["Next.js", "Gemini AI", "Tailwind", "NeonDB"],
        status: "Live",
        id: 7,
    },
    {
        title: "Bus Booked",
        description:
            "Bus operator dashboard with real-time seat management and WhatsApp integration for automated ticketing.",
        image: "./bus-booked-thumbnail.png",
        link: "https://busbooked.netlify.app/",
        icon: <RiBusFill />,
        category: "SaaS Systems",
        techStack: ["React", "Firebase", "Redux"],
        status: "Live",
        id: 6,
    },
    {
        title: "Inventory Management",
        description:
            "Real-time stock tracking and automated reordering system for high-volume retail businesses.",
        image: "./inventory-thumbnail.png",
        link: "https://nvntory-mgm.vercel.app/",
        icon: <RiSignalTowerFill />,
        category: "SaaS Systems",
        techStack: ["Next.js", "Supabase", "Prisma"],
        status: "Live",
        id: 1,
    },
    {
        title: "Smart Dining OS",
        description:
            "End-to-end Restaurant OS streamlining operations with table-to-kitchen ordering and analytics.",
        image: "./smart-dining-thumbnail.png",
        link: "https://korner-kafe.netlify.app/",
        icon: <RiRestaurantFill />,
        category: "SaaS Systems",
        techStack: ["React", "Node.js", "Socket.io"],
        status: "Beta",
        id: 4,
    },
    {
        title: "Luxury Chauffeur",
        description:
            "Premium booking engine for high-end fleet reservation management with real-time availability.",
        image: "./car-thumbnail.png",
        link: "https://royalcarz.netlify.app/",
        icon: <RiCarFill />,
        category: "Commerce & Services",
        techStack: ["React", "Motion", "Tailwind"],
        status: "Live",
        id: 5,
    },
    {
        title: "Ecommerce Store",
        description:
            "Seamless and secure shopping experience converting visitors to customers with optimized checkout flows.",
        image: "./ecommerce-thumbnail.png",
        link: "https://shopease-aafaque.netlify.app/",
        icon: <RiShoppingCartFill />,
        category: "Commerce & Services",
        techStack: ["React", "Redux", "Stripe"],
        status: "Live",
        id: 2,
    },
    {
        title: "Food Delivery App",
        description:
            "Streamlines food ordering to reduce wait times and maximize turnover for local chains.",
        image: "./resturant-thumbnail.png",
        link: "https://bread-and-bite.netlify.app/",
        icon: <RiMotorbikeFill />,
        category: "Commerce & Services",
        techStack: ["React", "Firebase", "Maps API"],
        status: "Live",
        id: 3,
    },
];

export function ProjectShowcase({ category }) {
    const filteredProjects =
        category === "All"
            ? projects
            : projects.filter((p) => p.category === category);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
            {filteredProjects.map((project) => (
                <CardContainer key={project.id} className="inter-var w-full h-full">
                    <CardBody className="bg-slate-900/50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border border-white/10 backdrop-blur-sm">

                        {/* Header: Icon + Title */}
                        <CardItem
                            translateZ="50"
                            className="text-xl font-bold text-neutral-600 dark:text-white flex items-center gap-2"
                        >
                            <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                                {project.icon}
                            </span>
                            {project.title}
                        </CardItem>

                        {/* Description */}
                        <CardItem
                            as="p"
                            translateZ="60"
                            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 line-clamp-2"
                        >
                            {project.description}
                        </CardItem>

                        {/* Image */}
                        <CardItem translateZ="100" className="w-full mt-4">
                            <div className="rounded-xl overflow-hidden group-hover/card:shadow-xl shadow-cyan-500/10">
                                <img
                                    src={project.image}
                                    height="1000"
                                    width="1000"
                                    className="h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl group-hover/card:scale-105 transition-transform duration-500"
                                    alt={project.title}
                                />
                            </div>
                        </CardItem>

                        {/* Footer: Tech Stack + Link */}
                        <div className="flex justify-between items-center mt-8">
                            <CardItem
                                translateZ={20}
                                className="flex gap-2 text-xs font-bold"
                            >
                                {project.techStack.slice(0, 2).map((tech, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-white/5 rounded-md text-slate-400 border border-white/5">
                                        {tech}
                                    </span>
                                ))}
                            </CardItem>
                            <CardItem
                                translateZ={20}
                                as={Link}
                                to={project.link}
                                target="__blank"
                                className="px-4 py-2 rounded-xl bg-white dark:bg-white dark:text-black text-white text-xs font-bold"
                            >
                                View Project →
                            </CardItem>
                        </div>
                    </CardBody>
                </CardContainer>
            ))}
        </div>
    );
}
