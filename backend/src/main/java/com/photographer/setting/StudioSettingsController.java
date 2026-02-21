package com.photographer.setting;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class StudioSettingsController {
  private final StudioSettingsService settingsService;

  @GetMapping("/api/admin/settings")
  public ResponseEntity<StudioSettings> getSettings() {
    return ResponseEntity.ok(settingsService.getSettings());
  }

  @PutMapping("/api/admin/settings")
  public ResponseEntity<StudioSettings> updateSettings(@RequestBody UpdateStudioSettingsRequest request) {
    return ResponseEntity.ok(settingsService.update(request));
  }
}