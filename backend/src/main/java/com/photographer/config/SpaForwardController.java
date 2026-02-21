package com.photographer.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@Controller
public class SpaForwardController {

  @GetMapping({"/{path:[^\\.]*}", "/{path:[^\\.]*}/{*remaining}"})
  public String forward(HttpServletRequest request) {
    String uri = request.getRequestURI();
    if (uri.startsWith("/api") || uri.startsWith("/actuator")) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
    return "forward:/index.html";
  }
}
