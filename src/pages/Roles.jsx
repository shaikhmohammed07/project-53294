import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCircle, Shield, Briefcase, ChevronRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import rolesData from '../data/roles.json';

const iconMap = {
  'voter': <UserCircle size={32} />,
  'candidate': <Briefcase size={32} />,
  'officer': <Shield size={32} />
};

const Roles = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const activeRoleData = selectedRole ? rolesData.find(r => r.id === selectedRole) : null;

  return (
    <PageTransition className="pt-24 pb-32 bg-slate-50 dark:bg-primary-dark min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4"
          >
            Roleplay
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary-dark dark:text-white mb-6"
          >
            Choose Your Role
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Experience the election from different perspectives. Select a role below to understand their specific duties and flow.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {rolesData.map((role, index) => (
            <motion.button
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => setSelectedRole(role.id)}
              className={`glass-panel rounded-2xl p-8 text-center transition-all duration-300 border-2 ${
                selectedRole === role.id 
                  ? 'border-accent bg-white dark:bg-primary shadow-[0_0_30px_rgba(255,215,0,0.15)] transform -translate-y-2' 
                  : 'border-transparent hover:border-accent/50 hover:-translate-y-1'
              }`}
            >
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 transition-colors ${
                selectedRole === role.id 
                  ? 'bg-accent text-primary-dark' 
                  : 'bg-slate-100 dark:bg-white/5 text-primary-dark dark:text-white'
              }`}>
                {iconMap[role.id]}
              </div>
              <h3 className="text-2xl font-bold text-primary-dark dark:text-white mb-3">{role.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{role.description}</p>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeRoleData && (
            <motion.div
              key={activeRoleData.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-panel rounded-3xl p-8 md:p-12 shadow-xl border border-accent/20"
            >
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="md:w-1/3 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-primary-dark dark:text-white mb-4">
                    The {activeRoleData.title} Flow
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300">
                    As a {activeRoleData.title.toLowerCase()}, you play a crucial role in ensuring the democratic process functions smoothly. Here is what your typical journey looks like.
                  </p>
                </div>
                
                <div className="md:w-2/3 w-full">
                  <div className="space-y-4">
                    {activeRoleData.tasks.map((task, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (idx * 0.1) }}
                        key={idx} 
                        className="flex items-center gap-4 bg-white/50 dark:bg-primary-light/50 p-4 rounded-xl border border-slate-200 dark:border-white/5"
                      >
                        <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold shrink-0">
                          {idx + 1}
                        </div>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{task}</p>
                        <ChevronRight className="w-5 h-5 text-slate-400 ml-auto" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
};

export default Roles;
