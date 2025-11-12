package com.immobiliaris.backend.repo;

import com.immobiliaris.backend.model.ImmobiliFeatures;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ImmobiliFeaturesRepository extends JpaRepository<ImmobiliFeatures, Long> {
    
    List<ImmobiliFeatures> findByImmobileId(Long immobileId);
}