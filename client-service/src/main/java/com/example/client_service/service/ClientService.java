package com.example.client_service.service;

import com.example.client_service.entity.ClientEntity;
import com.example.client_service.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;

import java.util.List;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;

    public ClientEntity save(ClientEntity client) {
        return clientRepository.save(client);
    }

    public List<ClientEntity> getClients() {
        return clientRepository.findAll();
    }

    public ClientEntity getClientById(int id) {
        return clientRepository.findById(id).orElse(null);
    }
}