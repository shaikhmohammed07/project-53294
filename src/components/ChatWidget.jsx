import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

// Fallback mock responses since we don't have an API key
const MOCK_KNOWLEDGE_BASE = {
  default: "I'm your Election Guide Assistant. I can help answer questions about the Indian election process, eligibility, and how to vote. What would you like to know?",
  "age": "The minimum age to vote in India is 18 years.",
  "how to vote": "To vote, you first need to register on the NVSP portal and get your Voter ID. On election day, go to your designated polling booth with your Voter ID or another valid ID proof.",
  "evm": "EVM stands for Electronic Voting Machine. It is used to cast and record votes electronically.",
  "nota": "NOTA stands for 'None of the Above'. It allows voters to reject all candidates in their constituency.",
  "who conducts": "Elections in India are conducted by the Election Commission of India (ECI), an independent constitutional body.",
  "documents": "To register, you typically need proof of identity, proof of address, and proof of age (like Aadhaar, PAN card, or Passport).",
  "candidate": "To become a candidate for the Lok Sabha, you must be a citizen of India and at least 25 years old."
};

const getMockResponse = (input) => {
  const lowerInput = input.toLowerCase();
  for (const key in MOCK_KNOWLEDGE_BASE) {
    if (key !== 'default' && lowerInput.includes(key)) {
      return MOCK_KNOWLEDGE_BASE[key];
    }
  }
  return "I'm still learning! While I might not have the exact answer to that, you can check out the Guide or Timeline sections for detailed information about the election process.";
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: MOCK_KNOWLEDGE_BASE.default, sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI delay
    setTimeout(() => {
      const aiResponse = getMockResponse(userMsg.text);
      setMessages(prev => [...prev, { id: Date.now(), text: aiResponse, sender: 'ai' }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-accent text-primary-dark rounded-full shadow-lg flex items-center justify-center z-50 hover:shadow-xl transition-shadow"
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] bg-white dark:bg-primary-light rounded-2xl shadow-2xl z-50 flex flex-col border border-slate-200 dark:border-white/10 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary-dark p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-accent">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Election Assistant</h3>
                  <div className="flex items-center gap-1 text-xs text-slate-300">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span> Online
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-primary/50">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                      msg.sender === 'user' ? 'bg-primary text-white' : 'bg-accent text-primary-dark'
                    }`}>
                      {msg.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-white rounded-tr-sm' 
                        : 'bg-white dark:bg-primary-dark text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 rounded-tl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%] flex-row">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 bg-accent text-primary-dark">
                      <Bot size={12} />
                    </div>
                    <div className="p-3 rounded-2xl bg-white dark:bg-primary-dark border border-slate-200 dark:border-white/10 rounded-tl-sm flex gap-1">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-primary-light border-t border-slate-200 dark:border-white/10">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about elections..."
                  className="flex-1 px-4 py-2 bg-slate-100 dark:bg-primary-dark border-transparent focus:border-accent focus:ring-1 focus:ring-accent rounded-full text-sm text-primary-dark dark:text-white outline-none"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="w-10 h-10 rounded-full bg-accent text-primary-dark flex items-center justify-center disabled:opacity-50 transition-opacity"
                >
                  <Send size={16} className="ml-1" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
