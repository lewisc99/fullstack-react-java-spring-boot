import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import { LatestReviews } from "./LatestReviews";
import { fetchWithAuth } from "../../Auth/fetchWithAuth";
import { isUserAuthenticated } from "../../Auth/AuthService";

export const BookCheckoutPage = () => {
  const [book, setBook] = useState<BookModel>();
  const [isLoadingBook, setIsLoadingBook] = useState(true);
  const [httpError, setHttpError] = useState(null);

  //Review State
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  //Looans Count State
  const [currentLoansCount, setCurrentLoansCount] = useState(0);
  const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] =
    useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const bookId = window.location.pathname.split("/")[2];

  //Is Book Check Out?
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isLoadingBookCheckedOut, setIsLoadingBookCheckedOut] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;

      const response = await fetchWithAuth(baseUrl);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseJson = await response.json();
      const loadedBook: BookModel = {
        id: responseJson.id,
        title: responseJson.title,
        author: responseJson.author,
        description: responseJson.description,
        copies: responseJson.copies,
        copiesAvailable: responseJson.copiesAvailable,
        category: responseJson.category,
        img: responseJson.img,
      };

      setBook(loadedBook);
      setIsLoadingBook(false);
    };

    fetchBooks().catch((error: any) => {
      setIsLoadingBook(false);
      setHttpError(error.message);
    });
  }, [isCheckedOut]); //if checkecout changes it will trigger this useEffect.

  useEffect(() => {
    const fetchBookReviews = async () => {
      const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;

      const responseReviews = await fetchWithAuth(reviewUrl);

      if (!responseReviews.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJsonReviews = await responseReviews.json();
      const responseData = responseJsonReviews._embedded.reviews;
      const loadedReviews: ReviewModel[] = [];
      let weightedStarReviews: number = 0;
      for (const key in responseData) {
        loadedReviews.push({
          id: responseData[key].id,
          userEmail: responseData[key].userEmail,
          date: responseData[key].date,
          rating: responseData[key].rating,
          book_id: responseData[key].bookId,
          reviewDescription: responseData[key].reviewDescription,
        });
        weightedStarReviews = weightedStarReviews + responseData[key].rating;
      }

      if (loadedReviews) {
        const round = (
          Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2
        ).toFixed(1);
        setTotalStars(Number(round));
      }
      setReviews(loadedReviews);
      setIsLoadingReview(false);
    };
    fetchBookReviews().catch((error: any) => {
      setIsLoadingReview(false);
      setHttpError(error.message);
    });
  }, []);

  useEffect(() => {
    isUserAuthenticated().then((result) => {
      debugger;
      setIsAuthenticated(result);
      if (isAuthenticated) {
        const url: string = `http://localhost:8080/api/books/secure/currentloans/count`;
        const requestOptions = {
          method: "GET",
        };
        fetchWithAuth(url, requestOptions).then(async (result) =>
          setCurrentLoansCount(Number(await result.json()) || 0)
        );
      }
      setIsLoadingCurrentLoansCount(false);
    });

    const fetchUserCurrentLoansCount = async () => {};
    fetchUserCurrentLoansCount().catch((error: any) => {
      setIsLoadingCurrentLoansCount(false);
      setHttpError(error.message);
    });
  }, [isAuthenticated, isCheckedOut]);

  useEffect(() => {
    const fetchUserCheckedOutBook = async () => {
      if (isAuthenticated) {
        const url: string = `http://localhost:8080/api/books/secure/ischeckedout/byuser?bookId=${bookId}`;
        const requestOptions = {
          method: "GET",
        };
        fetchWithAuth(url, requestOptions).then(async (result) =>
          setIsCheckedOut(await result.json())
        );
      }
      setIsLoadingBookCheckedOut(false);
    };

    fetchUserCheckedOutBook().catch((error: any) => {
      setIsLoadingBookCheckedOut(false);
      setHttpError(error.message);
    });
  }, [isAuthenticated]);

  if (
    isLoadingBook ||
    isLoadingReview ||
    isLoadingCurrentLoansCount ||
    isLoadingBookCheckedOut
  ) {
    return <SpinnerLoading />;
  }
  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  async function checkoutBook() {
    const url: string = `http://localhost:8080/api/books/secure/checkout/?bookId=${bookId}`;

    const requestOptions = {
      method: "PUT",
    };
    fetchWithAuth(url, requestOptions).then(async () => setIsCheckedOut(true));
  }
  return (
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            {book?.img ? (
              <img src={book?.img} width="226" height="349" alt="book" />
            ) : (
              <img
                src={require("./../../Images/BooksImages/book-luv2code-1000.png")}
                width="226"
                height="349"
                alt="Book"
              />
            )}
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{book?.title}</h2>
              <h5 className="text-primary">{book?.author}</h5>
              <p className="lead">{book?.description}</p>
              <StarsReview rating={totalStars} size={32} />
            </div>
          </div>
          <CheckoutAndReviewBox
            book={book}
            mobile={false}
            currentLoansCount={currentLoansCount}
            isAuthenticated={isAuthenticated}
            isCheckedOut={isCheckedOut}
            checkoutBook={checkoutBook}
          />
        </div>
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
      </div>
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-items-center">
          {book?.img ? (
            <img src={book?.img} width="226" height="349" alt="book" />
          ) : (
            <img
              src={require("./../../Images/BooksImages/book-luv2code-1000.png")}
              width="226"
              height="349"
              alt="Book"
            />
          )}
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h5 className="text-primary">{book?.author}</h5>
            <p className="lead">{book?.description}</p>
            <StarsReview rating={totalStars} size={32} />
          </div>
        </div>
        <CheckoutAndReviewBox
          book={book}
          mobile={true}
          currentLoansCount={currentLoansCount}
          isAuthenticated={isAuthenticated}
          isCheckedOut={isCheckedOut}
          checkoutBook={checkoutBook}
        />
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
      </div>
    </div>
  );
};
