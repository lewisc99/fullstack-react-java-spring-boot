import { useState } from "react";
import { Redirect } from "react-router-dom";
import { AdminMessages } from "./components/AdminMessages";
import { isUserAuthenticated } from "../../Auth/AuthService";

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
            className="nav-link"
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
        <div className="tab-pane fade show active" id="name-content">
          <div className="row">
            <div className="col-md-12">
              <h3>Name</h3>
              <p>1</p>
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="add-book-content">
          <div className="row">
            <div className="col-md-12">
              <h3>Add New Book</h3>
              <p>2</p>
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="change-quantity-content">
          <div className="row">
            <div className="col-md-12">
              <h3>Change Quantity</h3>
              <p>3</p>
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="messages-content">
          <div className="row">
            <div className="col-md-12">
              <h3>Messages</h3>
              <AdminMessages />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
