package com.luv2code.springbootlibrary.controller;


import com.luv2code.springbootlibrary.requestmodels.AddBookRequest;
import com.luv2code.springbootlibrary.securities.JWTUtil;
import com.luv2code.springbootlibrary.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }


    @PutMapping("/secure/increase/book/quantity")
    public void increaseBookQuantity(@RequestHeader(value="Authorization") String token,
                                     @RequestParam Long bookId) throws  Exception {
        String jwt = token.substring(7);
        Map<String, List<String>> claims = JWTUtil.validateTokenAndRetrieveSubject(jwt);

        List<String> getRoles = new ArrayList<String>();
        List<String> getEmail = new ArrayList<String>();
        getEmail = claims.get("email");
        getRoles = claims.get("roles");

        if(!getRoles.contains("ADMIN")) {
            throw new Exception("Adminstration page only.");
        }
        adminService.increaseBookQuantity(bookId);
    }


    @PutMapping("/secure/decreased/book/quantity")
    public void decreasedBookQuantity(@RequestHeader(value="Authorization") String token,
                                     @RequestParam Long bookId) throws  Exception {
        String jwt = token.substring(7);
        Map<String, List<String>> claims = JWTUtil.validateTokenAndRetrieveSubject(jwt);

        List<String> getRoles = new ArrayList<String>();
        List<String> getEmail = new ArrayList<String>();
        getEmail = claims.get("email");
        getRoles = claims.get("roles");

        if(!getRoles.contains("ADMIN")) {
            throw new Exception("Adminstration page only.");
        }
        adminService.decreasedBookQuantity(bookId);
    }


    @PostMapping("/secure/add/book")
    public void postBook(@RequestHeader(value = "Authorization") String token,
                         @RequestBody AddBookRequest addBookRequest) throws  Exception {
        String jwt = token.substring(7);
        Map<String, List<String>> claims = JWTUtil.validateTokenAndRetrieveSubject(jwt);

        List<String> getRoles = new ArrayList<String>();
        List<String> getEmail = new ArrayList<String>();
        getEmail = claims.get("email");
        getRoles = claims.get("roles");

        if(!getRoles.contains("ADMIN")) {
            throw new Exception("Adminstration page only.");
        }
       adminService.postBook(addBookRequest);
    }

    @DeleteMapping("/secure/delete/book")
    public void deleteBook(@RequestHeader(value = "Authorization") String token,
                         @RequestParam Long bookId) throws  Exception {
        String jwt = token.substring(7);
        Map<String, List<String>> claims = JWTUtil.validateTokenAndRetrieveSubject(jwt);

        List<String> getRoles = new ArrayList<String>();
        List<String> getEmail = new ArrayList<String>();
        getEmail = claims.get("email");
        getRoles = claims.get("roles");

        if(!getRoles.contains("ADMIN")) {
            throw new Exception("Adminstration page only.");
        }
        adminService.deleteBook(bookId);
    }
}
