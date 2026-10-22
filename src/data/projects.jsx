import React from "react";
import {
    RiSignalTowerFill,
    RiShoppingCartFill,
    RiMotorbikeFill,
    RiRestaurantFill,
    RiHeartPulseFill,
    RiPlaneFill,
    RiShipFill,
    RiBuilding2Fill,
} from "react-icons/ri";
import { projectsData } from "./projects-data.js";

const iconMap = {
    tower: <RiSignalTowerFill />,
    cart: <RiShoppingCartFill />,
    motorbike: <RiMotorbikeFill />,
    restaurant: <RiRestaurantFill />,
    pulse: <RiHeartPulseFill />,
    plane: <RiPlaneFill />,
    ship: <RiShipFill />,
    building: <RiBuilding2Fill />,
};

export const projects = projectsData.map((project) => ({
    ...project,
    icon: iconMap[project.iconType] || <RiSignalTowerFill />,
}));
