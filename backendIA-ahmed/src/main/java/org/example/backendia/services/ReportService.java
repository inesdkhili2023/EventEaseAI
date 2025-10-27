package org.example.backendia.services;

import org.example.backendia.entities.Comment;
import org.example.backendia.entities.Report;
import org.example.backendia.entities.TypeReport;
import org.example.backendia.repositories.CommentRepository;
import org.example.backendia.repositories.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReportService {
    @Autowired
    private CommentRepository commentRepo;
    @Autowired
    private ReportRepository reportRepo;

    public Report assignReportToComment(Long idComment, TypeReport typeReport){
        Comment comment = commentRepo.findById(idComment)
                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + idComment));

        Report report = Report.builder().typeReport(typeReport).reportedAt(LocalDateTime.now()).comment(comment).build();
        return reportRepo.save(report);
    }

    public List<Report> getReportsByComentId(Long idComment){
        return reportRepo.findByComment_IdComment(idComment);
    }
}
