import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const Eligibility = () => {
  const [formData, setFormData] = useState({
    age: '',
    citizenship: '',
    criminalRecord: ''
  });
  
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear result when changing inputs
    setResult(null);
  };

  const checkEligibility = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.age || !formData.citizenship || !formData.criminalRecord) {
      setResult({
        status: 'error',
        message: 'Please answer all questions to check eligibility.'
      });
      return;
    }

    const ageNum = parseInt(formData.age, 10);
    
    // Logic:
    // Age >= 18 AND Citizen == 'yes'
    // Criminal Record: Convicted of certain offenses can disqualify, but for simplicity:
    // If convicted and sentenced to >= 2 years, disqualified for 6 years from release.
    // We'll use a simplified logic here as per requirements: If age >= 18 AND citizen = yes -> Eligible (with caveat about criminal record)

    if (ageNum < 18) {
      setResult({
        status: 'ineligible',
        message: 'You are not eligible to vote.',
        reason: `You must be at least 18 years old. You are currently ${ageNum}.`
      });
    } else if (formData.citizenship === 'no') {
      setResult({
        status: 'ineligible',
        message: 'You are not eligible to vote.',
        reason: 'Only Indian citizens are eligible to vote in Indian elections.'
      });
    } else if (formData.criminalRecord === 'yes') {
      setResult({
        status: 'warning',
        message: 'Eligibility depends on the nature of the conviction.',
        reason: 'Under Section 8 of the Representation of the People Act, 1951, a person convicted of certain offences and sentenced to imprisonment for not less than two years shall be disqualified from the date of such conviction and shall continue to be disqualified for a further period of six years since his release.'
      });
    } else {
      setResult({
        status: 'eligible',
        message: 'Congratulations! You are eligible to vote.',
        reason: 'You meet the basic criteria of being an Indian citizen of 18 years or above with no disqualifying criminal record.'
      });
    }
  };

  return (
    <PageTransition className="pt-24 pb-32 bg-slate-50 dark:bg-primary-dark min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4"
          >
            Verification
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-primary-dark dark:text-white mb-6"
          >
            Check Your Eligibility
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-300"
          >
            Answer a few quick questions to find out if you can participate in the upcoming elections.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel rounded-2xl p-8 shadow-xl"
        >
          <form onSubmit={checkEligibility} className="space-y-8">
            
            {/* Age Question */}
            <div>
              <label className="block text-lg font-medium text-primary-dark dark:text-white mb-4">
                1. What is your current age?
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                min="0"
                max="120"
                placeholder="Enter your age"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-primary-light focus:outline-none focus:ring-2 focus:ring-accent text-primary-dark dark:text-white"
              />
            </div>

            {/* Citizenship Question */}
            <div>
              <label className="block text-lg font-medium text-primary-dark dark:text-white mb-4">
                2. Are you an Indian citizen?
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="citizenship"
                    value="yes"
                    checked={formData.citizenship === 'yes'}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-accent focus:ring-accent border-slate-300"
                  />
                  <span className="text-slate-700 dark:text-slate-300 group-hover:text-primary-dark dark:group-hover:text-white">Yes</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="citizenship"
                    value="no"
                    checked={formData.citizenship === 'no'}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-accent focus:ring-accent border-slate-300"
                  />
                  <span className="text-slate-700 dark:text-slate-300 group-hover:text-primary-dark dark:group-hover:text-white">No</span>
                </label>
              </div>
            </div>

            {/* Criminal Record Question */}
            <div>
              <label className="block text-lg font-medium text-primary-dark dark:text-white mb-4">
                3. Have you been convicted of an offence and sentenced to imprisonment for not less than two years?
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="criminalRecord"
                    value="yes"
                    checked={formData.criminalRecord === 'yes'}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-accent focus:ring-accent border-slate-300"
                  />
                  <span className="text-slate-700 dark:text-slate-300 group-hover:text-primary-dark dark:group-hover:text-white">Yes</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="criminalRecord"
                    value="no"
                    checked={formData.criminalRecord === 'no'}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-accent focus:ring-accent border-slate-300"
                  />
                  <span className="text-slate-700 dark:text-slate-300 group-hover:text-primary-dark dark:group-hover:text-white">No</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-primary py-4 text-lg font-bold flex justify-center items-center"
            >
              Check Eligibility
            </button>
          </form>

          {/* Results Area */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className={`p-6 rounded-xl border ${
                  result.status === 'eligible' ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' :
                  result.status === 'ineligible' ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' :
                  result.status === 'warning' ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800' :
                  'bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex-shrink-0">
                      {result.status === 'eligible' && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                      {result.status === 'ineligible' && <XCircle className="w-6 h-6 text-red-500" />}
                      {result.status === 'warning' && <AlertCircle className="w-6 h-6 text-yellow-500" />}
                      {result.status === 'error' && <AlertCircle className="w-6 h-6 text-slate-500" />}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold mb-2 ${
                        result.status === 'eligible' ? 'text-green-800 dark:text-green-400' :
                        result.status === 'ineligible' ? 'text-red-800 dark:text-red-400' :
                        result.status === 'warning' ? 'text-yellow-800 dark:text-yellow-400' :
                        'text-slate-800 dark:text-slate-200'
                      }`}>
                        {result.message}
                      </h3>
                      {result.reason && (
                        <p className={`text-sm ${
                          result.status === 'eligible' ? 'text-green-700 dark:text-green-300' :
                          result.status === 'ineligible' ? 'text-red-700 dark:text-red-300' :
                          result.status === 'warning' ? 'text-yellow-700 dark:text-yellow-300' :
                          'text-slate-600 dark:text-slate-400'
                        }`}>
                          {result.reason}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Eligibility;
