package com.photographer.dashboard;

import com.photographer.booking.BookingService;
import com.photographer.client.ClientService;
import com.photographer.lead.LeadService;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {
  private final BookingService bookingService;
  private final LeadService leadService;
  private final ClientService clientService;

  public DashboardResponse getDashboard() {
    DashboardStats stats = new DashboardStats(
        bookingService.countAll(),
        leadService.countAll(),
        clientService.countAll(),
        bookingService.countForDate(LocalDate.now())
    );

    return new DashboardResponse(
        stats,
        bookingService.getRecent(5),
        leadService.recent(5)
    );
  }
}