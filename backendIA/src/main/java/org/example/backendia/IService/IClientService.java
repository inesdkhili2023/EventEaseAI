package org.example.backendia.IService;

import org.example.backendia.DTO.RiderRequestDTO;

import java.util.UUID;

public interface IClientService {
    public RiderRequestDTO getRiderRequestDTO(UUID clientId);
}

