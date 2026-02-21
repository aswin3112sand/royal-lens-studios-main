package com.photographer.project;

import jakarta.validation.constraints.NotBlank;

public record CreateProjectRequest(
    @NotBlank String title,
    String slug,
    @NotBlank String category,
    String description,
    String story,
    String location
) {}