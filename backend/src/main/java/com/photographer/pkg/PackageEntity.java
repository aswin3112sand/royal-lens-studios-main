package com.photographer.pkg;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "packages")
public class PackageEntity {
  private static final ObjectMapper MAPPER = new ObjectMapper();

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 150)
  private String name;

  @Column(nullable = false, length = 40)
  private String tier = "silver";

  @Column(nullable = false, precision = 12, scale = 2)
  private BigDecimal price = BigDecimal.ZERO;

  @Column(columnDefinition = "TEXT")
  private String description;

  @Column(name = "deliverables_json", columnDefinition = "TEXT")
  @JsonIgnore
  private String deliverablesJson;

  @JsonProperty("isPopular")
  @Column(name = "is_popular", nullable = false)
  private boolean isPopular = false;

  @Column(nullable = false)
  private boolean active = true;

  @Column(name = "sort_order", nullable = false)
  private int sortOrder = 0;

  @Column(name = "created_at", nullable = false, updatable = false)
  private Instant createdAt;

  @Column(name = "updated_at", nullable = false)
  private Instant updatedAt;

  @PrePersist
  void onCreate() {
    Instant now = Instant.now();
    this.createdAt = now;
    this.updatedAt = now;
  }

  @PreUpdate
  void onUpdate() {
    this.updatedAt = Instant.now();
  }

  @JsonProperty("deliverables")
  public List<String> getDeliverables() {
    if (deliverablesJson == null || deliverablesJson.isBlank()) {
      return Collections.emptyList();
    }
    try {
      return MAPPER.readValue(deliverablesJson, new TypeReference<List<String>>() {});
    } catch (JsonProcessingException ignored) {
      return Collections.emptyList();
    }
  }

  public void setDeliverables(List<String> deliverables) {
    if (deliverables == null || deliverables.isEmpty()) {
      this.deliverablesJson = null;
      return;
    }
    try {
      this.deliverablesJson = MAPPER.writeValueAsString(deliverables);
    } catch (JsonProcessingException ignored) {
      this.deliverablesJson = null;
    }
  }
}
