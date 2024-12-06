package com.example.loan_service;

import com.example.loan_service.repository.LoanRepository;
import com.example.loan_service.service.LoanService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

public class LoanServiceTest {
    @Mock
    private LoanRepository loanRepository;

    @InjectMocks
    private LoanService loanService;

    @BeforeEach
    void setUp() {
        loanService = new LoanService(loanRepository);
    }

    @Test
    void whenUpdate_thenCorrect() {
        // given
        // when
        // then
    }
}
