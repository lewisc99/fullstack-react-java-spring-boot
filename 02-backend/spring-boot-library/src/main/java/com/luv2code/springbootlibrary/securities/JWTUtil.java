package com.luv2code.springbootlibrary.securities;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.luv2code.springbootlibrary.domain.dto.TokenResponseDTO;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Component("JWTUtil")
public class JWTUtil {


    public static TokenResponseDTO generateToken(String email, List<String> roles) throws IllegalArgumentException, JWTCreationException {
        Date issuedAt = new Date();
        Date expiresAt = new Date();
        LocalDateTime localTime = LocalDateTime.ofInstant(expiresAt.toInstant(), ZoneId.systemDefault());
        LocalDateTime calculateExpiresAt = localTime.plusMinutes(SecurityProperties.getExpiration());
        expiresAt = Date.from(calculateExpiresAt.atZone(ZoneId.systemDefault()).toInstant());
        TokenResponseDTO tokenResponseDTO = new TokenResponseDTO();
        String jwt =  JWT.create()
                .withSubject("UserDetails")
                .withClaim("email", email)
                .withClaim("roles", roles)
                .withIssuedAt(issuedAt)
                .withExpiresAt(expiresAt)
                .withIssuer("lewis.com")
                .sign(Algorithm.HMAC256(SecurityProperties.getKey()));
        tokenResponseDTO.setToken(jwt);
        tokenResponseDTO.setCreated(issuedAt);
        tokenResponseDTO.setExpirationToken(expiresAt);
        tokenResponseDTO.setRoles(roles);
        return tokenResponseDTO;
    }

    public static Map<String, List<String>> validateTokenAndRetrieveSubject(String token) throws JWTVerificationException
    {
        Map<String,List<String>> claims = new HashMap<>();
        List<String> usernameList = new ArrayList<>();
        Claim roleClaim;

        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(SecurityProperties.getKey()))
                .withSubject("lewis.com")
                .withSubject("UserDetails")
                .build();

        try {
            DecodedJWT jwt = verifier.verify(token);

            usernameList.add(jwt.getClaim("email").asString());
            roleClaim = jwt.getClaim("roles");
            List<String> rolesList = roleClaim.asList(String.class);

            claims.put("email", usernameList);
            claims.put("roles", rolesList);
            return claims;
        } catch (SignatureVerificationException e)
        {
            claims.clear();
            List<String> error = new ArrayList<>();
            error.add("an-error-was-thrown");
            claims.put("invalid-token",error);
            return claims;
        }
    }
}