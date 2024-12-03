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

    @PutMapping("/updatestate/{id}")
    public ResponseEntity<StatusEntity> updateState(@PathVariable("id") Long id,
                                                    @RequestParam("state") String state) {
        return ResponseEntity.ok(statusService.updateState(id, state));
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<StatusEntity> getStatusById(@PathVariable("id") Long id) {
        StatusEntity status = statusService.getStatusById(id);
        if (status == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(status);
    }

    @GetMapping("/getall")
    public ResponseEntity<Iterable<StatusEntity>> getStatuses() {
        Iterable<StatusEntity> statuses = statusService.getStatuses();
        if (statuses == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(statuses);
    }

}
