import React, { useEffect, useRef } from "react";

const GlobalBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    let animationFrameId;
    let width, height;

    // Data structures
    // Path: { points: [{x,y}, ...], length: totalPixelLength }
    let paths = [];
    // Junctions: { x, y, size }
    let dots = [];
    // Trailers: { pathIdx, distance, speed, len }
    let trailers = [];

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      build();
    };

    const dist = (p1, p2) => Math.hypot(p2.x - p1.x, p2.y - p1.y);

    const createPath = (start, dirX, dirY, maxSteps, maxX, minX) => {
      let points = [{ ...start }];
      let current = { ...start };
      let totalLen = 0;
      let steps = 0;

      const addPoint = (pt) => {
        const d = dist(current, pt);
        if (d > 0) {
          points.push(pt);
          totalLen += d;
          current = { ...pt };
        }
      };

      // Generate a path with turns
      // We want to bias towards the center somewhat but stay in zone

      while (steps < maxSteps) {
        // Decide length
        const segLen = 30 + Math.random() * 80;

        // Decide direction: mostly consistent with startDir, but occasional 90deg turn
        let dx = 0, dy = 0;
        const turn = Math.random();

        if (turn < 0.6) {
          // Continue main direction
          dx = dirX;
          dy = dirY;
        } else if (turn < 0.8) {
          // Turn horizontal
          dx = dirX !== 0 ? dirX : (Math.random() > 0.5 ? 1 : -1);
          dy = 0;
        } else {
          // Turn vertical
          dx = 0;
          dy = dirY !== 0 ? dirY : (Math.random() > 0.5 ? 1 : -1);
        }

        let nextX = current.x + dx * segLen;
        let nextY = current.y + dy * segLen;

        // Clamp
        nextX = Math.max(minX, Math.min(maxX, nextX));

        // If we hit a wall/limit in X, stop or turn vertical
        if (Math.abs(nextX - current.x) < 1 && Math.abs(nextY - current.y) < 1) {
          break;
        }

        addPoint({ x: nextX, y: nextY });

        // Chance to spawn a junction dot
        if (Math.random() > 0.3) {
          dots.push({ x: nextX, y: nextY, size: 2 + Math.random() * 2 });
        }

        steps++;
      }

      if (totalLen > 50) {
        paths.push({ points, length: totalLen });
        // Add start/end dots
        dots.push({ x: points[0].x, y: points[0].y, size: 4 });
        dots.push({ x: points[points.length - 1].x, y: points[points.length - 1].y, size: 4 });
      }
    };

    const build = () => {
      paths = [];
      dots = [];
      trailers = [];

      const isMobile = width < 768;
      const maxRight = width * 0.45;
      const minLeft = width * 0.55;

      // TOP-LEFT Cluster
      const tlCount = isMobile ? 5 : 8;
      for (let i = 0; i < tlCount; i++) {
        const sy = 20 + i * (isMobile ? 30 : 40) + Math.random() * 20;
        createPath({ x: -10, y: sy }, 1, 1, 5 + Math.random() * 3, maxRight, -20);
      }

      // BOTTOM-RIGHT Cluster
      const brCount = isMobile ? 5 : 8;
      for (let i = 0; i < brCount; i++) {
        const sy = height - 20 - i * (isMobile ? 30 : 40) - Math.random() * 20;
        createPath({ x: width + 10, y: sy }, -1, -1, 5 + Math.random() * 3, width + 20, minLeft);
      }

      // Initialize trailers (staggered)
      // We add multiple trails per path, spread out
      paths.forEach((p, idx) => {
        // Random number of trails per path (1 or 2)
        const count = Math.random() > 0.5 ? 2 : 1;
        for (let k = 0; k < count; k++) {
          trailers.push({
            pathIdx: idx,
            // Stagger start positions: negative so they enter frame later
            distance: Math.random() * p.length - p.length,
            speed: 1.5 + Math.random() * 1.5, // Variable speed "mid fast"
            len: 100 + Math.random() * 80 // Long trails
          });
        }
      });
    };

    // Helper: Get coordinate at distance d on path
    const getPointAtDist = (points, d) => {
      let covered = 0;
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const segLen = dist(p1, p2);

        if (d <= covered + segLen) {
          // Interpolate
          const t = (d - covered) / segLen;
          return {
            x: p1.x + (p2.x - p1.x) * t,
            y: p1.y + (p2.y - p1.y) * t,
          };
        }
        covered += segLen;
      }
      return points[points.length - 1]; // Clamp to end
    };

    // Helper: Stroke part of path from dStart to dEnd
    const drawPathSegment = (ctx, points, dStart, dEnd, colorStart, colorEnd) => {
      // Find start point index
      // This is expensive if we scan every time. 
      // Optimized approach: calculate interpolated points and lineTo between them.
      // Since segments are straight lines, we just need the start/end and intermediate vertices.

      const pStart = getPointAtDist(points, Math.max(0, dStart));
      const pEnd = getPointAtDist(points, Math.max(0, dEnd));

      // We really want a gradient. Canvas gradients are linear between two points. 
      // For a multi-segment line, a single linear gradient isn't perfect but usually "good enough" visually if moving fast.
      // Or we can just draw a segment from pStart to pEnd? No, that cuts corners.
      // Correct way: Move to pStart -> Line to all intermediate vertices -> Line to pEnd.

      ctx.beginPath();
      ctx.moveTo(pStart.x, pStart.y);

      // Add intermediate vertices
      let covered = 0;
      let started = false;
      for (let i = 0; i < points.length - 1; i++) {
        const segLen = dist(points[i], points[i + 1]);
        if (covered + segLen > dStart && covered < dEnd) {
          // This segment is at least partially involved
          // We already did moveTo pStart.
          // If we are fully past dStart, we should lineTo the vertex points[i+1]
          // unless points[i+1] is beyond dEnd.

          if (covered + segLen < dEnd) {
            ctx.lineTo(points[i + 1].x, points[i + 1].y);
          }
        }
        covered += segLen;
      }
      ctx.lineTo(pEnd.x, pEnd.y);

      // Gradient?
      const grad = ctx.createLinearGradient(pStart.x, pStart.y, pEnd.x, pEnd.y);
      grad.addColorStop(0, "rgba(6, 182, 212, 0)");
      grad.addColorStop(1, "rgba(34, 211, 238, 1)");

      ctx.strokeStyle = grad;
      ctx.stroke();

      return pEnd; // Return head position for dot
    };

    const animate = () => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // Draw Static Paths
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(6, 182, 212, 0.1)";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      paths.forEach(p => {
        ctx.beginPath();
        if (p.points.length > 0) {
          ctx.moveTo(p.points[0].x, p.points[0].y);
          for (let i = 1; i < p.points.length; i++) {
            ctx.lineTo(p.points[i].x, p.points[i].y);
          }
        }
        ctx.stroke();
      });

      // Draw Nodes
      // Batch mode optimization
      ctx.fillStyle = "rgba(6, 182, 212, 0.4)";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "rgba(6, 182, 212, 0.8)";

      dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fill();

        // Brighter core
        // ctx.fillStyle = "#A5F3FC"; // lighter cyan
        // ctx.beginPath();
        // ctx.arc(d.x, d.y, d.size * 0.5, 0, Math.PI * 2);
        // ctx.fill();
        // ctx.fillStyle = "rgba(6, 182, 212, 0.4)"; // reset
      });
      ctx.shadowBlur = 0;

      // Draw Trails
      ctx.lineWidth = 3;
      trailers.forEach(t => {
        const p = paths[t.pathIdx];
        if (!p) return;

        t.distance += t.speed;
        // Loop: if tail goes past end, reset to before start
        if (t.distance - t.len > p.length) {
          t.distance = -Math.random() * 200; // Random delay before restart
        }

        // Only draw if visible
        if (t.distance > 0 && t.distance - t.len < p.length) {
          // Draw trail
          const headPos = drawPathSegment(ctx, p.points, t.distance - t.len, t.distance);

          // Draw head glow
          ctx.shadowBlur = 20;
          ctx.shadowColor = "rgba(34, 211, 238, 1)";
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(headPos.x, headPos.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

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
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
};

export default GlobalBackground;
