package com.example.loan_service.service;

import com.example.loan_service.entity.SavingEntity;
import com.example.loan_service.repository.SavingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SavingsService {
    @Autowired
    private SavingsRepository savingsRepository;

    public String save(Long loanid, List<Integer> withdrawals, List<Integer> deposits, List<Integer> salaries) {
        for (int i = 0; i < withdrawals.size(); i++) {
            SavingEntity saving = new SavingEntity();
            saving.setLoanid(loanid);
            saving.setWithdrawal(withdrawals.get(i));
            saving.setDeposit(deposits.get(i));
            saving.setSalary(salaries.get(i));
            saving.setMonthsAgo(i+1);

            savingsRepository.save(saving);
        }
        return "Savings correctly saved";
    }
}
