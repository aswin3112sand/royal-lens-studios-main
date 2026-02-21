package com.photographer.setting;

import jakarta.persistence.*;
import java.time.Instant;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "studio_settings")
public class StudioSettings {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "studio_name", length = 180)
  private String studioName;

  @Column(name = "whatsapp_number", length = 40)
  private String whatsappNumber;

  @Column(length = 40)
  private String phone;

  @Column(length = 150)
  private String email;

  @Column(length = 255)
  private String address;

  @Column(name = "updated_at", nullable = false)
  private Instant updatedAt;

  @PrePersist
  void onCreate() {
    this.updatedAt = Instant.now();
  }

  @PreUpdate
  void onUpdate() {
    this.updatedAt = Instant.now();
  }
}