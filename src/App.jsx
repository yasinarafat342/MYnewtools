import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Timeline from "./pages/Timeline";
import Stats from "./pages/Stats";
import FriendDetail from "./pages/FriendDetail";
import NotFound from "./pages/NotFound"; 
import { InteractionProvider } from "./InteractionContext";

function App() {
  return (
    <InteractionProvider>
      <div className="min-h-screen flex flex-col font-['Inter',sans-serif] bg-[#F9FAFB]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
           
            <Route path="/" element={<Home />} />
            
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/stats" element={<Stats />} />
            
          
            <Route path="/friend/:id" element={<FriendDetail />} />

           
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </InteractionProvider>
  );
}

export default App;