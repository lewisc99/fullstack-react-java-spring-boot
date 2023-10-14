package com.luv2code.springbootlibrary.securities;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("security-constant")
public class SecurityProperties {

    private static String key;
    private static String expiration;
    private static String header;
    private static String origin;

    public static String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public static Long getExpiration() {
        return Long.valueOf(expiration);
    }

    public  void setExpiration(String expiration) {
        this.expiration = expiration;
    }

    public static String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public static String getOrigin() {
        return origin;
    }

    public  void setOrigin(String origin) {
        SecurityProperties.origin = origin;
    }
}