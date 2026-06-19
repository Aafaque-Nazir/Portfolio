import { useState, useEffect, useRef, useSyncExternalStore } from 'react';

/**
 * Singleton active-section store.
 * ---
 * Result: A single source of truth for which section is active,
 *         eliminating desync between Navbar and App.
 * What:   useSyncExternalStore pattern with a module-level store.
 * How:    One scroll listener manages state; every consumer subscribes
 *         to the same snapshot, guaranteeing identical renders.
 */

let currentSection = 'home';
let listeners = new Set();
let isObserving = false;
let sectionIdList = [];

function getSnapshot() {
  return currentSection;
}

function subscribe(listener) {
  listeners.add(listener);

  // Start observing on first subscriber
  if (!isObserving && sectionIdList.length > 0) {
    startObserving();
  }

  return () => {
    listeners.delete(listener);
    // Stop observing when no subscribers left
    if (listeners.size === 0) {
      stopObserving();
    }
  };
}

function emitChange(newSection) {
  if (newSection === currentSection) return;
  currentSection = newSection;
  listeners.forEach((listener) => listener());
}

/* ─── Scroll-based detection ────────────────────────────────── */

let scrollHandler = null;
let resizeHandler = null;
let pollingInterval = null;

function computeActiveSection() {
  let bestSection = currentSection;
  let minDistance = Infinity;

  // Focal point at ~30% from top of viewport
  const focalPoint = window.innerHeight * 0.3;

  for (const id of sectionIdList) {
    const el = document.getElementById(id);
    if (!el) continue;

    const rect = el.getBoundingClientRect();

    let distance;
    if (rect.top <= focalPoint && rect.bottom >= focalPoint) {
      // Section spans across the focal point — perfect match
      distance = 0;
    } else if (rect.top > focalPoint) {
      distance = rect.top - focalPoint;
    } else {
      distance = focalPoint - rect.bottom;
    }

    if (distance < minDistance) {
      minDistance = distance;
      bestSection = id;
    }
  }

  // Edge case: user scrolled to very top → force "home"
  if (window.scrollY < 50 && sectionIdList.includes('home')) {
    bestSection = 'home';
  }

  emitChange(bestSection);
}

function startObserving() {
  if (isObserving) return;
  isObserving = true;

  scrollHandler = () => computeActiveSection();
  resizeHandler = () => computeActiveSection();

  // Initial computation
  computeActiveSection();

  window.addEventListener('scroll', scrollHandler, { passive: true });
  window.addEventListener('resize', resizeHandler);

  // Poll for lazy-loaded sections not yet in DOM
  pollingInterval = setInterval(computeActiveSection, 1000);
}

function stopObserving() {
  if (!isObserving) return;
  isObserving = false;

  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler);
    scrollHandler = null;
  }
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
    resizeHandler = null;
  }
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
}

/* ─── Public hook ───────────────────────────────────────────── */

export const useActiveSection = (sectionIds) => {
  // Register section IDs (only update if they actually changed)
  const idsString = sectionIds.join(',');

  useEffect(() => {
    const newIds = idsString.split(',');
    const changed =
      newIds.length !== sectionIdList.length ||
      newIds.some((id, i) => id !== sectionIdList[i]);

    if (changed) {
      sectionIdList = newIds;
      // Restart observation with new section IDs
      if (isObserving) {
        stopObserving();
        startObserving();
      }
    }
  }, [idsString]);

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
};
