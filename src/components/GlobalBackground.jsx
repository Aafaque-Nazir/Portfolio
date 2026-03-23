import React, { useEffect, useRef } from "react";

const GlobalBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    let animationFrameId;
    let width, height;
    let isVisible = true;

    // --- DATA STRUCTURES ---
    let paths = []; // { points: [{x,y}], length }
    let trailers = []; // { pathIdx, distance, speed, len, width }
    let dots = []; // { x, y, size, type: 'pad' }

    const initializeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.scale(ratio, ratio);
      buildWorld();
    };

    const dist = (p1, p2) => Math.hypot(p2.x - p1.x, p2.y - p1.y);

    const buildWorld = () => {
      paths = [];
      dots = [];
      trailers = [];

      const isMobile = width < 768;
      
      // 4 Corners: TL, TR, BL, BR
      const corners = [
        { x: -20, y: -20, dx: 1, dy: 1 },
        { x: width + 20, y: -20, dx: -1, dy: 1 },
        { x: -20, y: height + 20, dx: 1, dy: -1 },
        { x: width + 20, y: height + 20, dx: -1, dy: -1 }
      ];

      corners.forEach(corner => {
        const busCount = isMobile ? 2 : 4;
        for (let i = 0; i < busCount; i++) {
          const startX = corner.x + (corner.dx === 1 ? i * 15 : -i * 15);
          const startY = corner.y + (corner.dy === 1 ? i * 15 : -i * 15);
          createPCBPath({ x: startX, y: startY }, corner.dx, corner.dy, isMobile);
        }
      });

      paths.forEach((p, idx) => {
        const count = isMobile ? 1 : (Math.random() > 0.7 ? 2 : 1);
        for (let k = 0; k < count; k++) {
          trailers.push({
            pathIdx: idx,
            distance: Math.random() * p.length - p.length,
            speed: 1.5 + Math.random() * 2, 
            len: 80 + Math.random() * 100,
            width: 1.5 + Math.random() * 1
          });
        }
      });
    };

    const createPCBPath = (start, dx, dy, isMobile) => {
      let points = [start];
      let current = { ...start };
      let totalLen = 0;
      let steps = 0;
      const maxSteps = isMobile ? 4 : 8;

      const angles = [
        { x: dx, y: 0 },
        { x: 0, y: dy },
        { x: dx, y: dy }
      ];

      let lastDir = null;
      while (steps < maxSteps) {
        let dir = (!lastDir || Math.random() > 0.4) ? angles[Math.floor(Math.random() * angles.length)] : lastDir;
        const segLen = 50 + Math.random() * 150;
        let next = { x: current.x + dir.x * segLen, y: current.y + dir.y * segLen };
        if (next.x < -100 || next.x > width + 100 || next.y < -100 || next.y > height + 100) break;

        const d = dist(current, next);
        points.push(next);
        totalLen += d;
        if (Math.random() > 0.7) dots.push({ x: next.x, y: next.y, size: 2.5, type: 'pad' });
        current = next;
        lastDir = dir;
        steps++;
      }

      if (totalLen > 50) {
        paths.push({ points, length: totalLen });
        dots.push({ x: current.x, y: current.y, size: 4, type: 'pad' });
      }
    };

    const getPointAtDist = (points, d) => {
      if (d <= 0) return points[0];
      let covered = 0;
      for (let i = 0; i < points.length - 1; i++) {
        const segLen = dist(points[i], points[i + 1]);
        if (d <= covered + segLen) {
          const t = (d - covered) / segLen;
          return { x: points[i].x + (points[i + 1].x - points[i].x) * t, y: points[i].y + (points[i + 1].y - points[i].y) * t };
        }
        covered += segLen;
      }
      return points[points.length - 1];
    };

    const render = () => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // --- Draw PCB Traces ---
      ctx.lineCap = "butt";
      ctx.lineJoin = "miter";
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = "rgba(14, 116, 144, 0.15)"; 

      paths.forEach(p => {
        ctx.beginPath();
        ctx.moveTo(p.points[0].x, p.points[0].y);
        for (let i = 1; i < p.points.length; i++) ctx.lineTo(p.points[i].x, p.points[i].y);
        ctx.stroke();
      });

      // --- Draw Logic Pads ---
      dots.forEach(d => {
        ctx.fillStyle = "rgba(34, 211, 238, 0.25)";
        ctx.fillRect(d.x - d.size/2, d.y - d.size/2, d.size, d.size);
      });

      // --- Draw Trails ---
      trailers.forEach(t => {
        const p = paths[t.pathIdx];
        if (!p) return;

        t.distance += t.speed;
        if (t.distance - t.len > p.length) t.distance = -t.len - Math.random() * 300;

        if (t.distance > -t.len && t.distance < p.length + t.len) {
          const dStart = Math.max(0, t.distance - t.len);
          const dEnd = Math.min(p.length, t.distance);
          
          if (dEnd > dStart) {
            const head = getPointAtDist(p.points, dEnd);
            const tail = getPointAtDist(p.points, dStart);

            const grad = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
            grad.addColorStop(0, "rgba(6, 182, 212, 0)");
            grad.addColorStop(1, "rgba(34, 211, 238, 0.7)");

            ctx.lineWidth = t.width;
            ctx.strokeStyle = grad;
            ctx.beginPath();
            ctx.moveTo(tail.x, tail.y);
            let covered = 0;
            for (let i = 0; i < p.points.length - 1; i++) {
              const segLen = dist(p.points[i], p.points[i+1]);
              if (covered + segLen > dStart && covered < dEnd) {
                 if (covered > dStart && covered < dEnd) ctx.lineTo(p.points[i].x, p.points[i].y);
              }
              covered += segLen;
            }
            ctx.lineTo(head.x, head.y);
            ctx.stroke();

            // Head Glow (Simpler circle)
            ctx.shadowBlur = 15;
            ctx.shadowColor = "rgba(34, 211, 238, 0.8)";
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(head.x, head.y, t.width * 1.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      if (isVisible) animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => initializeCanvas();
    initializeCanvas();
    window.addEventListener("resize", handleResize);
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) render();
    });
    observer.observe(canvas);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

export default GlobalBackground;
