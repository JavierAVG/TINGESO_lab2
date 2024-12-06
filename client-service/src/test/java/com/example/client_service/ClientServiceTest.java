package com.example.client_service;

import com.example.client_service.entity.ClientEntity;
import com.example.client_service.repository.ClientRepository;
import com.example.client_service.service.ClientService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

public class ClientServiceTest {
    @Mock
    private ClientRepository clientRepository;

    @InjectMocks
    private ClientService clientService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void whenSave_thenCorrect() {
        // given
        ClientEntity client = new ClientEntity();
        client.setId(1);
        client.setName("John Doe");

        // when
        when(clientRepository.save(client)).thenReturn(client);
        ClientEntity savedClient = clientService.save(client);

        // then
        assertThat(savedClient).isEqualTo(client);
    }

    @Test
    void whenGetClients_thenCorrect() {
        // given
        ClientEntity client = new ClientEntity();
        client.setId(1);
        client.setName("John Doe");

        // when
        when(clientRepository.findAll()).thenReturn(List.of(client));
        List<ClientEntity> clients = clientService.getClients();

        // then
        assertThat(clients).contains(client);
    }

    @Test
    void whenGetClientById_thenCorrect() {
        // given
        ClientEntity client = new ClientEntity();
        client.setId(1);
        client.setName("John Doe");

        // when
        when(clientRepository.findById(1)).thenReturn(java.util.Optional.of(client));
        ClientEntity foundClient = clientService.getClientById(1);

        // then
        assertThat(foundClient).isEqualTo(client);
    }
}
