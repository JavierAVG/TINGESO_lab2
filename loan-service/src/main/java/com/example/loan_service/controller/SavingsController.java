package com.example.loan_service.controller;

import com.example.loan_service.service.SavingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/savings")
public class SavingsController {
    @Autowired
    private SavingsService savingsService;

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody Map<String, Object> data) {
        Long loanid = Long.valueOf(data.get("loanid").toString());
        List<Integer> withdrawals = (List<Integer>) data.get("withdrawals");
        List<Integer> deposits = (List<Integer>) data.get("deposits");
        List<Integer> salaries = (List<Integer>) data.get("salaries");

        return ResponseEntity.ok(savingsService.save(loanid, withdrawals, deposits, salaries));
    }
}
