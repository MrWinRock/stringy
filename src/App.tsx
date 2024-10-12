import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


// Import components
import HomePage from "./presentation/components/pages/HomePage";
import ProfilePage from "./presentation/components/pages/ProfilePage";
import SettingPage from "./presentation/components/pages/SettingPage";
import AboutPage from "./presentation/components/pages/AboutPage";
import CreatePostPage from "./presentation/components/pages/CreatePostPage";

// For test api call
import TestAPI from "./TestAPI";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/testapi" element={<TestAPI />} />
        <Route path="/create-post" element={<CreatePostPage />} />
      </Routes>
    </Router>
  );
};

export default App;