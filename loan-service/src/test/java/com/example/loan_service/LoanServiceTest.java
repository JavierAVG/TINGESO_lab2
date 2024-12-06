package com.example.loan_service;

import com.example.loan_service.entity.LoanEntity;
import com.example.loan_service.repository.LoanRepository;
import com.example.loan_service.service.LoanService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class LoanServiceTest {
    @Mock
    private LoanRepository loanRepository;

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private LoanService loanService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void whenSave_thenCorrect() {
        // given
        LoanEntity loan = new LoanEntity();
        loan.setClientid(4L);
        loan.setType("Segunda Vivienda");
        loan.setDuration(1);
        loan.setAmount(200000);
        loan.setInterestrate(3.5);
        loan.setMonthlyincome(5000);
        loan.setEmploymentlongevity(120);
        loan.setTotaldebt(30000);
        loan.setPropertyvalue(250000);
        loan.setAccumulatedsalary(60000);
        loan.setSavingsaccountlongevity(48);
        loan.setLoandate(LocalDate.of(2024, 12, 5));

        LoanEntity savedLoan = new LoanEntity();
        savedLoan.setId(1L);
        savedLoan.setClientid(4L);
        savedLoan.setType("Segunda Vivienda");
        savedLoan.setDuration(1);
        savedLoan.setAmount(200000);
        savedLoan.setInterestrate(3.5);
        savedLoan.setMonthlyincome(5000);
        savedLoan.setEmploymentlongevity(120);
        savedLoan.setTotaldebt(30000);
        savedLoan.setPropertyvalue(250000);
        savedLoan.setAccumulatedsalary(60000);
        savedLoan.setSavingsaccountlongevity(48);
        savedLoan.setLoandate(LocalDate.of(2024, 12, 5));

        when(loanRepository.save(any(LoanEntity.class))).thenReturn(savedLoan);
        when(restTemplate.postForObject(anyString(), any(), eq(String.class))).thenReturn(null);

        // when
        LoanEntity result = loanService.save(loan);

        // then
        assertEquals(savedLoan, result);
        verify(loanRepository, times(1)).save(loan);
        verify(restTemplate, times(1)).postForObject(anyString(), any(), eq(String.class));
    }

    @Test
    void whenUpdate_thenCorrect() {
        // given
        LoanEntity loan = new LoanEntity();
        loan.setId(1L);
        loan.setClientid(4L);
        loan.setType("Segunda Vivienda");
        loan.setDuration(1);
        loan.setAmount(200000);
        loan.setInterestrate(3.5);
        loan.setMonthlyincome(5000);
        loan.setEmploymentlongevity(120);
        loan.setTotaldebt(30000);
        loan.setPropertyvalue(250000);
        loan.setAccumulatedsalary(60000);
        loan.setSavingsaccountlongevity(48);
        loan.setLoandate(LocalDate.of(2024, 12, 5));

        LoanEntity updatedLoan = new LoanEntity();
        updatedLoan.setId(1L);
        updatedLoan.setClientid(4L);
        updatedLoan.setType("Segunda Vivienda");
        updatedLoan.setDuration(1);
        updatedLoan.setAmount(200000);
        updatedLoan.setInterestrate(3.5);
        updatedLoan.setMonthlyincome(5000);
        updatedLoan.setEmploymentlongevity(120);
        updatedLoan.setTotaldebt(30000);
        updatedLoan.setPropertyvalue(250000);
        updatedLoan.setAccumulatedsalary(60000);
        updatedLoan.setSavingsaccountlongevity(48);
        updatedLoan.setLoandate(LocalDate.of(2024, 12, 5));

        when(loanRepository.save(any(LoanEntity.class))).thenReturn(updatedLoan);

        // when
        LoanEntity result = loanService.update(loan);

        // then
        assertEquals(updatedLoan, result);
        verify(loanRepository, times(1)).save(loan);
    }

    @Test
    void whenGetLoan_thenCorrect() {
        // given
        Long id = 1L;

        LoanEntity loan = new LoanEntity();
        loan.setId(id);
        loan.setClientid(4L);
        loan.setType("Segunda Vivienda");
        loan.setDuration(1);
        loan.setAmount(200000);
        loan.setInterestrate(3.5);
        loan.setMonthlyincome(5000);
        loan.setEmploymentlongevity(120);
        loan.setTotaldebt(30000);
        loan.setPropertyvalue(250000);
        loan.setAccumulatedsalary(60000);
        loan.setSavingsaccountlongevity(48);
        loan.setLoandate(LocalDate.of(2024, 12, 5));

        when(loanRepository.findById(id)).thenReturn(java.util.Optional.of(loan));

        // when
        LoanEntity result = loanService.getLoan(id);

        // then
        assertEquals(loan, result);
        verify(loanRepository, times(1)).findById(id);
    }

    @Test
    void whenGetLoans_thenCorrect() {
        // given
        LoanEntity loan = new LoanEntity();
        loan.setId(1L);
        loan.setClientid(4L);
        loan.setType("Segunda Vivienda");
        loan.setDuration(1);
        loan.setAmount(200000);
        loan.setInterestrate(3.5);
        loan.setMonthlyincome(5000);
        loan.setEmploymentlongevity(120);
        loan.setTotaldebt(30000);
        loan.setPropertyvalue(250000);
        loan.setAccumulatedsalary(60000);
        loan.setSavingsaccountlongevity(48);
        loan.setLoandate(LocalDate.of(2024, 12, 5));

        when(loanRepository.findAll()).thenReturn(java.util.List.of(loan));

        // when
        Iterable<LoanEntity> result = loanService.getLoans();

        // then
        assertEquals(java.util.List.of(loan), result);
        verify(loanRepository, times(1)).findAll();
    }

    @Test
    void whenGetLoansByClientId_thenCorrect() {
        // given
        Long id = 4L;

        LoanEntity loan = new LoanEntity();
        loan.setId(1L);
        loan.setClientid(id);
        loan.setType("Segunda Vivienda");
        loan.setDuration(1);
        loan.setAmount(200000);
        loan.setInterestrate(3.5);
        loan.setMonthlyincome(5000);
        loan.setEmploymentlongevity(120);
        loan.setTotaldebt(30000);
        loan.setPropertyvalue(250000);
        loan.setAccumulatedsalary(60000);
        loan.setSavingsaccountlongevity(48);
        loan.setLoandate(LocalDate.of(2024, 12, 5));

        when(loanRepository.findByClientid(id)).thenReturn(java.util.List.of(loan));

        // when
        Iterable<LoanEntity> result = loanService.getLoansByClientId(id);

        // then
        assertEquals(java.util.List.of(loan), result);
        verify(loanRepository, times(1)).findByClientid(id);
    }
}
