package com.jconf.tareasapi.controller;

import com.jconf.tareasapi.model.Tarea;
import com.jconf.tareasapi.repository.TareaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tareas")
@CrossOrigin(origins = "*")
public class TareaController {
    
    private static final Logger logger = LoggerFactory.getLogger(TareaController.class);
    
    @Autowired
    private TareaRepository tareaRepository;
    
    @GetMapping
    public List<Tarea> getAllTareas() {
        logger.info("Obteniendo todas las tareas");
        return tareaRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Tarea> getTareaById(@PathVariable Long id) {
        logger.info("Obteniendo tarea con id: {}", id);
        return tareaRepository.findById(id)
            .map(tarea -> ResponseEntity.ok(tarea))
            .orElseGet(() -> {
                logger.warn("Tarea con id {} no encontrada", id);
                return ResponseEntity.notFound().build();
            });
    }
    
    @GetMapping("/completadas")
    public List<Tarea> getTareasCompletadas() {
        logger.info("Obteniendo tareas completadas");
        return tareaRepository.findByCompletada(true);
    }
    
    @PostMapping
    public ResponseEntity<Tarea> createTarea(@RequestBody Tarea tarea) {
        logger.info("Creando nueva tarea: {}", tarea.getTitulo());
        Tarea savedTarea = tareaRepository.save(tarea);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTarea);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Tarea> updateTarea(@PathVariable Long id, @RequestBody Tarea tareaDetails) {
        logger.info("Actualizando tarea con id: {}", id);
        return tareaRepository.findById(id)
            .map(tarea -> {
                tarea.setTitulo(tareaDetails.getTitulo());
                tarea.setCompletada(tareaDetails.isCompletada());
                Tarea updatedTarea = tareaRepository.save(tarea);
                return ResponseEntity.ok(updatedTarea);
            })
            .orElseGet(() -> {
                logger.warn("Tarea con id {} no encontrada al actualizar", id);
                return ResponseEntity.notFound().build();
            });
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTarea(@PathVariable Long id) {
        logger.info("Eliminando tarea con id: {}", id);
        return tareaRepository.findById(id)
            .map(tarea -> {
                tareaRepository.delete(tarea);
                return ResponseEntity.noContent().<Void>build();
            })
            .orElseGet(() -> {
                logger.warn("Tarea con id {} no encontrada al eliminar", id);
                return ResponseEntity.notFound().build();
            });
    }
}
