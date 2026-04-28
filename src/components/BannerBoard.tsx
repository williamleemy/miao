import React from 'react';
import { motion } from 'motion/react';

interface BannerBoardProps {
  src: string;
  alt?: string;
  className?: string;
  aspectRatio?: string;
}

export default function BannerBoard({ 
  src, 
  alt = "Advertisement", 
  className = "", 
  aspectRatio = "aspect-[21/8] md:aspect-[21/4]" 
}: BannerBoardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`w-full ${aspectRatio} bg-white rounded-[2.5rem] md:rounded-[4.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border-4 md:border-8 border-white overflow-hidden relative group ${className}`}
    >
      <img 
        src={src}
        alt={alt}
        className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
        referrerPolicy="no-referrer"
      />
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
    </motion.div>
  );
}
