package com.photographer.pkg;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PackageRepository extends JpaRepository<PackageEntity, Long> {
  List<PackageEntity> findByActiveTrueOrderBySortOrderAsc();
  List<PackageEntity> findAllByOrderBySortOrderAsc();
}