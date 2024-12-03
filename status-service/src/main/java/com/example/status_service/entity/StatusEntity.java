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
    private String state;   // Pendiente de Documentación - En evaluación - Pre-aprobado - Aprobado - Rechazado - Cancelado
    private int monthlyfee;
    private int creditlifeinsurance;
    private int fireinsurance;
    private int commision;
    private int monthlycost;
    private int totalcost;
}
