package com.example.loan_service;

import com.example.loan_service.entity.SavingEntity;
import com.example.loan_service.repository.SavingsRepository;
import com.example.loan_service.service.SavingsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class SavingsServiceTest {
    @Mock
    private SavingsRepository savingsRepository;

    @InjectMocks
    private SavingsService savingsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void whenSave_thenCorrect() {
        // given
        Long loanid = 1L;
        List<Integer> withdrawals = Arrays.asList(100, 200, 300);
        List<Integer> deposits = Arrays.asList(400, 500, 600);
        List<Integer> salaries = Arrays.asList(700, 800, 900);

        // when
        String result = savingsService.save(loanid, withdrawals, deposits, salaries);

        // then
        assertEquals("Savings correctly saved", result);
        verify(savingsRepository, times(3)).save(any(SavingEntity.class));
    }

    @Test
    void whenUpdate_thenCorrect() {
        // given
        Long loanid = 1L;
        List<Long> ids = Arrays.asList(1L, 2L, 3L);
        List<Integer> withdrawals = Arrays.asList(100, 200, 300);
        List<Integer> deposits = Arrays.asList(400, 500, 600);
        List<Integer> salaries = Arrays.asList(700, 800, 900);

        SavingEntity saving1 = new SavingEntity();
        saving1.setId(1L);
        saving1.setLoanid(1L);
        saving1.setWithdrawal(100);
        saving1.setDeposit(400);
        saving1.setSalary(700);
        saving1.setMonthsAgo(1);

        SavingEntity saving2 = new SavingEntity();
        saving2.setId(2L);
        saving2.setLoanid(1L);
        saving2.setWithdrawal(200);
        saving2.setDeposit(500);
        saving2.setSalary(800);
        saving2.setMonthsAgo(2);

        SavingEntity saving3 = new SavingEntity();
        saving3.setId(3L);
        saving3.setLoanid(1L);
        saving3.setWithdrawal(300);
        saving3.setDeposit(600);
        saving3.setSalary(900);
        saving3.setMonthsAgo(3);

        when(savingsRepository.findById(1L)).thenReturn(java.util.Optional.of(saving1));
        when(savingsRepository.findById(2L)).thenReturn(java.util.Optional.of(saving2));
        when(savingsRepository.findById(3L)).thenReturn(java.util.Optional.of(saving3));

        // when
        String result = savingsService.update(loanid, ids, withdrawals, deposits, salaries);

        // then
        assertEquals("Savings correctly updated", result);
        verify(savingsRepository, times(3)).save(any(SavingEntity.class));
    }

    @Test
    void whenGetAllByIdLoan_thenCorrect() {
        // given
        Long id = 1L;

        SavingEntity saving1 = new SavingEntity();
        saving1.setId(1L);
        saving1.setLoanid(1L);
        saving1.setWithdrawal(100);
        saving1.setDeposit(400);
        saving1.setSalary(700);
        saving1.setMonthsAgo(1);

        SavingEntity saving2 = new SavingEntity();
        saving2.setId(2L);
        saving2.setLoanid(1L);
        saving2.setWithdrawal(200);
        saving2.setDeposit(500);
        saving2.setSalary(800);
        saving2.setMonthsAgo(2);

        SavingEntity saving3 = new SavingEntity();
        saving3.setId(3L);
        saving3.setLoanid(1L);
        saving3.setWithdrawal(300);
        saving3.setDeposit(600);
        saving3.setSalary(900);
        saving3.setMonthsAgo(3);

        when(savingsRepository.findByLoanid(id)).thenReturn(java.util.List.of(saving1, saving2, saving3));

        // when
        List<SavingEntity> result = savingsService.getAllByIdLoan(id);

        // then
        assertEquals(java.util.List.of(saving1, saving2, saving3), result);
    }

    @Test
    void whenUpdateWithNullSaving_thenCorrect() {
        // given
        Long loanid = 1L;
        List<Long> ids = Arrays.asList(1L, 2L, 3L);
        List<Integer> withdrawals = Arrays.asList(100, 200, 300);
        List<Integer> deposits = Arrays.asList(400, 500, 600);
        List<Integer> salaries = Arrays.asList(700, 800, 900);

        when(savingsRepository.findById(anyLong())).thenReturn(java.util.Optional.empty());

        // when
        String result = savingsService.update(loanid, ids, withdrawals, deposits, salaries);

        // then
        assertEquals("Savings correctly updated", result);
        verify(savingsRepository, times(3)).findById(anyLong());
        verify(savingsRepository, never()).save(any(SavingEntity.class));
    }
}