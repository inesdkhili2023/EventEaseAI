package org.example.backendia.services;

import org.example.backendia.entities.LogisticsNeed;
import org.example.backendia.repositories.LogisticsNeedRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class LogisticsNeedService implements ILogisticsNeedService {
    private final LogisticsNeedRepository logisticsRepo;

    public LogisticsNeedService(LogisticsNeedRepository logisticsRepo) {
        this.logisticsRepo = logisticsRepo;
    }

    @Override
    public LogisticsNeed addLogisticsNeed(LogisticsNeed n) {
        return logisticsRepo.save(n);
    }

    @Override
    public LogisticsNeed getLogisticsNeed(Long id) {
        return logisticsRepo.findById(id).orElse(null);
    }

    @Override
    public List<LogisticsNeed> getAllLogisticsNeeds() {
        return logisticsRepo.findAll();
    }

    @Override
    public List<LogisticsNeed> getLogisticsNeedsByEvent(Long eventId) {
        return logisticsRepo.findByEventId(eventId);
    }

    @Override
    public LogisticsNeed updateLogisticsNeed(Long id, LogisticsNeed incoming) {
        LogisticsNeed cur = logisticsRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("LogisticsNeed " + id + " not found"));

        // Copie champ à champ (évite d’écraser des colonnes non fournies)
        cur.setEventId(incoming.getEventId());
        cur.setType(incoming.getType());
        cur.setItemName(incoming.getItemName());
        cur.setQuantity(incoming.getQuantity());
        cur.setUnit(incoming.getUnit());
        cur.setStatus(incoming.getStatus());
        cur.setNotes(incoming.getNotes());

        return logisticsRepo.save(cur);
    }

    @Override
    public void deleteLogisticsNeed(Long id) {
        if (!logisticsRepo.existsById(id)) {
            throw new NoSuchElementException("LogisticsNeed " + id + " not found");
        }
        logisticsRepo.deleteById(id);
    }
}
