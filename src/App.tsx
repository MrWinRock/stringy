import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import components
import HomePage from "./presentation/components/pages/HomePage";
import ProfilePage from "./presentation/components/pages/ProfilePage";
import SettingPage from "./presentation/components/pages/SettingPage";
import AboutPage from "./presentation/components/pages/AboutPage";
import CreatePostPage from "./presentation/components/pages/CreatePostPage";
import InPostPage from "./presentation/components/pages/InPostPage";
import RoomPage from "./presentation/components/pages/RoomPage";
import CreateRoomPage from "./presentation/components/pages/CreateRoomPage";
import HelpPage from "./presentation/components/pages/HelpPage";

// For test api call
import TestAPI from "./TestAPI";
import ExplorePage from "./presentation/components/pages/ExplorePage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/testapi" element={<TestAPI />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/create-room" element={<CreateRoomPage />} />
        <Route path="/:roomTitle/:postId" element={<InPostPage />} />
        <Route path="/:room_id" element={<RoomPage />} />
        <Route path="/explore" element={<ExplorePage />} />
      </Routes>
    </Router>
  );
};

export default App;