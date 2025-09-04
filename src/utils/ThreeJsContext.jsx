import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context for managing Three.js scenes
const ThreeJsContext = createContext({
  isPaused: false,
  pauseThreeJs: () => {},
  resumeThreeJs: () => {}
});

export const useThreeJs = () => useContext(ThreeJsContext);

export const ThreeJsProvider = ({ children }) => {
  const [isPaused, setIsPaused] = useState(false);
  
  // Function to pause Three.js rendering
  const pauseThreeJs = () => {
    try {
      setIsPaused(true);
      
      // Try to access the Three.js renderer if it exists
      if (window.threeJsRenderer) {
        window.threeJsRenderer.domElement.style.opacity = '0';
      }
      
      // Dispatch an event that Three.js components can listen for
      window.dispatchEvent(new CustomEvent('pauseThreeJs'));
    } catch (error) {
      console.warn('Error pausing Three.js:', error);
    }
  };
  
  // Function to resume Three.js rendering
  const resumeThreeJs = () => {
    try {
      setIsPaused(false);
      
      // Try to access the Three.js renderer if it exists
      if (window.threeJsRenderer) {
        window.threeJsRenderer.domElement.style.opacity = '1';
      }
      
      // Dispatch an event that Three.js components can listen for
      window.dispatchEvent(new CustomEvent('resumeThreeJs'));
    } catch (error) {
      console.warn('Error resuming Three.js:', error);
    }
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      resumeThreeJs();
    };
  }, []);
  
  return (
    <ThreeJsContext.Provider value={{ isPaused, pauseThreeJs, resumeThreeJs }}>
      {children}
    </ThreeJsContext.Provider>
  );
};

export default ThreeJsContext;
