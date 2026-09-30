import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useLocation } from "react-router-dom";

const SmoothScroll = () => {
    const location = useLocation();
    const lenisRef = useRef(null);

    useEffect(() => {
        // Skip Lenis on touch devices as native scroll is already optimized
        if (typeof window !== "undefined" && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
            return;
        }

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

        const handleResize = () => {
            if (lenisRef.current) lenisRef.current.resize();
        };
        window.addEventListener("resize", handleResize, { passive: true });

        return () => {
            window.removeEventListener("resize", handleResize);
            lenis.destroy();
            delete window.lenis;
            lenisRef.current = null;
        };
    }, []);

    // Reset scroll to top on page transition
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
            lenisRef.current.resize();
        }
    }, [location.pathname]);

    return null;
};

export default SmoothScroll;
