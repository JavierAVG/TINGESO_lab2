package com.example.status_service.service;

import com.example.status_service.entity.StatusEntity;
import com.example.status_service.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatusService {
    @Autowired
    private StatusRepository statusRepository;

    public StatusEntity save(Long id, int monthlyfee, int duration, int amount) {
        StatusEntity statusEntity = new StatusEntity();
        statusEntity.setId(id);
        statusEntity.setState("En Evaluación");

        statusEntity.setMonthlyfee(monthlyfee);
        statusEntity.setCreditlifeinsurance((int) Math.round(amount*0.0003));
        statusEntity.setFireinsurance(20000);
        statusEntity.setCommision((int) Math.round(amount*0.01));
        statusEntity.setMonthlycost(monthlyfee + statusEntity.getCreditlifeinsurance() + statusEntity.getFireinsurance());
        statusEntity.setTotalcost((monthlyfee * (duration*12)) + statusEntity.getCommision());

        return statusRepository.save(statusEntity);
    }

    public StatusEntity updateState(Long id, String state) {
        StatusEntity statusEntity = statusRepository.findById(id).orElse(null);
        statusEntity.setState(state);
        return statusRepository.save(statusEntity);
    }

    public StatusEntity getStatusById(Long id) {
        return statusRepository.findById(id).orElse(null);
    }

    public Iterable<StatusEntity> getStatuses() {
        return statusRepository.findAll();
    }
}
