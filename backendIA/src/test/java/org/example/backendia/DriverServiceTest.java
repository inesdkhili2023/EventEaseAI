package org.example.backendia;

import org.example.backendia.entities.Driver;
import org.example.backendia.repositories.DriverRepository;
import org.example.backendia.services.DriverService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.jdbc.core.JdbcTemplate;

import java.time.LocalDate;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class DriverServiceTest {

    @Mock
    private DriverRepository driverRepository;

    @Mock
    private JdbcTemplate jdbcTemplate;

    @InjectMocks
    private DriverService driverService;

    private Driver driver;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        driver = new Driver();
        driver.setNom("Dupont");
        driver.setPrenom("Jean");
        driver.setPassword("secret123");
    }

    @Test
    void testAddDriver_shouldGenerateUUIDAndEncryptPassword() {
        // Mock du cryptage
        when(jdbcTemplate.queryForObject(anyString(), eq(String.class), any()))
                .thenReturn("$2a$10$abc123hashed");

        // Mock du repository.save()
        when(driverRepository.save(any(Driver.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Driver saved = driverService.addDriver(driver);

        assertNotNull(saved.getId(), "L'UUID doit être généré");
        assertEquals("CHAUFFEUR", saved.getRole());
        assertEquals(LocalDate.now(), saved.getCreated_at());
        assertEquals("$2a$10$abc123hashed", saved.getPassword());
        assertTrue(saved.getAvailable());

        verify(driverRepository, times(1)).save(any(Driver.class));
    }
}
