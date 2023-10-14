package com.luv2code.springbootlibrary.filters;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.luv2code.springbootlibrary.config.ConvertToGrantedAuthority;
import com.luv2code.springbootlibrary.securities.JWTUtil;
import com.luv2code.springbootlibrary.securities.SecurityProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    @Autowired
    private SecurityProperties securityProperties;

    @Autowired
    private JWTUtil jwtUtil;

    public JWTAuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws IOException, ServletException {
        String header = req.getHeader(SecurityProperties.getHeader());

        if (header == null || !header.startsWith("Bearer ")) {
            chain.doFilter(req, res);
            return;
        }
        UsernamePasswordAuthenticationToken authentication = getAuthentication(req);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(req, res);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) throws JWTVerificationException, IOException {
        String token = request.getHeader(SecurityProperties.getHeader());

        if (token != null) {
            try {
                String jwt = token.substring(7);
                Map<String, List<String>> claims = JWTUtil.validateTokenAndRetrieveSubject(jwt);

                if (claims.containsKey("invalid-token")) {
                    return null;
                }
                List<String> getRoles = new ArrayList<String>();
                List<String> getUsername = new ArrayList<String>();
                getUsername = claims.get("email");
                getRoles = claims.get("roles");

                return new UsernamePasswordAuthenticationToken(getUsername.get(0), null, ConvertToGrantedAuthority.getRoles(getRoles));
            } catch (JWTVerificationException e) {
                e.printStackTrace();
            }
        }
        return  null;
    }
}