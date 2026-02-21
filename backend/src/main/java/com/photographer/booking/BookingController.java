package com.photographer.booking;

import com.photographer.common.UnauthorizedException;
import com.photographer.user.User;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class BookingController {
  private final BookingService bookingService;

  @GetMapping("/api/bookings/me")
  public ResponseEntity<List<Booking>> myBookings(Authentication authentication) {
    return ResponseEntity.ok(bookingService.myBookings(getUserId(authentication)));
  }

  @PostMapping("/api/bookings")
  public ResponseEntity<Booking> createBooking(
      Authentication authentication,
      @Valid @RequestBody CreateBookingRequest request) {
    return ResponseEntity.ok(bookingService.createBooking(getUserId(authentication), request));
  }

  @GetMapping("/api/admin/bookings")
  public ResponseEntity<List<Booking>> getAdminBookings() {
    return ResponseEntity.ok(bookingService.getAllBookings());
  }

  @PatchMapping("/api/admin/bookings/{id}/status")
  public ResponseEntity<Booking> updateBookingStatus(
      @PathVariable Long id,
      @Valid @RequestBody UpdateBookingStatusRequest request) {
    return ResponseEntity.ok(bookingService.updateStatus(id, request.status()));
  }

  private Long getUserId(Authentication authentication) {
    if (authentication == null || !(authentication.getPrincipal() instanceof User user)) {
      throw new UnauthorizedException("Not authenticated");
    }
    return user.getId();
  }
}