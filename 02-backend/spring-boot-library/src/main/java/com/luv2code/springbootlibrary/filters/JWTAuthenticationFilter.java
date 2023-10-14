package com.luv2code.springbootlibrary.filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.luv2code.springbootlibrary.domain.dto.TokenResponseDTO;
import com.luv2code.springbootlibrary.domain.entities.User;
import com.luv2code.springbootlibrary.securities.JWTUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(AuthenticationManager authManager)
    {
        authenticationManager = authManager;
        setFilterProcessesUrl("/api/login"); //to change the default login path to authenticate /login
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException
    {
        try {
            User credentials = new ObjectMapper()
                    .readValue(req.getInputStream(), User.class);

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            credentials.getEmail(),
                            credentials.getPassword(), new ArrayList<>()
                    )
            );

        } catch (Exception e)
        {
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return null;
        }
    }

    @Override
    protected  void successfulAuthentication(HttpServletRequest request,
                                             HttpServletResponse response,
                                             FilterChain chain,
                                             Authentication auth) throws IOException, ServletException
    {
        List<String> roleList = new ArrayList<>();
        roleList.add("USER");
        TokenResponseDTO token = JWTUtil.generateToken(((User) auth.getPrincipal()).getEmail(), roleList);

        PrintWriter out = response.getWriter();
        ObjectMapper objectMapper= new ObjectMapper();
        String jsonString = objectMapper.writeValueAsString(token);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        out.print(jsonString);
        out.flush();
    }
}