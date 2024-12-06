package com.example.evaluation_service;

import com.example.evaluation_service.entity.EvaluationEntity;
import com.example.evaluation_service.service.EvaluationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class EvaluationServiceTest {
    @InjectMocks
    private EvaluationService evaluationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void whenEvaluate_thenFullList() {
        // given
        EvaluationEntity evaluationEntity = new EvaluationEntity();
        evaluationEntity.setAnnualInterest(4.5);
        evaluationEntity.setMonthlyIncome(1200000);
        evaluationEntity.setDicom(false);
        evaluationEntity.setEmploymentLongevity(1);
        evaluationEntity.setTotalDebt(700000);
        evaluationEntity.setLoanType("Primera Vivienda");
        evaluationEntity.setLoanAmount(100000000);
        evaluationEntity.setPropertyValue(120000000);
        evaluationEntity.setClientBirthdate(LocalDate.of(1978, 5, 15));
        evaluationEntity.setLoanDate(LocalDate.of(2024, 12, 1));
        evaluationEntity.setLoanTerm(25);

        // when
        List<String> result = evaluationService.evaluate(evaluationEntity);

        // then
        assertEquals(List.of("R1", "R2", "R3", "R4", "R5", "R6"), result);
    }

    @Test
    void whenEvaluate_thenEmptyList() {
        // given
        EvaluationEntity evaluationEntity = new EvaluationEntity();
        evaluationEntity.setAnnualInterest(4.5);
        evaluationEntity.setMonthlyIncome(1500000);
        evaluationEntity.setDicom(true);
        evaluationEntity.setEmploymentLongevity(5);
        evaluationEntity.setTotalDebt(400000);
        evaluationEntity.setLoanType("Primera Vivienda");
        evaluationEntity.setLoanAmount(80000000);
        evaluationEntity.setPropertyValue(120000000);
        evaluationEntity.setClientBirthdate(LocalDate.of(1990, 1, 15));
        evaluationEntity.setLoanDate(LocalDate.of(2024, 12, 1));
        evaluationEntity.setLoanTerm(20);

        // when
        List<String> result = evaluationService.evaluate(evaluationEntity);

        // then
        assertEquals(List.of(), result);
    }

    @Test
    void whenEvaluateWithSegundaViviendaAndHighFundingPercentage_thenR5() {
        // given
        EvaluationEntity evaluationEntity = new EvaluationEntity();
        evaluationEntity.setAnnualInterest(4.5);
        evaluationEntity.setMonthlyIncome(1500000);
        evaluationEntity.setDicom(true);
        evaluationEntity.setEmploymentLongevity(5);
        evaluationEntity.setTotalDebt(400000);
        evaluationEntity.setLoanType("Segunda Vivienda");
        evaluationEntity.setLoanAmount(80000000);
        evaluationEntity.setPropertyValue(100000000);
        evaluationEntity.setClientBirthdate(LocalDate.of(1990, 1, 15));
        evaluationEntity.setLoanDate(LocalDate.of(2024, 12, 1));
        evaluationEntity.setLoanTerm(20);

        // when
        List<String> result = evaluationService.evaluate(evaluationEntity);

        // then
        assertEquals(List.of("R5"), result);
    }

    @Test
    void whenEvaluateWithSegundaViviendaAndLowFundingPercentage_thenNoR5() {
        // given
        EvaluationEntity evaluationEntity = new EvaluationEntity();
        evaluationEntity.setAnnualInterest(4.5);
        evaluationEntity.setMonthlyIncome(1500000);
        evaluationEntity.setDicom(true);
        evaluationEntity.setEmploymentLongevity(5);
        evaluationEntity.setTotalDebt(400000);
        evaluationEntity.setLoanType("Segunda Vivienda");
        evaluationEntity.setLoanAmount(80000000);
        evaluationEntity.setPropertyValue(190000000);
        evaluationEntity.setClientBirthdate(LocalDate.of(1990, 1, 15));
        evaluationEntity.setLoanDate(LocalDate.of(2024, 12, 1));
        evaluationEntity.setLoanTerm(20);

        // when
        List<String> result = evaluationService.evaluate(evaluationEntity);

        // then
        assertEquals(List.of(), result);
    }

    @Test
    void whenEvaluateWithPropiedadesComercialesAndHighFundingPercentage_thenR5() {
        // given
        EvaluationEntity evaluationEntity = new EvaluationEntity();
        evaluationEntity.setAnnualInterest(4.5);
        evaluationEntity.setMonthlyIncome(1500000);
        evaluationEntity.setDicom(true);
        evaluationEntity.setEmploymentLongevity(5);
        evaluationEntity.setTotalDebt(400000);
        evaluationEntity.setLoanType("Propiedades Comerciales");
        evaluationEntity.setLoanAmount(80000000);
        evaluationEntity.setPropertyValue(120000000);
        evaluationEntity.setClientBirthdate(LocalDate.of(1990, 1, 15));
        evaluationEntity.setLoanDate(LocalDate.of(2024, 12, 1));
        evaluationEntity.setLoanTerm(20);

        // when
        List<String> result = evaluationService.evaluate(evaluationEntity);

        // then
        assertEquals(List.of("R5"), result);
    }

    @Test
    void whenEvaluateWithPropiedadesComercialesAndLowFundingPercentage_thenNoR5() {
        // given
        EvaluationEntity evaluationEntity = new EvaluationEntity();
        evaluationEntity.setAnnualInterest(4.5);
        evaluationEntity.setMonthlyIncome(1500000);
        evaluationEntity.setDicom(true);
        evaluationEntity.setEmploymentLongevity(5);
        evaluationEntity.setTotalDebt(400000);
        evaluationEntity.setLoanType("Propiedades Comerciales");
        evaluationEntity.setLoanAmount(80000000);
        evaluationEntity.setPropertyValue(190000000);
        evaluationEntity.setClientBirthdate(LocalDate.of(1990, 1, 15));
        evaluationEntity.setLoanDate(LocalDate.of(2024, 12, 1));
        evaluationEntity.setLoanTerm(20);

        // when
        List<String> result = evaluationService.evaluate(evaluationEntity);

        // then
        assertEquals(List.of(), result);
    }

    @Test
    void whenEvaluateWithRemodelacionAndHighFundingPercentage_thenR5() {
        // given
        EvaluationEntity evaluationEntity = new EvaluationEntity();
        evaluationEntity.setAnnualInterest(4.5);
        evaluationEntity.setMonthlyIncome(1500000);
        evaluationEntity.setDicom(true);
        evaluationEntity.setEmploymentLongevity(5);
        evaluationEntity.setTotalDebt(400000);
        evaluationEntity.setLoanType("Remodelación");
        evaluationEntity.setLoanAmount(80000000);
        evaluationEntity.setPropertyValue(120000000);
        evaluationEntity.setClientBirthdate(LocalDate.of(1990, 1, 15));
        evaluationEntity.setLoanDate(LocalDate.of(2024, 12, 1));
        evaluationEntity.setLoanTerm(20);

        // when
        List<String> result = evaluationService.evaluate(evaluationEntity);

        // then
        assertEquals(List.of("R5"), result);
    }

    @Test
    void whenEvaluateWithRemodelacionAndLowFundingPercentage_thenNoR5() {
        // given
        EvaluationEntity evaluationEntity = new EvaluationEntity();
        evaluationEntity.setAnnualInterest(4.5);
        evaluationEntity.setMonthlyIncome(1500000);
        evaluationEntity.setDicom(true);
        evaluationEntity.setEmploymentLongevity(5);
        evaluationEntity.setTotalDebt(400000);
        evaluationEntity.setLoanType("Remodelación");
        evaluationEntity.setLoanAmount(80000000);
        evaluationEntity.setPropertyValue(190000000);
        evaluationEntity.setClientBirthdate(LocalDate.of(1990, 1, 15));
        evaluationEntity.setLoanDate(LocalDate.of(2024, 12, 1));
        evaluationEntity.setLoanTerm(20);

        // when
        List<String> result = evaluationService.evaluate(evaluationEntity);

        // then
        assertEquals(List.of(), result);
    }
}
