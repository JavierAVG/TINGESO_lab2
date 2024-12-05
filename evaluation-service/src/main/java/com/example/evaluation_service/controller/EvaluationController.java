package com.example.evaluation_service.controller;

import com.example.evaluation_service.entity.EvaluationEntity;
import com.example.evaluation_service.service.EvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/evaluation")
public class EvaluationController {
    @Autowired
    private EvaluationService evaluationService;

    @PostMapping("/evaluate")
    public List<String> evaluate(@RequestBody EvaluationEntity evaluationEntity) {
        return evaluationService.evaluate(evaluationEntity);
    }
}
