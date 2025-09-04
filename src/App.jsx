import { BrowserRouter } from "react-router-dom";
import { About, Cards, Contact, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import { lazy, Suspense } from "react";

// Use lazy loading for ChatWidget to ensure it only loads on client-side
const ChatWidget = lazy(() => import("./components/ChatWidget"));

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Tech />
        <Cards />
        <Works />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
