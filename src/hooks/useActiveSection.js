import { useState, useEffect } from 'react';

export const useActiveSection = (sectionIds) => {
  const [activeSection, setActiveSection] = useState('');

  // Use a string representation for stable dependency comparison to prevent excessive re-renders
  const idsString = sectionIds.join(',');

  useEffect(() => {
    // Track how much of each section is visible (in pixels)
    const visibilityMap = {};
    const observedElements = new Set();
    const currentIds = idsString.split(',');

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

    const checkAndObserve = () => {
      let allObserved = true;
      currentIds.forEach((id) => {
        if (!observedElements.has(id)) {
          const element = document.getElementById(id);
          if (element) {
            observer.observe(element);
            observedElements.add(id);
          } else {
            allObserved = false;
          }
        }
      });
      return allObserved;
    };

    // Initial check
    let intervalId;
    if (!checkAndObserve()) {
      // Keep checking every 500ms for lazy-loaded sections
      intervalId = setInterval(() => {
        if (checkAndObserve()) {
          clearInterval(intervalId);
        }
      }, 500);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      observer.disconnect();
    };
  }, [idsString]);

  return activeSection;
};
