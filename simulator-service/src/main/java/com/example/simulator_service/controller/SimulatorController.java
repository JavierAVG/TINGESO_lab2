package com.example.simulator_service.controller;

import com.example.simulator_service.service.SimulatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/simulator")
public class SimulatorController {
    @Autowired
    SimulatorService simulatorService;

    @GetMapping("/")
    public ResponseEntity<Integer> simulate(@RequestParam("interestrate") double interest_rate, @RequestParam("duration") int duration, @RequestParam("amount") int amount) {
        int monthly_fee = simulatorService.simulate(interest_rate, duration, amount);
        return ResponseEntity.ok(monthly_fee);
    }
}
