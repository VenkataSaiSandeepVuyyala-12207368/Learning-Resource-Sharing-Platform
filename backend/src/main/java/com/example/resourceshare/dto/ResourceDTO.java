package com.example.resourceshare.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResourceDTO {
    private Long id;
    private String title;
    private String subject;
    private String link;
    private String description;
    private LocalDateTime createdAt;
    private UserDTO uploadedBy;
    private Boolean canEdit;
}