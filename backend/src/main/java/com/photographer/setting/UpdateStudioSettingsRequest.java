package com.photographer.setting;

public record UpdateStudioSettingsRequest(
    String studioName,
    String whatsappNumber,
    String phone,
    String email,
    String address
) {}