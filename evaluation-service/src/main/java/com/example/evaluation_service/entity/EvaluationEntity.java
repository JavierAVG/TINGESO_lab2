package com.example.evaluation_service.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationEntity {
    private double annualInterest;
    private int monthlyIncome;
    private boolean dicom;
    private int employmentLongevity;
    private int totalDebt;
    private String loanType;
    private int loanAmount;
    private int propertyValue;
    private LocalDate clientBirthdate;
    private LocalDate loanDate;
    private int loanTerm;               // in years
}
