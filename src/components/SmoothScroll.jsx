import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useLocation } from "react-router-dom";

const SmoothScroll = () => {
    const location = useLocation();
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5, // Slower duration for smoother feel
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        // Expose to window so other components can use lenis.scrollTo()
        window.lenis = lenis;

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        // Crucial fix: Dynamically observe the body for layout changes!
        // This ensures the scroll boundary perfectly adjusts even after components change shapes.
        const resizeObserver = new ResizeObserver(() => {
             lenis.resize(); // Force recalculate document height bounding boxes
        });
        resizeObserver.observe(document.body);

        return () => {
            resizeObserver.disconnect();
            lenis.destroy();
            delete window.lenis;
            lenisRef.current = null;
        };
    }, []);

    // Reset scroll to top on page transition
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        }
    }, [location.pathname]);

    return null;
};

export default SmoothScroll;
