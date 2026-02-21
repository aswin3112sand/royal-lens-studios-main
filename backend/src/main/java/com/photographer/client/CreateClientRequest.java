package com.photographer.client;

import jakarta.validation.constraints.NotBlank;

public record CreateClientRequest(
    @NotBlank String name,
    String email,
    String phone,
    String notes
) {}