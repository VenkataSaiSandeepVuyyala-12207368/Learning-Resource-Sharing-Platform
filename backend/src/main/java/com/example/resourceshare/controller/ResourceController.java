package com.example.resourceshare.controller;

import com.example.resourceshare.dto.ResourceDTO;
import com.example.resourceshare.entity.Resource;
import com.example.resourceshare.service.ResourceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {
    private final ResourceService resourceService;

    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @GetMapping
    public ResponseEntity<List<ResourceDTO>> getAllResources() {
        return ResponseEntity.ok(resourceService.getAllResources());
    }

    @GetMapping("/recent")
    public ResponseEntity<List<ResourceDTO>> getRecentResources() {
        return ResponseEntity.ok(resourceService.getRecentResources());
    }

    @PostMapping
    public ResponseEntity<ResourceDTO> createResource(@RequestBody Resource resource) {
        return ResponseEntity.ok(resourceService.createResource(resource));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResourceDTO> updateResource(@PathVariable Long id, @RequestBody Resource resource) {
        return ResponseEntity.ok(resourceService.updateResource(id, resource));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResource(@PathVariable Long id) {
        resourceService.deleteResource(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<ResourceDTO>> searchResources(
            @RequestParam String query,
            @RequestParam String type) {
        return ResponseEntity.ok(resourceService.searchResources(query, type));
    }
}