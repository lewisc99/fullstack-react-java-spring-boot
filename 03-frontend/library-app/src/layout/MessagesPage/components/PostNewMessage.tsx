import { useState } from "react";
import MessageModel from "../../../models/MessageModel";
import { fetchWithAuth } from "../../../Auth/fetchWithAuth";

export const PostNewMessage = () => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  async function submitNewQuestion() {
    const url = `http://localhost:8080/api/messages/secure/add/message`;

    if (title !== "" && question !== "") {
      const messageRequestModel: MessageModel = new MessageModel(
        title,
        question
      );

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageRequestModel),
      };

      const submitNewQuestionResponse = await fetchWithAuth(
        url,
        requestOptions
      );

      if (!submitNewQuestionResponse.ok) {
        setDisplayWarning(true);
        setDisplaySuccess(false);
        throw new Error("Something went Wrong!");
      }

      setTitle("");
      setQuestion("");
      setDisplayWarning(false);
      setDisplaySuccess(true);
    } else {
      setDisplayWarning(true);
      setDisplaySuccess(false);
    }
  }

  return (
    <div className="card mt-3">
      <div className="card-header">Ask question to Luv 2 Read Admin</div>
      <div className="card-body">
        <form method="post">
          {displayWarning && (
            <div className="alert alert-danger" role="alert">
              All fields must be filled out
            </div>
          )}
          {displaySuccess && (
            <div className="alert alert-success" role="alert">
              Question added successfully
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Question</label>
            <textarea
              className="form-control"
              id="exampleFormControlInput1"
              rows={3}
              onChange={(e) => setQuestion(e.target.value)}
              value={question}></textarea>
          </div>
          <div>
            <button
              className="btn btn-primary mt-3"
              type="button"
              onClick={submitNewQuestion}>
              Submit Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
