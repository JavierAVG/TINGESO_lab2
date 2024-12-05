package com.example.evaluation_service.service;

import com.example.evaluation_service.entity.EvaluationEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static java.lang.Math.pow;

@Service
public class EvaluationService {
    public List<String> evaluate(EvaluationEntity evaluationEntity) {
        List<String> responseList = new ArrayList<>();

        double monthlyIncome = evaluationEntity.getMonthlyIncome();
        double totalDebt = evaluationEntity.getTotalDebt();
        String loanType = evaluationEntity.getLoanType();
        double loanAmount = evaluationEntity.getLoanAmount();
        double propertyValue = evaluationEntity.getPropertyValue();
        double i = (evaluationEntity.getAnnualInterest()/12.0)/100.0;
        double n = evaluationEntity.getLoanTerm() * 12.0;
        double monthlyFee = (loanAmount*(i*pow(1.0+i,n))/(pow(1.0+i,n)-1.0));

        // R1. Relación Cuota/Ingreso
        if ((monthlyFee/monthlyIncome)*100.0 > 35) { responseList.add("R1"); }

        // R2. Historial Crediticio del Cliente
        if (!evaluationEntity.isDicom()) { responseList.add("R2"); }

        // R3. Antigüedad Laboral y Estabilidad
        if (evaluationEntity.getEmploymentLongevity() <= 2) { responseList.add("R3"); }

        // R4. Relación Deuda/Ingreso
        if ((totalDebt/monthlyIncome)*100.0 > 50) { responseList.add("R4"); }

        // R5. Monto Máximo de Financiamiento
        double fundingPercentage = (loanAmount/propertyValue)*100.0;
        if ((loanType.equals("Primera Vivienda") && fundingPercentage > 80) ||
                (loanType.equals("Segunda Vivienda") && fundingPercentage > 70) ||
                (loanType.equals("Propiedades Comerciales") && fundingPercentage > 60) ||
                (loanType.equals("Remodelación") && fundingPercentage > 50)) {
            responseList.add("R5");
        }

        // R6. Edad del Solicitante
        LocalDate loanDueDate = evaluationEntity.getLoanDate().plusYears(evaluationEntity.getLoanTerm());
        int ageAtDueDate = loanDueDate.getYear() - evaluationEntity.getClientBirthdate().getYear();
        if (ageAtDueDate > 70) { responseList.add("R6"); }

        return responseList;
    }
}
