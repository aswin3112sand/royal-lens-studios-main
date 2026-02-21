package com.photographer.auth.dto;

import com.photographer.user.Role;

public record UserView(
    Long id,
    String email,
    String fullName,
    Role role
) {}