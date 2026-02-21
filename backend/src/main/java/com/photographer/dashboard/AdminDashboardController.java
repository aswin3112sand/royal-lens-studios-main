package com.photographer.dashboard;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AdminDashboardController {
  private final DashboardService dashboardService;

  @GetMapping("/api/admin/dashboard")
  public ResponseEntity<DashboardResponse> getDashboard() {
    return ResponseEntity.ok(dashboardService.getDashboard());
  }
}