package com.photographer.contact;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactMessageService {
  private final ContactMessageRepository repository;

  public ContactMessage create(CreateContactMessageRequest req) {
    ContactMessage message = new ContactMessage();
    message.setName(req.name());
    message.setEmail(req.email());
    message.setMessage(req.message());
    return repository.save(message);
  }
}