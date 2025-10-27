package org.example.backendia.services;

import org.example.backendia.DTO.RiderRequestDTO;
import org.example.backendia.IService.IClientService;
import org.example.backendia.entities.Client;
import org.example.backendia.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ClientService implements IClientService {
    @Autowired
    ClientRepository clientRepository;
    @Override
    public RiderRequestDTO getRiderRequestDTO(UUID clientId) {
        Client client = clientRepository.findById(clientId).orElse(null);
        if (client == null) return null;

        RiderRequestDTO dto = new RiderRequestDTO();
        dto.setId(client.getId());
        dto.setLatitude(client.getLatitude());
        dto.setLongitude(client.getLongitude());
        dto.setPassengerCount(client.getPassengerCount());
        dto.setSpecialNeeds(client.getSpecialNeeds());
        dto.setUrgencyLevel(client.getUrgencyLevel());
        dto.setMaxWaitTime(client.getMaxWaitTime());
        dto.setNom(client.getNom());
        dto.setPrenom(client.getPrenom());
        dto.setNumTel(client.getNum_tel());

        return dto;
    }
}
