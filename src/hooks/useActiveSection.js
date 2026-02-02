import { useState, useEffect } from 'react';

export const useActiveSection = (sectionIds) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const visibilityMap = {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Store the height of the intersection rectangle
          // This represents how many pixels of this section are actually visible on screen
          visibilityMap[entry.target.id] = entry.intersectionRect.height;
        });

        // Find section with highest visible height in pixels
        // This is more robust than intersectionRatio for handling very large vs very small sections
        const visibleSection = Object.entries(visibilityMap).reduce(
          (max, [id, visibleHeight]) => (visibleHeight > max.visibleHeight ? { id, visibleHeight } : max),
          { id: '', visibleHeight: 0 }
        );

        if (visibleSection.visibleHeight > 0) {
          setActiveSection(visibleSection.id);
        }
      },
      {
        rootMargin: '-40% 0px -40% 0px', // Focus on the center 20% strip of the screen
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
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
