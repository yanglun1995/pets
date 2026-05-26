import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Home from "@/pages/Home";
import Exchange from "@/pages/Exchange";
import Help from "@/pages/Help";
import Events from "@/pages/Events";
import Exposure from "@/pages/Exposure";
import About from "@/pages/About";

export default function App() {
  return (
    <Router basename="/pets">
      <div className="min-h-screen flex flex-col pb-20 md:pb-0">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exchange" element={<Exchange />} />
            <Route path="/help" element={<Help />} />
            <Route path="/events" element={<Events />} />
            <Route path="/exposure" element={<Exposure />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
}
