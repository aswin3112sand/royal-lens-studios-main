package com.photographer.pkg;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record CreatePackageRequest(
    @NotBlank String name,
    @NotBlank String tier,
    @NotNull BigDecimal price,
    String description,
    Boolean isPopular
) {}