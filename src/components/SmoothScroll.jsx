import { useEffect } from "react";
import Lenis from "lenis";

const SmoothScroll = () => {
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

        // Expose to window so other components (like Navbar) can use lenis.scrollTo()
        window.lenis = lenis;

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            delete window.lenis;
        };
    }, []);

    return null;
};

export default SmoothScroll;
