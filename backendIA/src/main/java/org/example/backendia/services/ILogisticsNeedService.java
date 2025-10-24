package org.example.backendia.services;

import org.example.backendia.entities.LogisticsNeed;

import java.util.List;

public interface ILogisticsNeedService {

    // méthode CREATE (ajout d’un besoin logistique)
    LogisticsNeed addLogisticsNeed(LogisticsNeed n);
    // READ
    LogisticsNeed getLogisticsNeed(Long id);
    List<LogisticsNeed> getAllLogisticsNeeds();
    List<LogisticsNeed> getLogisticsNeedsByEvent(Long eventId);

    // UPDATE
    LogisticsNeed updateLogisticsNeed(Long id, LogisticsNeed n);

    // DELETE
    void deleteLogisticsNeed(Long id);

}
