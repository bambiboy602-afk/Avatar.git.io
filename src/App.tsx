/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const Particle = () => {
  const colors = ["bg-purple-900/30", "bg-red-900/30", "bg-neutral-500/20"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return (
    <motion.div
      className={`absolute ${color} rounded-full`}
      initial={{ x: Math.random() * 100 - 50 + "%", y: "110%", opacity: 0 }}
      animate={{ y: "-10%", opacity: [0, 0.5, 0] }}
      transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
      style={{ width: Math.random() * 4 + 2 + "px", height: Math.random() * 4 + 2 + "px" }}
    />
  );
};

export default function App() {
  const [animation, setAnimation] = useState("idle");

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-128, 128], [15, -15]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-128, 128], [-15, 15]), { stiffness: 100, damping: 20 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variants = {
    idle: { 
      y: [0, -10, 0], 
      scale: [1, 1.02, 1], 
      rotate: 0,
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    },
    wave: { 
      rotate: [0, 20, -20, 20, 0], 
      x: [0, 20, -20, 20, 0],
      transition: { duration: 1.5, times: [0, 0.25, 0.5, 0.75, 1] }
    },
    nod: { 
      y: [0, -30, 0, -30, 0],
      transition: { duration: 1, times: [0, 0.25, 0.5, 0.75, 1] }
    }
  };

  const triggerAnimation = (anim: string) => {
    setAnimation(anim);
    if (anim !== "idle") {
      setTimeout(() => setAnimation("idle"), 2000);
    }
  };

  return (
    <div className="relative min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Gothic Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: "radial-gradient(circle at center, #312e81 0%, transparent 70%), linear-gradient(to bottom, #000 0%, #171717 100%)",
          backgroundSize: "200% 200%"
        }}
      />
      <motion.div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 5, repeat: Infinity }}
        style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjEiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsdGVyPSJ1cmwoI2YpIi8+PC9zdmc+')" }}
      />
      
      {/* Particles */}
      {Array.from({ length: 30 }).map((_, i) => <Particle key={i} />)}

      <motion.div
        className="relative z-10 w-64 h-64 rounded-full border-2 border-neutral-700 shadow-[0_0_50px_rgba(79,70,229,0.5)] flex items-center justify-center overflow-hidden cursor-pointer"
        animate={animation}
        variants={variants}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.img 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          src="/3cc432dd-4112-44f8-ae3e-26a1735014b2 (1).jpeg" 
          alt="Avatar" 
          className="w-full h-full object-cover"
          style={{ transformStyle: "preserve-3d" }}
        />
      </motion.div>

      <div className="relative z-10 flex gap-4 mt-12">
        <button
          onClick={() => triggerAnimation("wave")}
          className="px-4 py-2 bg-neutral-800 text-white rounded hover:bg-neutral-700 transition"
        >
          Wave
        </button>
        <button
          onClick={() => triggerAnimation("nod")}
          className="px-4 py-2 bg-neutral-800 text-white rounded hover:bg-neutral-700 transition"
        >
          Nod
        </button>
      </div>
    </div>
  );
}
