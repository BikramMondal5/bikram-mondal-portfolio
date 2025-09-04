import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
// Only using React and framer-motion - avoiding any problematic imports

// A simplified chat widget that doesn't use any browser APIs
// This will help determine if the issue is with specific APIs or the overall implementation
const SimpleChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Safety check to ensure we're rendering on client side
  useEffect(() => {
    // This will only run in the browser, not during SSR
    setIsClient(true);
    
    // Add safety measure to prevent entire page from being affected
    const handleError = (event) => {
      console.error('Error in ChatWidget:', event.error);
      // Prevent the error from bubbling up and affecting the rest of the page
      event.stopPropagation();
      event.preventDefault();
      return true;
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  
  // Simple animation variants
  const widgetVariants = {
    closed: { scale: 0, opacity: 0, y: 20 },
    open: { scale: 1, opacity: 1, y: 0 },
  };

  // Only render if we're on the client side
  if (!isClient) return null;
  
  return (
    <div className="chat-widget-container" style={{ position: 'fixed', bottom: 0, right: 0, zIndex: 9999, pointerEvents: 'none' }}>
      {/* Chat button - with pointerEvents set to auto so it can receive clicks */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-0 border-2 border-white/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{ pointerEvents: 'auto' }}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </motion.button>

      {/* Chat widget */}
      {isOpen && (
        <motion.div
          className="fixed bottom-24 right-5 w-80 sm:w-96 bg-[#121212] rounded-2xl overflow-hidden shadow-2xl border border-purple-600/30"
          variants={widgetVariants}
          initial="closed"
          animate="open"
          exit="closed"
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          style={{ pointerEvents: 'auto', zIndex: 9999 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#7c3aed] to-[#9b5de5] p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white font-bold">B</span>
              </div>
              <div>
                <h3 className="text-white font-medium">Bikram.AI</h3>
                <p className="text-purple-100 text-xs opacity-80">Simple Version</p>
              </div>
            </div>
            <button 
              className="text-white hover:bg-white/10 p-1 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* Chat body */}
          <div className="h-80 p-4 overflow-y-auto">
            <div className="bg-[#1e1e1e] rounded-2xl rounded-tl-none p-3 max-w-[80%] text-gray-100">
              <p className="text-sm">Hi there! This is a simplified version of the chat widget to help troubleshoot the black screen issue.</p>
            </div>
          </div>
          
          {/* Chat input */}
          <div className="bg-[#1a1a1a] p-3 border-t border-[#333]">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-[#262626] text-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
                readOnly
              />
              <button className="bg-gradient-to-r from-purple-600 to-[#9b5de5] text-white p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SimpleChatWidget;
