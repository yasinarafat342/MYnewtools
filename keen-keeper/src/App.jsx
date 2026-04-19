import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Timeline from "./pages/Timeline";
import Stats from "./pages/Stats";
import FriendDetail from "./pages/FriendDetail";
import NotFound from "./pages/NotFound"; // NotFound পেজটি ইম্পোর্ট করলাম
import { InteractionProvider } from "./InteractionContext";

function App() {
  return (
    <InteractionProvider>
      <div className="min-h-screen flex flex-col font-['Inter',sans-serif] bg-[#F9FAFB]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Home Page: এখানে লোডিং অ্যানিমেশন থাকবে */}
            <Route path="/" element={<Home />} />
            
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/stats" element={<Stats />} />
            
            {/* Dynamic Route for Friend Details */}
            <Route path="/friend/:id" element={<FriendDetail />} />

            {/* 404 Page: যেকোনো ভুল পাথের জন্য এই পেজটি দেখাবে */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </InteractionProvider>
  );
}

export default App;