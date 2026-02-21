package com.photographer.booking;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record CreateBookingRequest(
    @NotBlank String name,
    @NotBlank @Email String email,
    String phone,
    @NotBlank String shootType,
    @NotNull LocalDate preferredDate
) {}