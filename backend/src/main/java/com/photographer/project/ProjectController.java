package com.photographer.project;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ProjectController {
  private final ProjectService projectService;

  @GetMapping("/api/admin/projects")
  public ResponseEntity<List<Project>> getProjects() {
    return ResponseEntity.ok(projectService.getAllForAdmin());
  }

  @PostMapping("/api/admin/projects")
  public ResponseEntity<Project> createProject(@Valid @RequestBody CreateProjectRequest request) {
    return ResponseEntity.ok(projectService.create(request));
  }

  @DeleteMapping("/api/admin/projects/{id}")
  public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
    projectService.delete(id);
    return ResponseEntity.noContent().build();
  }
}