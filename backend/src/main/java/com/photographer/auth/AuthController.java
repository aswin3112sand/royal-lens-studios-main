package com.photographer.auth;

import com.photographer.auth.dto.AuthResponse;
import com.photographer.auth.dto.LoginRequest;
import com.photographer.auth.dto.RegisterRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
  private final AuthService authService;

  @PostMapping("/register")
  public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest req, HttpServletResponse res) {
    return ResponseEntity.ok(authService.register(req, res));
  }

  @PostMapping("/login")
  public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest req, HttpServletResponse res) {
    return ResponseEntity.ok(authService.login(req, res));
  }

  @GetMapping("/me")
  public ResponseEntity<AuthResponse> me(Authentication auth) {
    return ResponseEntity.ok(authService.me(auth));
  }

  @PostMapping("/logout")
  public ResponseEntity<Void> logout(HttpServletResponse res) {
    authService.clearCookie(res);
    return ResponseEntity.noContent().build();
  }
}