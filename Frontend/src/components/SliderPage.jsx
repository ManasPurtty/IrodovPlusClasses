import React, { useEffect, useState } from 'react';
import Nit from './Results/Nit';
import Ojee from './Results/Ojee';
import Board from './Results/Board';
import { AnimatePresence, motion } from 'framer-motion';

const slides = [<Nit />, <Ojee />, <Board />];

export default function SliderPage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full  overflow-hidden  ">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full" // Removed 'absolute'
        >
          {slides[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
