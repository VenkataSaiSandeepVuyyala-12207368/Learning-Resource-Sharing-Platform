package com.example.resourceshare.service;

import com.example.resourceshare.dto.ResourceDTO;
import com.example.resourceshare.dto.UserDTO;
import com.example.resourceshare.entity.Resource;
import com.example.resourceshare.entity.User;
import com.example.resourceshare.repository.ResourceRepository;
import com.example.resourceshare.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResourceService {
    private final ResourceRepository resourceRepository;
    private final UserRepository userRepository;

    public ResourceService(ResourceRepository resourceRepository, UserRepository userRepository) {
        this.resourceRepository = resourceRepository;
        this.userRepository = userRepository;
    }

    public List<ResourceDTO> getAllResources() {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        return resourceRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(resource -> convertToDTO(resource, currentUsername))
                .collect(Collectors.toList());
    }

    public List<ResourceDTO> getRecentResources() {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        return resourceRepository.findRecentResources().stream()
                .map(resource -> convertToDTO(resource, currentUsername))
                .collect(Collectors.toList());
    }

    public ResourceDTO createResource(Resource resource) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        resource.setUploadedBy(user);
        Resource savedResource = resourceRepository.save(resource);
        return convertToDTO(savedResource, username);
    }

    public ResourceDTO updateResource(Long id, Resource resourceDetails) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource not found"));

        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!resource.getUploadedBy().getUsername().equals(currentUsername)) {
            throw new RuntimeException("You can only update your own resources");
        }

        resource.setTitle(resourceDetails.getTitle());
        resource.setSubject(resourceDetails.getSubject());
        resource.setLink(resourceDetails.getLink());
        resource.setDescription(resourceDetails.getDescription());

        Resource updatedResource = resourceRepository.save(resource);
        return convertToDTO(updatedResource, currentUsername);
    }

    public void deleteResource(Long id) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource not found"));

        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!resource.getUploadedBy().getUsername().equals(currentUsername)) {
            throw new RuntimeException("You can only delete your own resources");
        }

        resourceRepository.delete(resource);
    }

    public List<ResourceDTO> searchResources(String query, String type) {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();

        List<Resource> resources = resourceRepository.findAll().stream()
                .filter(resource -> {
                    boolean matchesQuery = query == null || query.isEmpty() ||
                            resource.getTitle().toLowerCase().contains(query.toLowerCase()) ||
                            resource.getSubject().toLowerCase().contains(query.toLowerCase()) ||
                            resource.getUploadedBy().getUsername().toLowerCase().contains(query.toLowerCase());
                    boolean matchesType = true;
                    if (type != null && !type.isEmpty()) {
                        switch (type) {
                            case "subject":
                                matchesType = resource.getSubject().toLowerCase().contains(query.toLowerCase());
                                break;
                            case "title":
                                matchesType = resource.getTitle().toLowerCase().contains(query.toLowerCase());
                                break;
                            case "username":
                                matchesType = resource.getUploadedBy().getUsername().toLowerCase().contains(query.toLowerCase());
                                break;
                        }
                    }
                    return matchesQuery && matchesType;
                })
                .collect(Collectors.toList());

        return resources.stream()
                .map(resource -> convertToDTO(resource, currentUsername))
                .collect(Collectors.toList());
    }
    private ResourceDTO convertToDTO(Resource resource, String currentUsername) {
        ResourceDTO dto = new ResourceDTO();
        dto.setId(resource.getId());
        dto.setTitle(resource.getTitle());
        dto.setSubject(resource.getSubject());
        dto.setLink(resource.getLink());
        dto.setDescription(resource.getDescription());
        dto.setCreatedAt(resource.getCreatedAt());

        UserDTO userDTO = new UserDTO();
        userDTO.setId(resource.getUploadedBy().getId());
        userDTO.setUsername(resource.getUploadedBy().getUsername());
        userDTO.setFullName(resource.getUploadedBy().getFullName());
        dto.setUploadedBy(userDTO);
        dto.setCanEdit(resource.getUploadedBy().getUsername().equals(currentUsername));
        return dto;
    }
}