package com.photographer.booking;

import jakarta.validation.constraints.NotBlank;

public record UpdateBookingStatusRequest(
    @NotBlank String status
) {}