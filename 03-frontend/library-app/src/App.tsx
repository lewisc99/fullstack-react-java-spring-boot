import React from "react";
import "./App.css";
import { Navbar } from "./layout/NavBarAndFooter/NavBar";
import { Footer } from "./layout/NavBarAndFooter/Footer";
import { SearchBooksPage } from "./layout/SearchBooksPage/SearchBooksPage";

export const App = () => {
  return (
    <div>
      <Navbar />
      {/* <HomePage /> */}
      <SearchBooksPage />
      <Footer />
    </div>
  );
};

export default App;
