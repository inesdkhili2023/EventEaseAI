package org.example.backendia.repositories;

import org.example.backendia.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long> {
    List<Comment> findByEventId(Long id);
    List<Comment> findByEventIdAndIsHiddenFalse(Long id);
    List<Comment> findByIsHiddenTrue();
}
