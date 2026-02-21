package com.photographer.client;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.time.Instant;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "clients")
public class Client {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 150)
  private String name;

  @Column(length = 150)
  private String email;

  @Column(length = 40)
  private String phone;

  @Column(columnDefinition = "TEXT")
  private String notes;

  @Column(name = "tags_csv", columnDefinition = "TEXT")
  @JsonIgnore
  private String tagsCsv;

  @Column(name = "total_bookings", nullable = false)
  private Integer totalBookings = 0;

  @Column(name = "created_at", nullable = false, updatable = false)
  private Instant createdAt;

  @Column(name = "updated_at", nullable = false)
  private Instant updatedAt;

  @PrePersist
  void onCreate() {
    Instant now = Instant.now();
    this.createdAt = now;
    this.updatedAt = now;
    if (this.totalBookings == null) this.totalBookings = 0;
  }

  @PreUpdate
  void onUpdate() {
    this.updatedAt = Instant.now();
  }

  @JsonProperty("tags")
  public List<String> getTags() {
    if (tagsCsv == null || tagsCsv.isBlank()) return Collections.emptyList();
    return Arrays.stream(tagsCsv.split(","))
        .map(String::trim)
        .filter(s -> !s.isBlank())
        .toList();
  }

  public void setTags(List<String> tags) {
    if (tags == null || tags.isEmpty()) {
      this.tagsCsv = null;
      return;
    }
    this.tagsCsv = String.join(",", tags);
  }
}