package com.photographer.config;

import com.photographer.auth.JwtService;
import com.photographer.user.User;
import com.photographer.user.UserService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtService jwtService;
  private final UserService userService;

  @Value("${app.jwt.cookie-name:AUTH_TOKEN}")
  private String cookieName;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    if (SecurityContextHolder.getContext().getAuthentication() == null) {
      String bearerToken = readTokenFromAuthorizationHeader(request);
      String cookieToken = readTokenFromCookie(request);

      boolean authenticated = tryAuthenticate(bearerToken, request);
      if (!authenticated) {
        tryAuthenticate(cookieToken, request);
      }
    }

    filterChain.doFilter(request, response);
  }

  private boolean tryAuthenticate(String token, HttpServletRequest request) {
    if (!StringUtils.hasText(token)) {
      return false;
    }

    try {
      if (!jwtService.isTokenValid(token)) {
        return false;
      }

      Long userId = jwtService.extractUserId(token);
      User user = userService.findById(userId).orElse(null);
      if (user == null) {
        return false;
      }

      UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
          user,
          null,
          List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
      );
      auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
      SecurityContextHolder.getContext().setAuthentication(auth);
      return true;
    } catch (JwtException | IllegalArgumentException ignored) {
      SecurityContextHolder.clearContext();
      return false;
    }
  }

  private String readTokenFromAuthorizationHeader(HttpServletRequest request) {
    String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    if (StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {
      String bearerToken = authHeader.substring(7).trim();
      if (StringUtils.hasText(bearerToken)) {
        return bearerToken;
      }
    }
    return null;
  }

  private String readTokenFromCookie(HttpServletRequest request) {
    Cookie[] cookies = request.getCookies();
    if (cookies == null) return null;
    for (Cookie cookie : cookies) {
      if (cookieName.equals(cookie.getName())) {
        return cookie.getValue();
      }
    }
    return null;
  }
}
