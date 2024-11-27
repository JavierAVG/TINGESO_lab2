package com.example.loan_service.controller;

import com.example.loan_service.entity.LoanEntity;
import com.example.loan_service.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/loan")
public class LoanController {
    @Autowired
    private LoanService loanService;

    @PostMapping("/save")
    public ResponseEntity<LoanEntity> save(@RequestBody LoanEntity loan) {
        return ResponseEntity.ok(loanService.save(loan));
    }
}
