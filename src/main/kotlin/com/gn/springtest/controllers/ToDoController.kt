package com.gn.springtest.controllers

import com.gn.springtest.dto.TodoCreateDto
import com.gn.springtest.dto.TodoReadDto
import com.gn.springtest.dto.TodoUpdateDto
import com.gn.springtest.mappings.TodoMappings
import com.gn.springtest.services.TodoService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@CrossOrigin(origins = ["http://localhost:3000", " http://192.168.1.150:3000"], maxAge = 3600)
@RestController
@RequestMapping("/api")
class ToDoController(val todoService: TodoService) {
    @GetMapping("/todo/{id}")
    fun getOne(@PathVariable id: Long): ResponseEntity<TodoReadDto> {
        val todo = todoService.getOneById(id)

        todo?.let { return ResponseEntity.ok(TodoMappings.map(it)) }

        return ResponseEntity.notFound().build()
    }

    @GetMapping("/todo")
    fun getAllTodos(pageable: Pageable): Page<TodoReadDto> {
        val result = todoService.getAllTodos(pageable)
        return result.map {
            TodoMappings.map(it)
        }
    }

    @GetMapping("/todo/completed")
    fun getAllCompleted(pageable: Pageable): Page<TodoReadDto> {
        val result = todoService.getAllCompleted(pageable)
        return result.map {
            TodoMappings.map(it)
        }
    }

    @GetMapping("/todo/inProgress")
    fun getAllInProgress(pageable: Pageable): Page<TodoReadDto> {
        val result = todoService.getAllInProgress(pageable)
        return result.map {
            TodoMappings.map(it)
        }
    }

    @PutMapping("todo")
    fun update(@RequestBody todoUpdateDto: TodoUpdateDto): ResponseEntity<TodoReadDto> {
        val todo = todoService.getOneById(todoUpdateDto.id)

        todo?.let { return ResponseEntity.ok(TodoMappings.map(todoService.update(todoUpdateDto, todo))) }

        return ResponseEntity.notFound().build()
    }

    @PostMapping("todo")
    fun create(@RequestBody todoCreateDto: TodoCreateDto): TodoReadDto {
        return TodoMappings.map(todoService.create(todoCreateDto))
    }

    @DeleteMapping("todo/{id}")
    fun delete(@PathVariable id: Long): ResponseEntity<Void> {
        val todo = todoService.getOneById(id)

        todo?.let {
            todoService.delete(id)
            return ResponseEntity.ok().build()
        }

        return ResponseEntity.notFound().build()
    }
}