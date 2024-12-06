package com.example.loan_service.service;

import com.example.loan_service.entity.LoanEntity;
import com.example.loan_service.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

import static java.lang.Math.pow;

@Service
public class LoanService {
    @Autowired
    private LoanRepository loanRepository;
    @Autowired
    RestTemplate restTemplate;

    public LoanEntity save(LoanEntity loan) {
        LoanEntity newloan = loanRepository.save(loan);

        double i = (loan.getInterestrate()/12.0)/100.0;
        double n = loan.getDuration()* 12.0;
        int monthlyfee = (int) (loan.getAmount()*(i*pow(1.0+i,n))/(pow(1.0+i,n)-1.0));
        int duration = loan.getDuration();
        int amount = loan.getAmount();

        // Construir la URL para la solicitud POST
        String url = "http://status-service/status/" + newloan.getId() + "?monthlyfee=" + monthlyfee + "&duration=" + duration + "&amount=" + amount;
        // Enviar la solicitud POST usando RestTemplate
        restTemplate.postForObject(url, null, String.class);

        return newloan;
    }

    public LoanEntity update(LoanEntity loan) {
        return loanRepository.save(loan);
    }

    public LoanEntity getLoan(Integer id) {
        return loanRepository.findById(id).orElse(null);
    }

    public List<LoanEntity> getLoans() {
        return loanRepository.findAll();
    }

    public ArrayList<LoanEntity>  getLoansByClientId(Long id){
        return (ArrayList<LoanEntity>) loanRepository.findByClientid(id);
    }
}
