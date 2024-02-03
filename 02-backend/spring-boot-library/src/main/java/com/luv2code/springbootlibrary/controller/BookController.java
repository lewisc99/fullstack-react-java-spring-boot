package com.luv2code.springbootlibrary.controller;

import com.luv2code.springbootlibrary.entity.Book;
import com.luv2code.springbootlibrary.responsemodels.ShelfCurrentLoansResponse;
import com.luv2code.springbootlibrary.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import static com.luv2code.springbootlibrary.securities.JWTUtil.getEmailByToken;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/secure/currentloans")
    public List<ShelfCurrentLoansResponse> currentLoans(@RequestHeader(value = "Authorization") String token) throws Exception {
        String userEmail = getEmailByToken(token);
        return bookService.currentLoans(userEmail);
    }

    @PutMapping("/secure/checkout")
    public Book checkoutBook(@RequestHeader("Authorization") String token, @RequestParam Long bookId) throws Exception {
        String userEmail = getEmailByToken(token);
        return bookService.checkoutBook(userEmail, bookId);
    }

    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutBookByUser(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) {
        String userEmail = getEmailByToken(token);
        return bookService.checkoutBookByUser(userEmail, bookId);
    }

    @GetMapping("/secure/currentloans/count")
    public int currentLoansCount(@RequestHeader(value = "Authorization") String token) {
        String userEmail = getEmailByToken(token);
        return bookService.currentLoansCount(userEmail);
    }

    @PutMapping("/secure/return")
    public void returnBook(@RequestHeader(value = "Authorization") String token,
                           @RequestParam Long bookId) throws Exception {
        String userEmail = getEmailByToken(token);
        bookService.returnBook(userEmail, bookId);
    }

    @PutMapping("/secure/renew/loan")
    public void renewLoan(@RequestHeader(value = "Authorization") String token,
                          @RequestParam Long bookId) throws Exception {
        String userEmail = getEmailByToken(token);
        bookService.renewLoan(userEmail, bookId);
    }
}
