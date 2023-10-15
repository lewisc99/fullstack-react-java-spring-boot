package com.luv2code.springbootlibrary.controller;


import com.luv2code.springbootlibrary.entity.Book;
import com.luv2code.springbootlibrary.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @PutMapping("/secure/checkout")
    public Book checkoutBook(@RequestParam Long bookId) throws Exception {
        String userEmail = "testuser@gmail.com";
        return bookService.checkoutBook(userEmail, bookId);
    }

    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutBookByUser(@RequestParam Long bookId) {
        String userEmail = "testuser@gmail.com";
        return bookService.checkoutBookByUser(userEmail, bookId);
    }

    @GetMapping("/secure/currentloans/count")
    public int currentLoansCount() {
        String userEmail = "testuser@gmail.com";
        return bookService.currentLoansCount(userEmail);
    }
}
