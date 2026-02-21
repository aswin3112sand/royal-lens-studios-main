package com.photographer.booking;

import com.photographer.common.NotFoundException;
import com.photographer.user.User;
import com.photographer.user.UserService;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookingService {
  private final BookingRepository bookingRepository;
  private final UserService userService;

  public List<Booking> myBookings(Long userId) {
    return bookingRepository.findByUserIdOrderByPreferredDateDesc(userId);
  }

  public Booking createBooking(Long userId, CreateBookingRequest req) {
    User user = userService.findById(userId)
        .orElseThrow(() -> new NotFoundException("User not found"));

    Booking booking = new Booking();
    booking.setUser(user);
    booking.setName(req.name());
    booking.setEmail(req.email());
    booking.setPhone(req.phone());
    booking.setShootType(req.shootType());
    booking.setPreferredDate(req.preferredDate());
    booking.setStatus("pending");

    return bookingRepository.save(booking);
  }

  public List<Booking> getAllBookings() {
    return bookingRepository.findAll().stream()
        .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
        .toList();
  }

  public Booking updateStatus(Long bookingId, String status) {
    Booking booking = bookingRepository.findById(bookingId)
        .orElseThrow(() -> new NotFoundException("Booking not found"));
    booking.setStatus(status);
    return bookingRepository.save(booking);
  }

  public long countAll() {
    return bookingRepository.count();
  }

  public long countForDate(LocalDate date) {
    return bookingRepository.countByPreferredDate(date);
  }

  public List<Booking> getRecent(int limit) {
    if (limit <= 5) {
      return bookingRepository.findTop5ByOrderByCreatedAtDesc();
    }
    return bookingRepository.findAll().stream()
        .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
        .limit(limit)
        .toList();
  }
}