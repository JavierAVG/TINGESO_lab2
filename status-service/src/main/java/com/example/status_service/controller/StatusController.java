package com.example.status_service.controller;

import com.example.status_service.entity.StatusEntity;
import com.example.status_service.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/status")
public class StatusController {
    @Autowired
    private StatusService statusService;

    @PostMapping("/{id}")
    public ResponseEntity<StatusEntity> save(@PathVariable("id") Long id,
                                             @RequestParam("monthlyfee") int monthlyfee,
                                             @RequestParam("duration") int duration,
                                             @RequestParam("amount") int amount){
        return ResponseEntity.ok(statusService.save(id, monthlyfee, duration, amount));
    }

}
