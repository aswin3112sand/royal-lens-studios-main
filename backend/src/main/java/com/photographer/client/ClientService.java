package com.photographer.client;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClientService {
  private final ClientRepository clientRepository;

  public List<Client> getAll() {
    return clientRepository.findAll().stream()
        .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
        .toList();
  }

  public Client create(CreateClientRequest req) {
    Client client = new Client();
    client.setName(req.name());
    client.setEmail(req.email());
    client.setPhone(req.phone());
    client.setNotes(req.notes());
    client.setTotalBookings(0);
    return clientRepository.save(client);
  }

  public long countAll() {
    return clientRepository.count();
  }
}