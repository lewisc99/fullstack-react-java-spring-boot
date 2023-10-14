package com.luv2code.springbootlibrary.domain.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class TokenResponseDTO {

    private String format = "JWT";

    private  String token;

    private Date created;

    private Date expirationToken;

    private List<String> roles = new ArrayList<>();

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getExpirationToken() {
        return expirationToken;
    }

    public void setExpirationToken(Date expirationToken) {
        this.expirationToken = expirationToken;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    @Override
    public String toString() {
        return "TokenResponseDTO{" +
                "format='" + format + '\'' +
                ", token='" + token + '\'' +
                ", created=" + created +
                ", expirationToken=" + expirationToken +
                ", roles=" + roles +
                '}';
    }
}