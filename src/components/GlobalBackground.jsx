import React, { useEffect, useRef } from "react";

const GlobalBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width, height;
    let particles = [];

    // Configuration
    const PARTICLE_COUNT = 15; // "worms kam" - Reduced density
    const SPEED = 1.5; // Slightly slower for relaxed vibe
    const BASE_COLOR = "rgba(6, 182, 212, 0.3)"; // Lower intensity (opacity)

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    class CircuitParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Randomly choose a direction: 0 (right), 1 (down), 2 (left), 3 (up)
        this.dir = Math.floor(Math.random() * 4);
        this.life = Math.random() * 200 + 100; // Longer life
        this.history = []; // Trail
        this.historyMax = 80; // "lines rakha chalega" - Longer trails
        this.changeDirTimer = 0;
      }

      update() {
        this.life--;
        if (this.life <= 0) {
          // Respawn effectively
          this.reset();
        }

        // Add to history
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > this.historyMax) {
          this.history.shift();
        }

        // Move
        if (this.dir === 0) this.x += SPEED;
        else if (this.dir === 1) this.y += SPEED;
        else if (this.dir === 2) this.x -= SPEED;
        else if (this.dir === 3) this.y -= SPEED;

        // Randomly change direction (90 degrees only)
        this.changeDirTimer++;
        if (this.changeDirTimer > Math.random() * 50 + 30) {
          this.changeDirTimer = 0;
          if (Math.random() > 0.5) {
            // Turn 90 deg clockwise or counter-clockwise
            this.dir = (this.dir + (Math.random() > 0.5 ? 1 : 3)) % 4;
          }
        }

        // Wrap around screen
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(ctx) {
        if (this.history.length < 2) return;

        ctx.beginPath();
        ctx.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 1; i < this.history.length; i++) {
          ctx.lineTo(this.history[i].x, this.history[i].y);
        }

        // Fading tail effect
        ctx.strokeStyle = BASE_COLOR;
        ctx.lineWidth = 1.5; // Thinner lines ("patle kar")
        ctx.lineCap = "round"; // Softer ends

        // "Blury circuit" - High shadow blur + low opacity line
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(6, 182, 212, 0.8)"; // Stronger glow relative to line

        ctx.stroke();
        ctx.shadowBlur = 0; // Reset
      }
    }

    const initParticles = () => {
      particles = [];
      const count = width < 768 ? 8 : PARTICLE_COUNT;
      for (let i = 0; i < count; i++) {
        particles.push(new CircuitParticle());
      }
    };

    const animate = () => {
      // Create trailing effect by drawing semi-transparent black rect instead of clearing
      // This gives the "fading ghost" effect for free if we want, OR we can just clear.
      // For sharp circuit lines, clearing is better, but let's do a very slight fade for "display persistence"
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize
    handleResize();
    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none bg-black opacity-80"
      style={{ filter: "blur(5px)" }} // CSS Blur for "Glass" effect
    />
  );
};

export default GlobalBackground;
