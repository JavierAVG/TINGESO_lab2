package com.example.loan_service.service;

import com.example.loan_service.entity.LoanEntity;
import com.example.loan_service.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class LoanService {
    @Autowired
    private LoanRepository loanRepository;
    //@Autowired
    //RestTemplate restTemplate;

    public LoanEntity save(LoanEntity loan) {
        return loanRepository.save(loan);
    }

    public List<LoanEntity> getLoans() {
        return loanRepository.findAll();
    }

    public ArrayList<LoanEntity>  getLoansByClientId(Long id){
        return (ArrayList<LoanEntity>) loanRepository.findByClientid(id);
    }
}
