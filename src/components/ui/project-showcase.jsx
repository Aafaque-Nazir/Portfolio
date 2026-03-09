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
    RiPlaneFill,
    RiGithubFill,
    RiArrowRightDoubleFill,
    RiCupFill,
} from "react-icons/ri";

const projects = [
    {
        title: "VelvetBrew Coffee",
        description:
            "Premium e-commerce platform for luxury coffee machines, artisan beans, and curated accessories with a dark, immersive brand experience.",
        image: "./velvet.png",
        link: "https://velvet-coffee.netlify.app",
        icon: <RiCupFill />,
        category: "Commerce & Services",
        techStack: ["Next.js", "Tailwind", "MongoDB"],
        status: "Live",
        id: 9,
    },
    {
        title: "Dubai Travel & Tourism",
        description:
            "Premium booking platform for exclusive Dubai experiences, from desert safaris to Dubai Tech.",
        image: "./dubai.png",
        link: "https://dubai-tt.netlify.app/",
        icon: <RiPlaneFill />,
        category: "Commerce & Services",
        techStack: ["Next.Js", "Tailwind", "Framer Motion"],
        status: "Live",
        id: 8,
    },
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
        <div className="relative group/swipe-hint">
            {/* Swipe Indicator (Mobile Only) */}
            <div className="md:hidden absolute -top-10 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-pulse shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">Swipe</span>
                <span className="text-cyan-400 text-lg animate-bounce-x">
                    <RiArrowRightDoubleFill />
                </span>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-8 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:overflow-visible md:pb-0 max-w-[85rem] mx-auto no-visible-scrollbar">
                {filteredProjects.map((project) => (
                    <CardContainer key={project.id} className="inter-var w-[75vw] md:w-full flex-shrink-0 snap-center h-full">
                        <CardBody className="bg-slate-900/50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-cyan-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-4 border border-white/10 backdrop-blur-sm">

                            {/* Header: Icon + Title */}
                            <CardItem
                                translateZ="50"
                                className="text-lg font-bold text-neutral-600 dark:text-white flex items-center gap-2"
                            >
                                <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 text-lg">
                                    {project.icon}
                                </span>
                                {project.title}
                            </CardItem>

                            {/* Description */}
                            <CardItem
                                as="p"
                                translateZ="60"
                                className="text-neutral-500 text-xs max-w-sm mt-2 dark:text-neutral-300 line-clamp-2 leading-relaxed"
                            >
                                {project.description}
                            </CardItem>

                            {/* Divider */}
                            <div className="w-full h-px bg-white/10 my-4" />

                            {/* Image */}
                            <CardItem translateZ="100" className="w-full mt-3">
                                <div className="rounded-lg overflow-hidden group-hover/card:shadow-xl shadow-cyan-500/10">
                                    <img
                                        src={project.image}
                                        height="1000"
                                        width="1000"
                                        className="h-40 w-full object-cover rounded-lg group-hover/card:shadow-xl group-hover/card:scale-105 transition-transform duration-500"
                                        alt={project.title}
                                    />
                                </div>
                            </CardItem>

                            {/* Divider */}
                            <div className="w-full h-px bg-white/10 my-4" />

                            {/* Footer: Tech Stack + Link */}
                            <div className="flex justify-between items-center mt-4">
                                <CardItem
                                    translateZ={20}
                                    className="flex gap-2 text-xs font-bold"
                                >
                                    {project.techStack.slice(0, 2).map((tech, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-white/5 rounded-md text-slate-400 border border-white/5 text-[10px]">
                                            {tech}
                                        </span>
                                    ))}
                                </CardItem>
                                <CardItem
                                    translateZ={20}
                                    as={Link}
                                    to={project.link}
                                    target="__blank"
                                    className="px-3 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 text-xs font-bold whitespace-nowrap transition-colors"
                                >
                                    View Project →
                                </CardItem>
                            </div>
                        </CardBody>
                    </CardContainer>
                ))}
            </div>
        </div>
    );
}
