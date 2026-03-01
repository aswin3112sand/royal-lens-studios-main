package com.photographer.auth.dto;

public record AuthResponse(
    UserView user,
    String token
) {}
