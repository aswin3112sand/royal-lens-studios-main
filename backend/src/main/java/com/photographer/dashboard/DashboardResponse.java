package com.photographer.dashboard;

import com.photographer.booking.Booking;
import com.photographer.lead.Lead;
import java.util.List;

public record DashboardResponse(
    DashboardStats stats,
    List<Booking> recentBookings,
    List<Lead> recentLeads
) {}