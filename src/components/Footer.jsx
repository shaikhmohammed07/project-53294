import React from 'react';
import { Landmark, Globe, MessageCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-primary border-t border-slate-200 dark:border-primary-light pt-12 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group inline-flex">
              <Landmark className="h-6 w-6 text-accent group-hover:scale-110 transition-transform" />
              <span className="font-display font-bold text-lg tracking-tight text-primary-dark dark:text-white">
                Election<span className="text-accent">Guide</span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
              An AI-powered, interactive guide to understanding the democratic process and elections in India. Empowering voters through education.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-accent transition-colors">
                <span className="sr-only">Website</span>
                <Globe size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-accent transition-colors">
                <span className="sr-only">Contact</span>
                <MessageCircle size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-accent transition-colors">
                <span className="sr-only">Email</span>
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-primary-dark dark:text-white mb-4 uppercase tracking-wider text-sm">Features</h3>
            <ul className="space-y-3">
              <li><Link to="/guide" className="text-slate-500 dark:text-slate-400 hover:text-accent transition-colors">Step-by-step Guide</Link></li>
              <li><Link to="/timeline" className="text-slate-500 dark:text-slate-400 hover:text-accent transition-colors">Interactive Timeline</Link></li>
              <li><Link to="/eligibility" className="text-slate-500 dark:text-slate-400 hover:text-accent transition-colors">Eligibility Checker</Link></li>
              <li><Link to="/quiz" className="text-slate-500 dark:text-slate-400 hover:text-accent transition-colors">Knowledge Quiz</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-primary-dark dark:text-white mb-4 uppercase tracking-wider text-sm">Resources</h3>
            <ul className="space-y-3">
              <li><a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-accent transition-colors">Election Commission</a></li>
              <li><a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-accent transition-colors">Voter Portal</a></li>
              <li><Link to="/roles" className="text-slate-500 dark:text-slate-400 hover:text-accent transition-colors">Role Simulation</Link></li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-slate-200 dark:border-primary-light pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} Election Guide India. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 md:mt-0">
            Designed for educational purposes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
