package org.example.backendia.DTO;

import lombok.Data;
import java.util.List;

@Data
public class MatchingRequestDTO {
    private RiderRequestDTO rider;
    private List<DriverDTO> drivers;
    private int topK = 3;
}
