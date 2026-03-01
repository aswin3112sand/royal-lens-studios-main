package com.photographer.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaForwardController {

  @GetMapping({
      "/",
      "/portfolio",
      "/services",
      "/about",
      "/testimonials",
      "/contact",
      "/auth",
      "/booking",
      "/admin",
      "/admin/bookings",
      "/admin/leads",
      "/admin/clients",
      "/admin/projects",
      "/admin/packages",
      "/admin/settings"
  })
  public String forward() {
    return "forward:/index.html";
  }
}
