import { useState, useEffect } from 'react';

export const useActiveSection = (sectionIds) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    // Track how much of each section is visible (in pixels)
    const visibilityMap = {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibilityMap[entry.target.id] = entry.isIntersecting
            ? entry.intersectionRect.height
            : 0;
        });

        // Find the section with the most visible pixels
        let bestId = '';
        let bestHeight = 0;

        for (const [id, height] of Object.entries(visibilityMap)) {
          if (height > bestHeight) {
            bestHeight = height;
            bestId = id;
          }
        }

        if (bestId) {
          setActiveSection(bestId);
        }
      },
      {
        // Observe the full viewport
        rootMargin: '0px 0px 0px 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
};
