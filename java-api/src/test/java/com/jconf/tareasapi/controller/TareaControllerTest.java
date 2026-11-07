package com.jconf.tareasapi.controller;

import com.jconf.tareasapi.model.Tarea;
import com.jconf.tareasapi.repository.TareaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TareaControllerTest {
    
    @Mock
    private TareaRepository tareaRepository;
    
    @InjectMocks
    private TareaController tareaController;
    
    private Tarea tarea1;
    private Tarea tarea2;
    
    @BeforeEach
    void setUp() {
        tarea1 = new Tarea("Tarea 1", false);
        tarea1.setId(1L);
        
        tarea2 = new Tarea("Tarea 2", true);
        tarea2.setId(2L);
    }
    
    @Test
    void getAllTareas_ReturnsAllTareas() {
        List<Tarea> tareas = Arrays.asList(tarea1, tarea2);
        when(tareaRepository.findAll()).thenReturn(tareas);
        
        List<Tarea> result = tareaController.getAllTareas();
        
        assertEquals(2, result.size());
        verify(tareaRepository, times(1)).findAll();
    }
    
    @Test
    void getTareaById_ReturnsCorrectTarea() {
        when(tareaRepository.findById(1L)).thenReturn(Optional.of(tarea1));
        
        ResponseEntity<Tarea> result = tareaController.getTareaById(1L);
        
        assertTrue(result.getStatusCode().is2xxSuccessful());
        assertNotNull(result.getBody());
        assertEquals("Tarea 1", result.getBody().getTitulo());
    }
    
    @Test
    void createTarea_CreatesTarea() {
        Tarea newTarea = new Tarea("Nueva Tarea", false);
        newTarea.setId(3L);
        when(tareaRepository.save(any(Tarea.class))).thenReturn(newTarea);
        
        ResponseEntity<Tarea> result = tareaController.createTarea(newTarea);
        
        assertEquals(HttpStatus.CREATED, result.getStatusCode());
        assertNotNull(result.getBody());
        assertEquals("Nueva Tarea", result.getBody().getTitulo());
    }
    
    @Test
    void getTareasCompletadas_ReturnsOnlyCompletedTareas() {
        List<Tarea> completadas = Arrays.asList(tarea2);
        when(tareaRepository.findByCompletada(true)).thenReturn(completadas);
        
        List<Tarea> result = tareaController.getTareasCompletadas();
        
        assertEquals(1, result.size());
        assertTrue(result.get(0).isCompletada());
        verify(tareaRepository, times(1)).findByCompletada(true);
    }
}
