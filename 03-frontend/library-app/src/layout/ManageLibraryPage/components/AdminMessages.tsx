import { useEffect, useState } from "react";
import { isUserAuthenticated } from "../../../Auth/AuthService";
import MessageModel from "../../../models/MessageModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { fetchWithAuth } from "../../../Auth/fetchWithAuth";
import { Pagination } from "../../Utils/Pagination";
import { AdminMessage } from "./AdminMessage";
import AdminMessageRequest from "../../../models/AdminMessageRequest";

export const AdminMessages = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  isUserAuthenticated().then((result) => {
    setIsAuthenticated(result);
  });

  //Normal loading Pieces
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [httpError, setHttpError] = useState(null);

  //Messages Endpoint State
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [messagesPerPage] = useState(5);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  //Recall useEffect
  const [btnSubmit, setBtnSubmit] = useState(false);

  useEffect(() => {
    const fetchUserMessages = async () => {
      if (isAuthenticated) {
        const url = `http://localhost:8080/api/messages/search/findByClosed/?closed=false&page=${
          currentPage - 1
        }&size=${messagesPerPage}`;
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "GET",
            Accept: "*/*",
          },
        };
        const messagesResponse = await fetchWithAuth(url, requestOptions);
        if (!messagesResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const messagesResponseJson = await messagesResponse.json();

        setMessages(messagesResponseJson._embedded.messages);
        setTotalPages(messagesResponseJson.page.totalPages);
      }
      setIsLoadingMessages(false);
    };
    fetchUserMessages().catch((error: any) => {
      setIsLoadingMessages(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [isAuthenticated, currentPage, btnSubmit]);

  if (isLoadingMessages) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  async function SubmitResponseToQuestion(id: number, response: string) {
    const url = `http://localhost:8080/api/messages/secure/admin/message`;
    if (isAuthenticated) {
      const messageAdminRequestModel: AdminMessageRequest =
        new AdminMessageRequest(id, response);
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify(messageAdminRequestModel),
      };

      const messageAdminRequestModelResponse = await fetchWithAuth(
        url,
        requestOptions
      );
      if (!messageAdminRequestModelResponse.ok) {
        throw new Error("Something went wrong!");
      }
      setBtnSubmit(!btnSubmit);
    }
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="mt-3">
      {messages.length > 0 ? (
        <>
          <h5>Pending Q/A</h5>
          {messages.map((message) => (
            <AdminMessage message={message} key={message.id} submitResponseToQuestion={SubmitResponseToQuestion} />
          ))}
        </>
      ) : (
        <h5>No Pending Q/A</h5>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      )}
    </div>
  );
};
