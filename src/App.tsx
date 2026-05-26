import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Feed from "@/pages/Feed";
import Exchange from "@/pages/Exchange";
import Help from "@/pages/Help";
import Events from "@/pages/Events";
import Exposure from "@/pages/Exposure";
import About from "@/pages/About";
import PostDetail from "@/pages/PostDetail";
import VideoFeed from "@/pages/VideoFeed";
import PetProfile from "@/pages/PetProfile";
import NearbyDogs from "@/pages/NearbyDogs";

export default function App() {
  return (
    <Router basename="/pets">
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/help" element={<Help />} />
          <Route path="/events" element={<Events />} />
          <Route path="/exposure" element={<Exposure />} />
          <Route path="/about" element={<About />} />
          <Route path="/video" element={<VideoFeed />} />
          <Route path="/nearby" element={<NearbyDogs />} />
          <Route path="/profile/:id" element={<PetProfile />} />
          <Route path="/post/:type/:id" element={<PostDetail />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}