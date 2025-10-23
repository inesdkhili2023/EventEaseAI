package org.example.backendia.services;


import org.example.backendia.entities.Comment;
import org.example.backendia.entities.Event;
import org.example.backendia.repositories.CommentRepository;
import org.example.backendia.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepo;
    @Autowired
    EventRepository eventRepo;

    public Comment saveComment(Comment comment) {
        return commentRepo.save(comment);
    }
    public Comment findcommentById(Long idComment) {
        return commentRepo.findById(idComment).get();
    }
    public List<Comment> findAllComments() {
        return commentRepo.findAll();
    }
    public void deleteCommentById(Long idComment) {
        commentRepo.deleteById(idComment);
    }

        public Comment updateComment(Comment comment) {
            Comment existingComment = findcommentById(comment.getIdComment());
            //.orElseThrow(() -> new RuntimeException("comment not found with id:" + comment.getId()));
            existingComment.setContent(comment.getContent());
            existingComment.setRating(comment.getRating());
            existingComment.setCreatedDate(comment.getCreatedDate());
            return commentRepo.save(existingComment);
        }

    public Comment AssignCommentToEvent(Long idEvent,Comment commentRequest) {
        Event event = eventRepo.findById(idEvent)
                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + idEvent));
        Comment comment = Comment.builder()
                .content(commentRequest.getContent())
                .rating(commentRequest.getRating())
                .createdDate(LocalDateTime.now())
                .event(event)
                .build();
        return commentRepo.save(comment);
    }

    public List<Comment> getCommentsByEventId(Long idEvent) {
        return commentRepo.findByEventId(idEvent);
    }

}
