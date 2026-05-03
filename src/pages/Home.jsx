import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, ShieldCheck, BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-accent" />,
      title: "Step-by-Step Guide",
      description: "Understand the entire election process from announcement to counting.",
      link: "/guide"
    },
    {
      icon: <Clock className="w-8 h-8 text-accent" />,
      title: "Interactive Timeline",
      description: "Explore what happens before, during, and after the elections.",
      link: "/timeline"
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-accent" />,
      title: "Eligibility Checker",
      description: "Quickly verify your eligibility to vote with our smart logic checker.",
      link: "/eligibility"
    },
    {
      icon: <BrainCircuit className="w-8 h-8 text-accent" />,
      title: "Knowledge Quiz",
      description: "Test your understanding of Indian democracy and earn points.",
      link: "/quiz"
    }
  ];

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent mb-8"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
              </span>
              <span className="text-sm font-medium tracking-wide uppercase">Interactive Learning Experience</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-primary-dark dark:text-white"
            >
              Democracy, <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#FF9933]">Simplified.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Your AI-powered guide to understanding the Indian election process. Learn, interact, and empower yourself as a responsible citizen.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-4"
            >
              <Link to="/guide" className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center text-lg">
                Start Learning <ArrowRight size={20} />
              </Link>
              <Link to="/eligibility" className="btn-outline w-full sm:w-auto justify-center text-lg">
                Check Eligibility
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#FF9933]/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50 dark:bg-primary-light/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark dark:text-white mb-4">Explore the Platform</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">Everything you need to know about the democratic process in one interactive place.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link to={feature.link} className="block h-full">
                  <div className="glass-panel rounded-2xl p-8 h-full hover:border-accent/50 transition-colors group">
                    <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-primary-light flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-primary-dark dark:text-white mb-3">{feature.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
