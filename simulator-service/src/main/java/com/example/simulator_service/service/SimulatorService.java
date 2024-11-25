package com.example.simulator_service.service;

import org.springframework.stereotype.Service;

import static java.lang.Math.pow;

@Service
public class SimulatorService {
    public int simulate(double annual_interest, int duration_in_years, int amount) {
        double i = (annual_interest/12.0)/100.0;
        double n = duration_in_years * 12.0;
        return (int) (amount*(i*pow(1.0+i,n))/(pow(1.0+i,n)-1.0));
    }
}
