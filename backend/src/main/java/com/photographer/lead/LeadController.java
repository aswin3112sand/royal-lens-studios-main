package com.photographer.lead;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LeadController {
  private final LeadService leadService;

  @GetMapping("/api/admin/leads")
  public ResponseEntity<List<Lead>> getLeads() {
    return ResponseEntity.ok(leadService.getAll());
  }

  @PostMapping("/api/admin/leads")
  public ResponseEntity<Lead> createLead(@Valid @RequestBody CreateLeadRequest request) {
    return ResponseEntity.ok(leadService.create(request));
  }

  @PatchMapping("/api/admin/leads/{id}/status")
  public ResponseEntity<Lead> updateStatus(
      @PathVariable Long id,
      @Valid @RequestBody UpdateLeadStatusRequest request) {
    return ResponseEntity.ok(leadService.updateStatus(id, request.status()));
  }
}