package org.example.backendia.IService;

import org.example.backendia.entities.DriverAvailability;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface IDriverAvailabilityService {

     DriverAvailability addAvailability(UUID driverId, DriverAvailability availability);
     List<DriverAvailability> getAllAvailabilities();
   List<DriverAvailability> getAvailabilitiesByDate(LocalDate date);
  List<DriverAvailability> getAvailabilitiesByDriver(UUID driverId);
 void deleteAvailability(UUID id);
}
