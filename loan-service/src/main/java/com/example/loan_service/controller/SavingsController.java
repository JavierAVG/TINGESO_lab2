package com.example.loan_service.controller;

import com.example.loan_service.entity.SavingEntity;
import com.example.loan_service.service.SavingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/loan/savings")
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

    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody Map<String, Object> data) {
        Long loanid = Long.valueOf(data.get("loanid").toString());
        List<Integer> withdrawals = (List<Integer>) data.get("withdrawals");
        List<Integer> deposits = (List<Integer>) data.get("deposits");
        List<Integer> salaries = (List<Integer>) data.get("salaries");
        List<Long> ids = ((List<Integer>) data.get("ids")).stream()
                .map(Integer::longValue)
                .collect(Collectors.toList());

        return ResponseEntity.ok(savingsService.update(loanid, ids, withdrawals, deposits, salaries));
    }

    @GetMapping("/getallbyloanid/{id}")
    public ResponseEntity<List<SavingEntity>> getAllByIdLoan(@PathVariable("id") Long id) {
        List<SavingEntity> savings = savingsService.getAllByIdLoan(id);
        return ResponseEntity.ok(savings);
    }
}
