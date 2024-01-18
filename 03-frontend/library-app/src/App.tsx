import React from "react";
import "./App.css";
import { Navbar } from "./layout/NavBarAndFooter/NavBar";
import { Footer } from "./layout/NavBarAndFooter/Footer";
import { SearchBooksPage } from "./layout/SearchBooksPage/SearchBooksPage";
import { HomePage } from "./layout/HomePage/HomePage";
import { Redirect, Route, Switch } from "react-router-dom";
import { BookCheckoutPage } from "./layout/BookCheckoutPage/BookCheckoutPage";
import { LoginAuth } from "./Auth/LoginAuth";
import { ReviewListPage } from "./layout/BookCheckoutPage/ReviewListPage/ReviewListPage";
import { ShelfPage } from "./layout/ShelfPage/ShelfPage";
import ProtectedRoute from "./Auth/ProtectedRoute";

export const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/search">
            <SearchBooksPage />
          </Route>
          <Route path="/reviewList/:bookId">
            <ReviewListPage />
          </Route>
          <Route path="/checkout/:bookId">
            <BookCheckoutPage />
          </Route>
          <Route path="/login">
            <LoginAuth />
          </Route>
          <Route path="/shelf">
            <ProtectedRoute component={ShelfPage} />
          </Route>
        </Switch>
      </div>

      <Footer />
    </div>
  );
};

export default App;
