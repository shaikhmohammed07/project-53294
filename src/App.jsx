import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import ChatWidget from './components/ChatWidget';

// Pages
import Home from './pages/Home';
import Guide from './pages/Guide';
import TimelinePage from './pages/TimelinePage';
import Eligibility from './pages/Eligibility';
import Registration from './pages/Registration';
import Quiz from './pages/Quiz';
import Roles from './pages/Roles';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/eligibility" element={<Eligibility />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/roles" element={<Roles />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time for the preloader
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px] pointer-events-none -z-10"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary-light/20 blur-[120px] pointer-events-none -z-10 dark:bg-white/5"></div>
        
        <Navbar />
        <main className="flex-grow flex flex-col">
          <AnimatedRoutes />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </Router>
  );
}

export default App;
