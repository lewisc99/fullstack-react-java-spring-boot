import { useState } from "react";
import { Redirect } from "react-router-dom";
import { AdminMessages } from "./components/AdminMessages";
import { isUserAuthenticated } from "../../Auth/AuthService";
import { AddNewBook } from "./components/AddNewBook";
import { ChangeQuantityOfBooks } from "./components/ChangeQuantityOfBooks";

export const ManageLibraryPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [changeQuantityOfBooksClick, setChangeQuantityOfBooksClick] =
    useState(false);
  const [messagesClick, setMessagesClick] = useState(false);

  isUserAuthenticated().then((result) => {
    setIsAuthenticated(result);
  });

  function addBookClickFunction() {
    setChangeQuantityOfBooksClick(false);
    setMessagesClick(false);
  }

  function changeQuantityOfBooksClickFunction() {
    setChangeQuantityOfBooksClick(true);
    setMessagesClick(false);
  }

  function messagesClickFunction() {
    setChangeQuantityOfBooksClick(false);
    setMessagesClick(true);
  }

  if (isAuthenticated === undefined) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="container mt-5">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="add-book-tab"
            data-bs-toggle="tab"
            href="#add-book-content">
            Add New Book
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="change-quantity-tab"
            data-bs-toggle="tab"
            href="#change-quantity-content">
            Change Quantity
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="messages-tab"
            data-bs-toggle="tab"
            href="#messages-content">
            Messages
          </a>
        </li>
      </ul>

      <div className="tab-content mt-2">
        <div className="tab-pane fade" id="add-book-content">
          <div className="row">
            <div className="col-md-12">
              <AddNewBook key={0}/>
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="change-quantity-content">
          <div className="row">
            <div className="col-md-12">
              <ChangeQuantityOfBooks  key={1}/>
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="messages-content">
          <div className="row">
            <div className="col-md-12">
              <AdminMessages key={2}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
