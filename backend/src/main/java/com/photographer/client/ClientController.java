package com.photographer.client;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ClientController {
  private final ClientService clientService;

  @GetMapping("/api/admin/clients")
  public ResponseEntity<List<Client>> getClients() {
    return ResponseEntity.ok(clientService.getAll());
  }

  @PostMapping("/api/admin/clients")
  public ResponseEntity<Client> createClient(@Valid @RequestBody CreateClientRequest request) {
    return ResponseEntity.ok(clientService.create(request));
  }
}