package com.example.loan_service.controller;

import com.example.loan_service.entity.LoanEntity;
import com.example.loan_service.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Book;
import java.util.List;

@RestController
@RequestMapping("/loan")
public class LoanController {
    @Autowired
    private LoanService loanService;

    @PostMapping("/save")
    public ResponseEntity<LoanEntity> save(@RequestBody LoanEntity loan) {
        return ResponseEntity.ok(loanService.save(loan));
    }

    @GetMapping("/getall")
    public ResponseEntity<List<LoanEntity>> getLoans() {
        List<LoanEntity> loans = loanService.getLoans();
        if (loans == null || loans.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(loans);
    }

    @GetMapping("/getallbyclientid/{id}")
    public ResponseEntity<List<LoanEntity>> getLoansByClientId(@PathVariable("id") Long id) {
        List<LoanEntity> loans = loanService.getLoansByClientId(id);
        if (loans == null || loans.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(loans);
    }
}
