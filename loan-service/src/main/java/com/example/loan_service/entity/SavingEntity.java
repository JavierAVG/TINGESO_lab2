package com.example.loan_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "saving")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SavingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    private Long loanid;

    private int withdrawal;
    private int deposit;
    private int salary;
    private int monthsAgo;  // 1:12
}
