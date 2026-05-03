import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Clock } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import timelineData from '../data/timeline.json';

const TimelineNode = ({ phase, index, total }) => {
  const nodeRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: nodeRef,
    offset: ["end bottom", "start center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1]);

  return (
    <div ref={nodeRef} className="relative py-12">
      {/* Center Line Desktop */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-white/10 -translate-x-1/2"></div>
      
      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 flex flex-col md:flex-row items-center justify-between"
      >
        <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:order-3 md:pl-12'} mb-8 md:mb-0 w-full`}>
          <div className="glass-panel p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-primary-dark dark:text-white mb-6 border-b border-slate-200 dark:border-white/10 pb-4">
              {phase.phase}
            </h3>
            <div className="space-y-6">
              {phase.events.map((event, i) => (
                <div key={i} className="text-left">
                  <h4 className="text-lg font-semibold text-accent mb-2">{event.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Node */}
        <div className="hidden md:flex order-2 absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white dark:bg-primary border-4 border-accent items-center justify-center shadow-xl">
          <Clock className="w-6 h-6 text-primary-dark dark:text-white" />
        </div>
      </motion.div>
    </div>
  );
};

const TimelinePage = () => {
  return (
    <PageTransition className="pt-24 pb-32 bg-slate-50 dark:bg-primary-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4"
          >
            Chronology
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary-dark dark:text-white mb-6"
          >
            Election Timeline
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Scroll through the events that unfold during an election cycle.
          </motion.p>
        </div>

        <div className="relative">
          {/* Mobile Line */}
          <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-white/10"></div>
          
          {timelineData.map((phase, index) => (
            <TimelineNode 
              key={index} 
              phase={phase} 
              index={index} 
              total={timelineData.length} 
            />
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default TimelinePage;
