package com.example.loan_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "loan")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    private Long clientid;

    private String type;                // First home - Second home - Commercial properties - Remodeling
    private int amount;
    private double interestrate;        // annual
    private int duration;               // in years
    private int monthlyincome;
    private int employmentlongevity;
    private int totaldebt;
    private int propertyvalue;
    private int accumulatedsalary;
    private int savingsaccountlongevity;
    private LocalDate loandate;
}
