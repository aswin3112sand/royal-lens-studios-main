package com.photographer.setting;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudioSettingsService {
  private final StudioSettingsRepository repository;

  public StudioSettings getSettings() {
    return repository.findAll().stream().findFirst().orElseGet(() -> {
      StudioSettings settings = new StudioSettings();
      settings.setStudioName("Photographer");
      return repository.save(settings);
    });
  }

  public StudioSettings update(UpdateStudioSettingsRequest req) {
    StudioSettings settings = getSettings();
    settings.setStudioName(req.studioName());
    settings.setWhatsappNumber(req.whatsappNumber());
    settings.setPhone(req.phone());
    settings.setEmail(req.email());
    settings.setAddress(req.address());
    return repository.save(settings);
  }
}