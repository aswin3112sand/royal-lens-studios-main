package com.photographer.testimonial;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TestimonialService {
  private final TestimonialRepository testimonialRepository;

  public List<Testimonial> getFeatured(int limit) {
    List<Testimonial> list = testimonialRepository.findByPublishedTrueAndFeaturedTrueOrderByCreatedAtDesc();
    if (limit > 0 && list.size() > limit) {
      return list.subList(0, limit);
    }
    return list;
  }
}