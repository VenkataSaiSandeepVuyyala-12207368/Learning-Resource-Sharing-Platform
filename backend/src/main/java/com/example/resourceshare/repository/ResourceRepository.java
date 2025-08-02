package com.example.resourceshare.repository;

import com.example.resourceshare.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ResourceRepository extends JpaRepository<Resource, Long> {
    List<Resource> findAllByOrderByCreatedAtDesc();
    @Query("SELECT r FROM Resource r JOIN r.uploadedBy u WHERE u.username LIKE %:username%")
    List<Resource> findByUsernameContaining(@Param("username") String username);
    @Query("SELECT r FROM Resource r ORDER BY r.createdAt DESC LIMIT 10")
    List<Resource> findRecentResources();
}