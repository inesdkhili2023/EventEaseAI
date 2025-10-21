package org.example.backendia.controllers;


import lombok.RequiredArgsConstructor;
import org.example.backendia.entities.Comment;
import org.example.backendia.entities.Report;
import org.example.backendia.entities.TypeReport;
import org.example.backendia.services.CommentService;
import org.example.backendia.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class CommentController {
    @Autowired
    private CommentService commentService;
    @Autowired
    private ReportService reportService;

    @PostMapping("/addComment")
    public Comment addComment(@RequestBody Comment comment){
        return commentService.saveComment(comment);
    }
    @GetMapping("/getAllComment")
    public List<Comment> getAllComment(){
        return commentService.findAllComments();
    }
    @GetMapping("/getComment/{idComment}")
    public Comment getCommentById(@PathVariable Long idComment){
        return commentService.findcommentById(idComment);
    }
    @PutMapping("/updateComment")
    public Comment updateComment(@RequestBody Comment comment){
        return commentService.updateComment(comment);
    }
    @PostMapping("/assignReport/{idComment}")
    public ResponseEntity<Report> assignReport(@PathVariable Long idComment, @RequestBody String typeReportString){
        try {
            TypeReport typeReport = TypeReport.valueOf(typeReportString);
            Report report = reportService.assignReportToComment(idComment, typeReport);
            return ResponseEntity.ok(report);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/All-Comment-reports/{idComment}")
    public List<Report> getAllReport(@PathVariable Long idComment) {
        return reportService.getReportsByComentId(idComment);}

    @PostMapping("assignComment/{idEvent}/comments")
    public ResponseEntity<Comment> assignComment(@PathVariable Long idEvent, @RequestBody Comment commentRequest){
        Comment comment = commentService.AssignCommentToEvent(idEvent,commentRequest);
        return ResponseEntity.ok(comment);
    }
    @GetMapping("All-event-comments/{idEvent}")
    public List<Comment> getAllEventComment(@PathVariable Long idEvent) {
        return commentService.getCommentsByEventId(idEvent);
    }
    
    @GetMapping("visible-event-comments/{idEvent}")
    public List<Comment> getVisibleEventComments(@PathVariable Long idEvent) {
        return commentService.getVisibleCommentsByEventId(idEvent);
    }
    
    @GetMapping("/hidden-comments")
    public List<Comment> getHiddenComments() {
        return commentService.getHiddenComments();
    }
    
    @PutMapping("/toggle-visibility/{idComment}")
    public Comment toggleCommentVisibility(@PathVariable Long idComment) {
        return commentService.toggleCommentVisibility(idComment);
    }

}
