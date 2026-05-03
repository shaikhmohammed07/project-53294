import React from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background-light dark:bg-background-dark z-50">
      <div className="flex flex-col items-center">
        <motion.div
          className="relative w-24 h-24"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          {/* Saffron Arc */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-[#FF9933] rounded-full"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          {/* White/Blue Arc */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-r-[#000080] dark:border-r-white rounded-full"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
          {/* Green Arc */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-b-[#138808] rounded-full"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-accent rounded-full animate-pulse"></div>
          </div>
        </motion.div>
        
        <motion.h2 
          className="mt-6 text-xl font-display font-semibold text-primary dark:text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Election Guide India
        </motion.h2>
      </div>
    </div>
  );
};

export default Preloader;
