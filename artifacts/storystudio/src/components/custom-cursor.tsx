import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { Feather } from "lucide-react";

export function CustomCursor() {
  const [dots, setDots] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const dotIdCounter = useRef(0);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springX = useSpring(cursorX, { stiffness: 400, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 400, damping: 28 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    
    if (prefersReducedMotion || isTouchDevice) return;

    document.body.classList.add("ss-cursor-hidden");

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Add ink dot
      if (Math.random() > 0.4) {
        const newDot = {
          id: dotIdCounter.current++,
          x: e.clientX + (Math.random() * 10 - 5),
          y: e.clientY + (Math.random() * 10 - 5),
        };
        
        setDots((prev) => {
          const newDots = [...prev, newDot];
          return newDots.slice(-8); // Limit to 8 active dots
        });

        setTimeout(() => {
          setDots((prev) => prev.filter((d) => d.id !== newDot.id));
        }, 600);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName?.toLowerCase() === "a" ||
        target.tagName?.toLowerCase() === "button" ||
        target.getAttribute("role") === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.body.classList.remove("ss-cursor-hidden");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  if (typeof window !== "undefined" && (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(hover: none) and (pointer: coarse)").matches)) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className="relative flex items-center justify-center">
          <Feather
            className={`w-5 h-5 text-primary drop-shadow-md transition-transform duration-200 ${
              isHovering ? "scale-125" : ""
            } ${isClicking ? "scale-90" : ""}`}
            style={{ transform: "rotate(-45deg)" }}
          />
          {isHovering && (
            <div className="absolute inset-0 w-full h-full bg-primary/40 rounded-full blur-[4px] scale-[2.5]" />
          )}
          {isClicking && (
            <motion.div
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 w-full h-full bg-primary rounded-full"
            />
          )}
        </div>
      </motion.div>
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="fixed top-0 left-0 w-[2px] h-[2px] bg-primary rounded-full pointer-events-none z-[9998]"
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            x: dot.x,
            y: dot.y,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      ))}
    </>
  );
}
