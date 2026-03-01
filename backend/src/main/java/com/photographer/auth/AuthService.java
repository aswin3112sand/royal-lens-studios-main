package com.photographer.auth;

import com.photographer.auth.dto.AuthResponse;
import com.photographer.auth.dto.LoginRequest;
import com.photographer.auth.dto.RegisterRequest;
import com.photographer.auth.dto.UserView;
import com.photographer.common.BadRequestException;
import com.photographer.common.UnauthorizedException;
import com.photographer.user.Role;
import com.photographer.user.User;
import com.photographer.user.UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final UserService userService;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;

  @Value("${app.jwt.cookie-name:AUTH_TOKEN}")
  private String cookieName;

  @Value("${app.jwt.expiration-ms:86400000}")
  private long jwtExpirationMs;

  @Value("${app.cookie.secure:false}")
  private boolean secureCookie;

  @Value("${app.cookie.same-site:Lax}")
  private String sameSite;

  public AuthResponse register(RegisterRequest req, HttpServletResponse response) {
    if (userService.emailExists(req.email())) {
      throw new BadRequestException("Email already registered");
    }

    User user = new User();
    user.setEmail(req.email().trim().toLowerCase());
    user.setPasswordHash(passwordEncoder.encode(req.password()));
    user.setFullName(req.fullName() == null ? null : req.fullName().trim());
    user.setRole(Role.USER);

    User saved = userService.save(user);
    String token = attachAuthCookie(saved, response);
    return new AuthResponse(toView(saved), token);
  }

  public AuthResponse login(LoginRequest req, HttpServletResponse response) {
    User user = userService.findByEmail(req.email())
        .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

    if (!passwordEncoder.matches(req.password(), user.getPasswordHash())) {
      throw new UnauthorizedException("Invalid email or password");
    }

    String token = attachAuthCookie(user, response);
    return new AuthResponse(toView(user), token);
  }

  public AuthResponse me(Authentication authentication) {
    if (authentication == null || authentication.getPrincipal() == null) {
      throw new UnauthorizedException("Not authenticated");
    }

    Object principal = authentication.getPrincipal();
    if (!(principal instanceof User user)) {
      throw new UnauthorizedException("Not authenticated");
    }

    return new AuthResponse(toView(user), null);
  }

  public void clearCookie(HttpServletResponse response) {
    ResponseCookie cookie = ResponseCookie.from(cookieName, "")
        .httpOnly(true)
        .secure(secureCookie)
        .path("/")
        .sameSite(sameSite)
        .maxAge(0)
        .build();
    response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
  }

  private String attachAuthCookie(User user, HttpServletResponse response) {
    String token = jwtService.generateToken(user);
    ResponseCookie cookie = ResponseCookie.from(cookieName, token)
        .httpOnly(true)
        .secure(secureCookie)
        .path("/")
        .sameSite(sameSite)
        .maxAge(jwtExpirationMs / 1000)
        .build();
    response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    return token;
  }

  private UserView toView(User user) {
    return new UserView(user.getId(), user.getEmail(), user.getFullName(), user.getRole());
  }
}
