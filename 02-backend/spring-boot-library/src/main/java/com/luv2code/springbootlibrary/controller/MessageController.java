package com.luv2code.springbootlibrary.controller;


import com.luv2code.springbootlibrary.entity.Message;
import com.luv2code.springbootlibrary.requestmodels.AdminQuestionRequest;
import com.luv2code.springbootlibrary.securities.JWTUtil;
import com.luv2code.springbootlibrary.services.MessageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.luv2code.springbootlibrary.securities.JWTUtil.getEmailByToken;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private MessageService messageService;
    private static final Logger logger = LoggerFactory.getLogger(MessageController.class);


    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/secure/add/message")
    public void postMessage(@RequestHeader(value = "Authorization") String token,
                            @RequestBody Message messageRequest) {

        String userEmail = getEmailByToken(token);
        messageService.postMessage(messageRequest, userEmail);
    }


    @PutMapping("/secure/admin/message")
    public void putMessage(@RequestHeader(value = "Authorization") String token,
                           @RequestBody AdminQuestionRequest adminQuestionRequest) throws Exception {
        String jwt = token.substring(7);
        Map<String, List<String>> claims = JWTUtil.validateTokenAndRetrieveSubject(jwt);

        List<String> getRoles = new ArrayList<String>();
        List<String> getEmail = new ArrayList<String>();
        getEmail = claims.get("email");
        getRoles = claims.get("roles");

        if(!getRoles.contains("ADMIN")) {
            throw new Exception("Adminstration page only.");
        }
        messageService.putMessage(adminQuestionRequest,getEmail.get(0));
    }
}
