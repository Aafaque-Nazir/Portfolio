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

        let animationFrameId;
        let isCleanedUp = false;

        const initLenis = () => {
            if (isCleanedUp) return;

            const lenis = new Lenis({
                duration: 1.4,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                direction: "vertical",
                gestureDirection: "vertical",
                smooth: true,
                mouseMultiplier: 1,
                smoothTouch: false,
                touchMultiplier: 2,
            });

            lenisRef.current = lenis;
            window.lenis = lenis;

            const raf = (time) => {
                if (isCleanedUp) return;
                lenis.raf(time);
                animationFrameId = requestAnimationFrame(raf);
            };

            animationFrameId = requestAnimationFrame(raf);
        };

        // Defer Lenis initialization so it doesn't compete with initial hydration and paint
        const timeoutId = setTimeout(() => {
            if ('requestIdleCallback' in window) {
                requestIdleCallback(initLenis);
            } else {
                initLenis();
            }
        }, 150);

        const handleResize = () => {
            if (lenisRef.current) lenisRef.current.resize();
        };
        window.addEventListener("resize", handleResize, { passive: true });

        return () => {
            isCleanedUp = true;
            clearTimeout(timeoutId);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
            if (lenisRef.current) {
                lenisRef.current.destroy();
                lenisRef.current = null;
            }
            delete window.lenis;
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
