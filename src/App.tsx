import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


// Import components
import HomePage from "./presentation/components/pages/HomePage";
import ProfilePage from "./presentation/components/pages/ProfilePage";

// For test api call
import TestAPI from "./TestAPI";
import SettingPage from "./presentation/components/pages/SettingPage";
import HelpPage from "./presentation/components/pages/HelpPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/testapi" element={<TestAPI />} />
      </Routes>
    </Router>
  );
};

export default App;