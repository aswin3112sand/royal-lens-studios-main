package com.photographer.testimonial;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TestimonialController {
  private final TestimonialService testimonialService;

  @GetMapping("/api/public/testimonials")
  public ResponseEntity<List<Testimonial>> getFeatured(@RequestParam(required = false) Integer limit) {
    return ResponseEntity.ok(testimonialService.getFeatured(limit == null ? 0 : limit));
  }
}