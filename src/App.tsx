import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import Feed from "@/pages/Feed";
import HelpPage from "@/pages/HelpPage";
import NearbyDogs from "@/pages/NearbyDogs";
import Exposure from "@/pages/Exposure";
import MyProfile from "@/pages/MyProfile";
import CreatePost from "@/pages/CreatePost";

export default function App() {
  return (
    <Router basename="/pets">
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/nearby" element={<NearbyDogs />} />
          <Route path="/exposure" element={<Exposure />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}
