package com.example.status_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "status")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatusEntity {
    @Id
    @Column(unique = true, nullable = false)
    private Long id;        // same as loanid
    private String state;   // Documentation pending - In evaluation - Pre-approved - Approved - Rejected - Canceled
    private int monthlyfee;
    private int creditlifeinsurance;
    private int fireinsurance;
    private int commision;
    private int monthlycost;
    private int totalcost;
}
