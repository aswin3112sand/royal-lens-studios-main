package com.photographer.pkg;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PackageController {
  private final PackageService packageService;

  @GetMapping("/api/public/packages")
  public ResponseEntity<List<PackageEntity>> getPublicPackages(@RequestParam(required = false) Integer limit) {
    return ResponseEntity.ok(packageService.getPublicPackages(limit == null ? 0 : limit));
  }

  @GetMapping("/api/admin/packages")
  public ResponseEntity<List<PackageEntity>> getAdminPackages() {
    return ResponseEntity.ok(packageService.getAdminPackages());
  }

  @PostMapping("/api/admin/packages")
  public ResponseEntity<PackageEntity> createPackage(@Valid @RequestBody CreatePackageRequest request) {
    return ResponseEntity.ok(packageService.create(request));
  }

  @DeleteMapping("/api/admin/packages/{id}")
  public ResponseEntity<Void> deletePackage(@PathVariable Long id) {
    packageService.delete(id);
    return ResponseEntity.noContent().build();
  }
}