package com.photographer.booking;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
  List<Booking> findByUserIdOrderByPreferredDateDesc(Long userId);
  long countByPreferredDate(LocalDate preferredDate);
  List<Booking> findTop5ByOrderByCreatedAtDesc();
}