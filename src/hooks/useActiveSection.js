import { useState, useEffect } from 'react';

export const useActiveSection = (sectionIds) => {
  const [activeSection, setActiveSection] = useState('home');

  const idsString = sectionIds.join(',');

  useEffect(() => {
    const handleScroll = () => {
      // Find the section that is currently most visible in the viewport
      let currentSection = activeSection;
      let minDistance = Infinity;

      // We consider the "active" focal point to be roughly 1/3 down the screen
      const focalPoint = window.innerHeight * 0.3;

      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Calculate distance from top of section to the focal point
          // If the section is currently spanning across the focal point, distance is 0
          let distance;
          if (rect.top <= focalPoint && rect.bottom >= focalPoint) {
            distance = 0;
          } else if (rect.top > focalPoint) {
            distance = rect.top - focalPoint;
          } else {
            distance = focalPoint - rect.bottom;
          }

          if (distance < minDistance) {
            minDistance = distance;
            currentSection = id;
          }
        }
      });

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Also handle resizing
    window.addEventListener('resize', handleScroll);

    // To handle lazy-loaded sections that might not be in DOM immediately
    const interval = setInterval(handleScroll, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearInterval(interval);
    };
  }, [idsString]);

  return activeSection;
};
