package com.example.client_service.controller;

import com.example.client_service.entity.ClientEntity;
import com.example.client_service.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/client")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/getall")
    public ResponseEntity<List<ClientEntity>> getClients() {
        List<ClientEntity> clients = clientService.getClients();
        if (clients == null || clients.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(clients);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ClientEntity> getClientById(@PathVariable("id") int id) {
        ClientEntity client = clientService.getClientById(id);
        if (client == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(client);
    }

    @PostMapping("/save")
    public ResponseEntity<ClientEntity> save(@RequestBody ClientEntity client) {
        return ResponseEntity.ok(clientService.save(client));
    }
}