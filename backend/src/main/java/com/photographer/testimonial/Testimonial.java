package com.photographer.testimonial;

import jakarta.persistence.*;
import java.time.Instant;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "testimonials")
public class Testimonial {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "client_name", nullable = false, length = 150)
  private String clientName;

  @Column(name = "client_role", length = 150)
  private String clientRole;

  @Column(nullable = false, columnDefinition = "TEXT")
  private String review;

  @Column(nullable = false)
  private int rating = 5;

  @Column(nullable = false)
  private boolean published = true;

  @Column(nullable = false)
  private boolean featured = false;

  @Column(name = "created_at", nullable = false, updatable = false)
  private Instant createdAt;

  @PrePersist
  void onCreate() {
    this.createdAt = Instant.now();
  }
}