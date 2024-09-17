import React from "react";
import "./App.css";

// For test api call
import TestAPI from "./TestAPI";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="hello">Hello World</div>
      <TestAPI />
    </div>
  );
};

export default App;