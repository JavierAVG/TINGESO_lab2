package com.example.status_service;

import com.example.status_service.entity.StatusEntity;
import com.example.status_service.repository.StatusRepository;
import com.example.status_service.service.StatusService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class StatusServiceTest {
    @Mock
    private StatusRepository statusRepository;

    @InjectMocks
    private StatusService statusService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void whenSave_thenCorrect() {
        // given
        Long id = 5L;
        int monthlyfee = 632649;
        int duration = 20;
        int amount = 100000000;

        StatusEntity expectedEntity = new StatusEntity();
        expectedEntity.setId(id);
        expectedEntity.setState("En Evaluación");
        expectedEntity.setMonthlyfee(monthlyfee);
        expectedEntity.setCreditlifeinsurance(30000);
        expectedEntity.setFireinsurance(20000);
        expectedEntity.setCommision(1000000);
        expectedEntity.setMonthlycost(682649);
        expectedEntity.setTotalcost(152835760);

        when(statusRepository.save(any(StatusEntity.class))).thenReturn(expectedEntity);

        // when
        StatusEntity actualEntity = statusService.save(id, monthlyfee, duration, amount);

        // then
        assertEquals(expectedEntity.getId(), actualEntity.getId());
        assertEquals(expectedEntity.getState(), actualEntity.getState());
        assertEquals(expectedEntity.getMonthlyfee(), actualEntity.getMonthlyfee());
        assertEquals(expectedEntity.getCreditlifeinsurance(), actualEntity.getCreditlifeinsurance());
        assertEquals(expectedEntity.getFireinsurance(), actualEntity.getFireinsurance());
        assertEquals(expectedEntity.getCommision(), actualEntity.getCommision());
        assertEquals(expectedEntity.getMonthlycost(), actualEntity.getMonthlycost());
        assertEquals(expectedEntity.getTotalcost(), actualEntity.getTotalcost());
    }

    @Test
    void whenUpdateState_thenCorrect() {
        // given
        Long id = 5L;
        String state = "Aprobado";

        StatusEntity expectedEntity = new StatusEntity();
        expectedEntity.setId(id);
        expectedEntity.setState(state);

        when(statusRepository.findById(id)).thenReturn(java.util.Optional.of(expectedEntity));
        when(statusRepository.save(any(StatusEntity.class))).thenReturn(expectedEntity);

        // when
        StatusEntity actualEntity = statusService.updateState(id, state);

        // then
        assertEquals(expectedEntity.getId(), actualEntity.getId());
        assertEquals(expectedEntity.getState(), actualEntity.getState());
    }

    @Test
    void whenGetStatusById_thenCorrect() {
        // given
        Long id = 5L;

        StatusEntity expectedEntity = new StatusEntity();
        expectedEntity.setId(id);
        expectedEntity.setState("En Evaluación");

        when(statusRepository.findById(id)).thenReturn(java.util.Optional.of(expectedEntity));

        // when
        StatusEntity actualEntity = statusService.getStatusById(id);

        // then
        assertEquals(expectedEntity.getId(), actualEntity.getId());
        assertEquals(expectedEntity.getState(), actualEntity.getState());
    }

    @Test
    void whenGetStatuses_thenCorrect() {
        // given
        StatusEntity expectedEntity = new StatusEntity();
        expectedEntity.setId(5L);
        expectedEntity.setState("En Evaluación");

        when(statusRepository.findAll()).thenReturn(java.util.List.of(expectedEntity));

        // when
        Iterable<StatusEntity> actualEntities = statusService.getStatuses();

        // then
        assertEquals(java.util.List.of(expectedEntity), actualEntities);
    }
}
