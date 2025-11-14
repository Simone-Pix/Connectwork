package com.immobiliaris.backend.controller;

import com.immobiliaris.backend.service.ImmobiliService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/immobili/{immobileId}/features")
public class ImmobiliFeaturesController {

    private final ImmobiliService immobiliService;

    public ImmobiliFeaturesController(ImmobiliService immobiliService) {
        this.immobiliService = immobiliService;
    }

    @GetMapping
    public ResponseEntity<List<String>> listFeatures(@PathVariable Long immobileId) {
        List<String> features = immobiliService.getFeaturesByImmobileId(immobileId);
        return ResponseEntity.ok(features);
    }

    public static class FeatureRequest {
        private String featureTipo;

        public FeatureRequest() {}
        public String getFeatureTipo() { return featureTipo; }
        public void setFeatureTipo(String featureTipo) { this.featureTipo = featureTipo; }
    }

    @PostMapping
    public ResponseEntity<Void> addFeature(@PathVariable Long immobileId, @RequestBody FeatureRequest request) {
        immobiliService.addFeature(immobileId, request.getFeatureTipo());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{featureId}")
    public ResponseEntity<Void> deleteFeature(@PathVariable Long immobileId, @PathVariable Long featureId) {
        // immobileId is kept in the path for clarity but deletion is by featureId
        immobiliService.deleteFeature(featureId);
        return ResponseEntity.noContent().build();
    }
}
