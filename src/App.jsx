import { BrowserRouter } from "react-router-dom";
import { About, Cards, Contact, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import ChatWidget from "./components/ChatWidget";
import { ThreeJsProvider } from "./utils/ThreeJsContext";

const App = () => {
  return (
    <BrowserRouter>
      <ThreeJsProvider>
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
          <ChatWidget />
        </div>
      </ThreeJsProvider>
    </BrowserRouter>
  );
}

export default App;
