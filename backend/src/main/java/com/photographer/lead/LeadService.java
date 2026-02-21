package com.photographer.lead;

import com.photographer.common.NotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LeadService {
  private final LeadRepository leadRepository;

  public List<Lead> getAll() {
    return leadRepository.findAll().stream()
        .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
        .toList();
  }

  public Lead create(CreateLeadRequest req) {
    Lead lead = new Lead();
    lead.setName(req.name());
    lead.setEmail(req.email());
    lead.setPhone(req.phone());
    lead.setSource(req.source());
    lead.setNotes(req.notes());
    lead.setStatus("new");
    return leadRepository.save(lead);
  }

  public Lead updateStatus(Long id, String status) {
    Lead lead = leadRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("Lead not found"));
    lead.setStatus(status);
    return leadRepository.save(lead);
  }

  public long countAll() {
    return leadRepository.count();
  }

  public List<Lead> recent(int limit) {
    if (limit <= 5) {
      return leadRepository.findTop5ByOrderByCreatedAtDesc();
    }
    return leadRepository.findAll().stream()
        .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
        .limit(limit)
        .toList();
  }
}