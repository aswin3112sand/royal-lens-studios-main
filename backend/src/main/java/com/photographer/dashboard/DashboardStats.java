package com.photographer.dashboard;

public record DashboardStats(
    long bookings,
    long leads,
    long clients,
    long todayBookings
) {}