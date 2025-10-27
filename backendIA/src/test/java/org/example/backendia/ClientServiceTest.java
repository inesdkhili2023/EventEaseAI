package org.example.backendia;


import org.example.backendia.DTO.RiderRequestDTO;
import org.example.backendia.entities.Client;
import org.example.backendia.repositories.ClientRepository;
import org.example.backendia.services.ClientService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ClientServiceTest {

    @Mock
    private ClientRepository clientRepository;

    @InjectMocks
    private ClientService clientService;

    private Client client;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        client = new Client();
        client.setId(UUID.randomUUID());
        client.setNom("Dupont");
        client.setPrenom("Marie");
        client.setLatitude(36.8);
        client.setLongitude(10.1);
        client.setPassengerCount(3);
        client.setSpecialNeeds("Fauteuil roulant");
        client.setUrgencyLevel("Élevé");
        client.setMaxWaitTime(10);
        client.setNum_tel("123456789");
    }

    @Test
    void testGetRiderRequestDTO_shouldReturnDTO_whenClientExists() {
        // Mock du repository
        when(clientRepository.findById(client.getId())).thenReturn(Optional.of(client));

        RiderRequestDTO dto = clientService.getRiderRequestDTO(client.getId());

        assertNotNull(dto);
        assertEquals(client.getId(), dto.getId());
        assertEquals(client.getLatitude(), dto.getLatitude());
        assertEquals(client.getLongitude(), dto.getLongitude());
        assertEquals(client.getPassengerCount(), dto.getPassengerCount());
        assertEquals(client.getSpecialNeeds(), dto.getSpecialNeeds());
        assertEquals(client.getUrgencyLevel(), dto.getUrgencyLevel());
        assertEquals(client.getMaxWaitTime(), dto.getMaxWaitTime());
        assertEquals(client.getNom(), dto.getNom());
        assertEquals(client.getPrenom(), dto.getPrenom());
        assertEquals(client.getNum_tel(), dto.getNumTel());

        verify(clientRepository, times(1)).findById(client.getId());
    }

    @Test
    void testGetRiderRequestDTO_shouldReturnNull_whenClientNotFound() {
        UUID randomId = UUID.randomUUID();
        when(clientRepository.findById(randomId)).thenReturn(Optional.empty());

        RiderRequestDTO dto = clientService.getRiderRequestDTO(randomId);

        assertNull(dto);
        verify(clientRepository, times(1)).findById(randomId);
    }
}

