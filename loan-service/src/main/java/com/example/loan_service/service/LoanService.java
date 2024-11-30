package com.example.loan_service.service;

import com.example.loan_service.entity.LoanEntity;
import com.example.loan_service.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoanService {
    @Autowired
    private LoanRepository loanRepository;

    public LoanEntity save(LoanEntity loan) {
        return loanRepository.save(loan);
    }
}
