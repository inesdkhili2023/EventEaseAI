package org.example.backendia.repositories;

import org.example.backendia.entities.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Repository
public interface DriverRepository  extends JpaRepository<Driver, UUID> {
    @Query(value = """
        SELECT d FROM Driver d 
        WHERE d.available = true 
        AND ST_Distance(
            ST_Point(d.longitude, d.latitude), 
            ST_Point(:lng, :lat)
        ) <= :radius
        """, nativeQuery = true)
    List<Driver> findAvailableDriversNearLocation(@Param("lat") double lat,
                                                  @Param("lng") double lng,
                                                  @Param("radius") double radiusKm);

    @Query("SELECT d FROM Driver d WHERE d.available = true")
    List<Driver> findAllAvailableDrivers();
}
