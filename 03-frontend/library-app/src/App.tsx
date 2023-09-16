import React from "react";
import "./App.css";
import { Navbar } from "./layout/NavBarAndFooter/NavBar";
import { Footer } from "./layout/NavBarAndFooter/Footer";
import { HomePage } from "./layout/HomePage/HomePage";

export const App = () => {
  return (
    <div>
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
};

export default App;
