package com.photographer.pkg;

import com.photographer.common.NotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PackageService {
  private final PackageRepository packageRepository;

  public List<PackageEntity> getPublicPackages(int limit) {
    List<PackageEntity> list = packageRepository.findByActiveTrueOrderBySortOrderAsc();
    if (limit > 0 && list.size() > limit) {
      return list.subList(0, limit);
    }
    return list;
  }

  public List<PackageEntity> getAdminPackages() {
    return packageRepository.findAllByOrderBySortOrderAsc();
  }

  public PackageEntity create(CreatePackageRequest req) {
    PackageEntity entity = new PackageEntity();
    entity.setName(req.name());
    entity.setTier(req.tier());
    entity.setPrice(req.price());
    entity.setDescription(req.description());
    entity.setPopular(req.isPopular() != null && req.isPopular());
    entity.setActive(true);
    entity.setSortOrder((int) (packageRepository.count() + 1));
    return packageRepository.save(entity);
  }

  public void delete(Long id) {
    if (!packageRepository.existsById(id)) {
      throw new NotFoundException("Package not found");
    }
    packageRepository.deleteById(id);
  }
}