package com.luv2code.springbootlibrary.controller;

import com.luv2code.springbootlibrary.domain.request.ReviewRequest;
import com.luv2code.springbootlibrary.securities.JWTUtil;
import com.luv2code.springbootlibrary.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/secure/user/book")
    public Boolean reviewBookByUser(@RequestHeader(value="Authorization")
    String token, @RequestParam Long bookId) throws Exception {
        String userEmail = getEmailByToken(token);
        return reviewService.userReviewListed(userEmail,bookId);
    }

    @PostMapping("/secure")
    public void postReview(@RequestHeader(value="Authorization")
                               String token,@RequestBody ReviewRequest reviewRequest) throws  Exception{

        String userEmail = getEmailByToken(token);
        reviewService.postReview(userEmail, reviewRequest);
    }

    private String getEmailByToken(String token) throws  Exception {
        String jwt = token.substring(7);
        Map<String, List<String>> claims = JWTUtil.validateTokenAndRetrieveSubject(jwt);

        List<String> getEmail = new ArrayList<String>();
        getEmail = claims.get("email");
        if (getEmail.get(0) == null)
            throw new Exception("User email is missing ");
        return getEmail.get(0);
    }
}
