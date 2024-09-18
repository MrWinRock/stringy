import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


// Import components
import Profile from "./presentation/components/profile/Profile";
import HomePage from "./presentation/components/pages/HomePage";

// For test api call
import TestAPI from "./TestAPI";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/testapi" element={<TestAPI />} />
      </Routes>
    </Router>
  );
};

export default App;