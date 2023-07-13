import React from "react";
import "./App.css";
import MachineTypes from "./MachineTypes";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-white text-4xl font-semibold text-center">
            Construction Machine Management Inc.
          </h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <MachineTypes />
      </main>
      <footer className="bg-gray-200 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            © 2023 Motunrayo Odusina Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
