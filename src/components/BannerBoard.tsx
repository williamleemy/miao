import React from 'react';
import { motion } from 'motion/react';

interface BannerBoardProps {
  src: string;
  mobileSrc?: string;
  alt?: string;
  className?: string;
  aspectRatio?: string;
  imageClassName?: string;
}

export default function BannerBoard({ 
  src, 
  mobileSrc,
  alt = "Advertisement", 
  className = "", 
  aspectRatio = "aspect-[430/365] md:aspect-[21/4]",
  imageClassName = "object-cover"
}: BannerBoardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`w-full ${aspectRatio} bg-transparent md:bg-white rounded-2xl md:rounded-[4.5rem] shadow-none md:shadow-[0_20px_60px_rgba(0,0,0,0.15)] border-0 md:border-8 md:border-white overflow-hidden relative group ${className}`}
    >
      <picture>
        {mobileSrc ? <source media="(max-width: 767px)" srcSet={mobileSrc} /> : null}
        <img 
          src={src}
          alt={alt}
          className={`w-full h-full ${imageClassName} opacity-95 group-hover:scale-105 transition-transform duration-700`}
          referrerPolicy="no-referrer"
        />
      </picture>
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
    </motion.div>
  );
}
