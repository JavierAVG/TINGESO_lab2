package com.example.evaluation_service.controller;

import com.example.evaluation_service.entity.EvaluationEntity;
import com.example.evaluation_service.service.EvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/evaluation")
public class EvaluationController {
    @Autowired
    private EvaluationService evaluationService;

    @GetMapping("/evaluate")
    public List<String> evaluate(@RequestBody EvaluationEntity evaluationEntity) {
        return evaluationService.evaluate(evaluationEntity);
    }

}
