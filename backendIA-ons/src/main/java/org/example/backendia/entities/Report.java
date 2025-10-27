package org.example.backendia.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Report")
@EntityListeners(AuditingEntityListener.class)
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idReport;
    @Enumerated(EnumType.STRING)
    @Column(name = "type_report")
    private TypeReport typeReport;
    private LocalDateTime reportedAt;


    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comment comment;
}