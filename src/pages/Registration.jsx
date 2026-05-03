import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ExternalLink } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const registrationSteps = [
  {
    title: "Gather Your Documents",
    description: "You will need a passport-sized photograph, an identity proof (like Aadhaar card, PAN card), and an address proof.",
    link: null
  },
  {
    title: "Visit the NVSP Portal",
    description: "Go to the National Voters' Services Portal (NVSP) website to access the online registration forms.",
    link: "https://voters.eci.gov.in/"
  },
  {
    title: "Fill Form 6",
    description: "Select 'Form 6' which is meant for the inclusion of names for first-time voters. Fill in all the mandatory details accurately.",
    link: null
  },
  {
    title: "Upload Documents",
    description: "Upload scanned copies of your photograph and the supporting documents you gathered in Step 1.",
    link: null
  },
  {
    title: "Submit and Track",
    description: "Submit the form. You will receive a reference number. Keep it safe to track your application status.",
    link: null
  }
];

const Registration = () => {
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem('registrationProgress');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('registrationProgress', JSON.stringify(completedSteps));
  }, [completedSteps]);

  const toggleStep = (index) => {
    setCompletedSteps(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const progress = Math.round((completedSteps.length / registrationSteps.length) * 100);

  return (
    <PageTransition className="pt-24 pb-32 bg-slate-50 dark:bg-primary-dark min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary-dark dark:text-white mb-6"
          >
            Voter Registration Guide
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-300"
          >
            Follow these steps to get yourself registered to vote. Track your progress below.
          </motion.p>
        </div>

        {/* Progress Bar */}
        <div className="glass-panel rounded-2xl p-6 mb-12 shadow-md">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-semibold text-primary-dark dark:text-white uppercase tracking-wider">Your Progress</span>
            <span className="text-2xl font-bold text-accent">{progress}%</span>
          </div>
          <div className="w-full h-3 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-8 top-10 bottom-10 w-0.5 bg-slate-200 dark:bg-white/10"></div>
          
          <div className="space-y-12 relative z-10">
            {registrationSteps.map((step, index) => {
              const isCompleted = completedSteps.includes(index);
              
              return (
                <div key={index} className="flex gap-6 md:gap-8">
                  {/* Step Number / Checkmark */}
                  <button
                    onClick={() => toggleStep(index)}
                    className={`w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-full flex items-center justify-center text-xl font-bold border-4 transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-accent border-accent text-primary-dark shadow-[0_0_20px_rgba(255,215,0,0.4)]' 
                        : 'bg-white dark:bg-primary border-slate-200 dark:border-white/20 text-slate-400 dark:text-slate-500 hover:border-accent hover:text-accent'
                    }`}
                  >
                    {isCompleted ? <Check className="w-6 h-6 md:w-8 md:h-8" /> : index + 1}
                  </button>
                  
                  {/* Step Content */}
                  <div className={`glass-panel rounded-2xl p-6 md:p-8 flex-1 transition-opacity duration-300 ${
                    isCompleted ? 'opacity-60' : 'opacity-100'
                  }`}>
                    <h3 className={`text-xl md:text-2xl font-bold mb-3 ${
                      isCompleted ? 'text-slate-500 dark:text-slate-400 line-through decoration-slate-400 decoration-2' : 'text-primary-dark dark:text-white'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-base md:text-lg ${
                      isCompleted ? 'text-slate-400 dark:text-slate-500' : 'text-slate-600 dark:text-slate-300'
                    }`}>
                      {step.description}
                    </p>
                    
                    {step.link && (
                      <a 
                        href={step.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 text-accent font-medium hover:underline"
                      >
                        Visit NVSP Portal <ExternalLink size={16} />
                      </a>
                    )}

                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => toggleStep(index)}
                        className={`text-sm font-semibold flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          isCompleted 
                            ? 'text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10' 
                            : 'text-primary-dark dark:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10'
                        }`}
                      >
                        {isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default Registration;
