package org.example.backendia.IService;

import org.example.backendia.DTO.DriverDTO;
import org.example.backendia.DTO.MatchResultDTO;
import org.example.backendia.DTO.RiderRequestDTO;

import java.util.List;
import java.util.Map;

public interface IRiderDriverMatch {
     List<MatchResultDTO> findBestDrivers(RiderRequestDTO rider, List<DriverDTO> drivers, int topK);
    Map<String, Object> convertRiderToMap(RiderRequestDTO rider);
    Map<String, Object> convertDriverToMap(DriverDTO driver);
    MatchResultDTO convertToMatchResultDTO(Map<String, Object> matchData);
    List<MatchResultDTO> fallbackMatching(RiderRequestDTO rider, List<DriverDTO> drivers, int topK);
    double calculateDistance(double lat1, double lon1, double lat2, double lon2);
    MatchResultDTO convertToBasicMatchResultDTO(DriverDTO driver);
}
