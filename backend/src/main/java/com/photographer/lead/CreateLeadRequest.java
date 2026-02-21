package com.photographer.lead;

import jakarta.validation.constraints.NotBlank;

public record CreateLeadRequest(
    @NotBlank String name,
    String email,
    String phone,
    String source,
    String notes
) {}