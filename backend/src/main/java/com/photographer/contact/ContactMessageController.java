package com.photographer.contact;

import jakarta.validation.Valid;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ContactMessageController {
  private final ContactMessageService contactMessageService;

  @PostMapping("/api/contact-messages")
  public ResponseEntity<Map<String, String>> create(@Valid @RequestBody CreateContactMessageRequest request) {
    contactMessageService.create(request);
    return ResponseEntity.ok(Map.of("message", "Message received"));
  }
}