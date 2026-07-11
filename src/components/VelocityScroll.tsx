import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity } from 'motion/react';

interface VelocityScrollProps {
  text: string;
  defaultVelocity?: number;
}

function ParallaxText({ text, defaultVelocity = 2 }: VelocityScrollProps) {
  const baseX = useRef(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [1, 5], {
    clamp: false,
  });

  const x = useTransform(velocityFactor, (v) => {
    // Dynamic sliding velocity dependent on scroll direction and speed
    baseX.current -= defaultVelocity + (v - 1) * 0.15;
    if (baseX.current <= -50) {
      baseX.current = 0;
    }
    return `${baseX.current}%`;
  });

  return (
    <div className="overflow-hidden tracking-tight flex whitespace-nowrap flex-nowrap py-1">
      <motion.div
        className="flex whitespace-nowrap gap-8 text-[11px] md:text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#006399]/45 text-gradient"
        style={{ x }}
      >
        <span>{text} </span>
        <span>{text} </span>
        <span>{text} </span>
        <span>{text} </span>
        <span>{text} </span>
        <span>{text} </span>
        <span>{text} </span>
        <span>{text} </span>
      </motion.div>
    </div>
  );
}

export default function VelocityScroll() {
  return (
    <div className="relative py-4 bg-[#eef4fc]/40 border-y border-[#bfc7d2]/20 backdrop-blur-sm overflow-hidden select-none">
      {/* Side Vignettes for cinematic blur fade-out */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f6f9ff] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#f6f9ff] to-transparent z-10 pointer-events-none" />

      <div className="flex flex-col gap-2">
        <ParallaxText text="SISTEM INFORMASI KELAS C 2025 • ACADEMIC PRECISION • COLLABORATIVE GROWTH • DIGITAL INNOVATION • TECHNOLOGY FOR BUSINESS • INTEGRITAS • EXCELLENCE •" defaultVelocity={1.5} />
        <ParallaxText text="REKAYASA DATA • SISTEM INFORMASI LANJUTAN • MODERN WEB FRAMEWORKS • DATA SCIENCE • ARTIFICIAL INTELLIGENCE • ENTERPRISE ARCHITECTURE •" defaultVelocity={-1.5} />
      </div>
    </div>
  );
}
