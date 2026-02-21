package com.photographer.project;

import com.photographer.common.NotFoundException;
import java.text.Normalizer;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectService {
  private final ProjectRepository projectRepository;

  public List<Project> getAllForAdmin() {
    return projectRepository.findAll().stream()
        .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
        .toList();
  }

  public Project create(CreateProjectRequest req) {
    Project project = new Project();
    project.setTitle(req.title());
    project.setCategory(req.category());
    project.setDescription(req.description());
    project.setStory(req.story());
    project.setLocation(req.location());

    String slug = req.slug();
    if (slug == null || slug.isBlank()) {
      slug = toSlug(req.title());
    }
    project.setSlug(slug);
    project.setPublished(false);
    project.setFeatured(false);
    return projectRepository.save(project);
  }

  public void delete(Long id) {
    if (!projectRepository.existsById(id)) {
      throw new NotFoundException("Project not found");
    }
    projectRepository.deleteById(id);
  }

  private String toSlug(String input) {
    String normalized = Normalizer.normalize(input == null ? "project" : input, Normalizer.Form.NFD);
    return normalized
        .replaceAll("[^\\w\\s-]", "")
        .trim()
        .toLowerCase()
        .replaceAll("\\s+", "-")
        .replaceAll("-+", "-");
  }
}