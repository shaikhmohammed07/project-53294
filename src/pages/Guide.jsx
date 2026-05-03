import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, FileText, Users, CheckSquare, BarChart2, ChevronDown } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import stepsData from '../data/steps.json';

const iconMap = {
  'megaphone': <Megaphone size={24} />,
  'file-text': <FileText size={24} />,
  'users': <Users size={24} />,
  'check-square': <CheckSquare size={24} />,
  'bar-chart-2': <BarChart2 size={24} />
};

const Guide = () => {
  const [expandedStep, setExpandedStep] = useState(null);

  const toggleStep = (id) => {
    if (expandedStep === id) {
      setExpandedStep(null);
    } else {
      setExpandedStep(id);
    }
  };

  return (
    <PageTransition className="pt-24 pb-32 bg-slate-50 dark:bg-primary-dark min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4"
          >
            Process Breakdown
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary-dark dark:text-white mb-6"
          >
            How Elections Work
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-300"
          >
            A step-by-step guide to the democratic process in India. Click on each step to learn more.
          </motion.p>
        </div>

        <div className="space-y-6">
          {stepsData.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleStep(step.id)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none group"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    expandedStep === step.id 
                      ? 'bg-accent text-primary-dark' 
                      : 'bg-primary/5 dark:bg-white/5 text-primary-dark dark:text-white group-hover:bg-accent/20 group-hover:text-accent'
                  }`}>
                    {iconMap[step.icon]}
                  </div>
                  <div>
                    <div className="text-sm font-medium tracking-wider text-accent mb-1 uppercase">Step {index + 1}</div>
                    <h2 className="text-2xl font-bold text-primary-dark dark:text-white">{step.title}</h2>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedStep === step.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-primary flex items-center justify-center text-slate-500 dark:text-slate-400"
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedStep === step.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 md:px-8 pb-8 pt-0 ml-20 border-t border-slate-100 dark:border-white/10 mt-4 pt-6">
                      <p className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-3">
                        {step.description}
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {step.details}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Guide;
