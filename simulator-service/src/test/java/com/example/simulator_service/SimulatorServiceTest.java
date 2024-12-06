package com.example.simulator_service;

import com.example.simulator_service.service.SimulatorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class SimulatorServiceTest {
    @InjectMocks
    private SimulatorService simulatorService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void whenSimulate_thenCorrect() {
        // Given
        double annualInterest = 4.5;
        int durationInYears = 20;
        int amount = 100000000;
        int expected = 632649;

        // When
        int result = simulatorService.simulate(annualInterest, durationInYears, amount);

        // Then
        assertEquals(expected, result);
    }
}
