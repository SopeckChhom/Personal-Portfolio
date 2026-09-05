"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";

const DRAG_SENSITIVITY_DIVISOR = 260;
const OFFSET_X_RATIO = 0.62;
const DEPTH_PER_STEP = 170;
const SCALE_STEP = 0.16;
const OPACITY_FALLOFF = 0.55;
const MAX_VISIBLE_DELTA = 2;

function wrappedDelta(index, position, count) {
  const raw = index - position;
  return raw - count * Math.round(raw / count);
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

export default function ProjectCarousel({ projects }) {
  const count = projects.length;

  const slotRef = useRef(null);
  const dragState = useRef({ startX: 0, startPosition: 0, dragging: false, moved: false });

  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;

    const measure = () => setCardWidth(slot.offsetWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(slot);
    return () => observer.disconnect();
  }, []);

  const activeIndex = mod(Math.round(position), count);

  const goTo = useCallback(
    (index) => {
      setPosition((current) => index + count * Math.round((current - index) / count));
    },
    [count]
  );

  const rotateBy = useCallback((direction) => {
    setPosition((current) => current + direction);
  }, []);

  const onPointerDown = (event) => {
    dragState.current = {
      startX: event.clientX,
      startPosition: position,
      dragging: true,
      moved: false,
    };
  };

  const onPointerMove = (event) => {
    if (!dragState.current.dragging) return;
    const dx = event.clientX - dragState.current.startX;
    if (Math.abs(dx) > 3 && !dragState.current.moved) {
      dragState.current.moved = true;
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (!dragState.current.moved) return;
    setPosition(dragState.current.startPosition - dx / DRAG_SENSITIVITY_DIVISOR);
  };

  const endDrag = () => {
    if (!dragState.current.dragging) return;
    dragState.current.dragging = false;
    setIsDragging(false);
    setPosition((current) => Math.round(current));
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      rotateBy(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      rotateBy(1);
    }
  };

  const offsetPx = cardWidth * OFFSET_X_RATIO;

  return (
    <div className="mt-12">
      <div
        role="group"
        aria-label="Project carousel. Use the arrow keys, drag, or the buttons below to rotate."
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        className="relative h-[520px] w-full touch-none select-none outline-none sm:h-[560px]"
        style={{ perspective: "1600px" }}
      >
        <div
          ref={slotRef}
          className="pointer-events-none absolute left-1/2 top-0 h-full w-70 -translate-x-1/2 opacity-0 sm:w-85 md:w-95"
          aria-hidden="true"
        />

        {projects.map((project, index) => {
          const delta = wrappedDelta(index, position, count);
          const absDelta = Math.abs(delta);
          const isActive = index === activeIndex;
          const clamped = Math.min(absDelta, MAX_VISIBLE_DELTA);

          const translateX = delta * offsetPx;
          const translateZ = -clamped * DEPTH_PER_STEP;
          const scale = Math.max(0.55, 1 - clamped * SCALE_STEP);
          const opacity = Math.max(0, 1 - absDelta * OPACITY_FALLOFF);

          return (
            <div
              key={project.title}
              className="absolute left-1/2 top-0 h-full w-70 -translate-x-1/2 sm:w-85 md:w-95"
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale})`,
                opacity,
                zIndex: 100 - Math.round(absDelta * 10),
                transition: isDragging
                  ? "none"
                  : "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease",
                pointerEvents: absDelta < MAX_VISIBLE_DELTA ? "auto" : "none",
                cursor: isActive ? "grab" : "pointer",
              }}
              onClick={() => {
                if (dragState.current.moved) return;
                if (!isActive) goTo(index);
              }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                image={project.image}
                github={project.github}
                demo={project.demo}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => rotateBy(-1)}
          aria-label="Previous project"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 text-slate-300 transition-colors duration-200 hover:border-indigo-500/40 hover:text-indigo-300"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {projects.map((project, index) => (
            <button
              key={project.title}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to ${project.title}`}
              aria-current={index === activeIndex}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-6 bg-indigo-400"
                  : "w-2 bg-slate-700 hover:bg-slate-600"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => rotateBy(1)}
          aria-label="Next project"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 text-slate-300 transition-colors duration-200 hover:border-indigo-500/40 hover:text-indigo-300"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <p className="mt-4 text-center text-sm text-slate-500">
        Drag to rotate, or use the arrows
      </p>
    </div>
  );
}
