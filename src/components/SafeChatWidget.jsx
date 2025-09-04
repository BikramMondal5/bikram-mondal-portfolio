import React, { useState, useEffect } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import SimpleChatWidget from "./SimpleChatWidget";

// This component adds an extra safety layer around the chat widget
const SafeChatWidget = () => {
  const [hasError, setHasError] = useState(false);
  
  // Detect if we're running in development or production
  const isProd = process.env.NODE_ENV === 'production';
  
  // If there was an error and we're in production, don't render the widget
  if (hasError && isProd) {
    console.log("Chat widget had an error and was disabled");
    return null;
  }
  
  // Use the error boundary to catch any errors
  return (
    <ErrorBoundary onError={() => setHasError(true)}>
      <SimpleChatWidget />
    </ErrorBoundary>
  );
};

export default SafeChatWidget;
