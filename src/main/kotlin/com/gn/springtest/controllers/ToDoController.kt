package com.gn.springtest.controllers

import com.gn.springtest.dto.TodoCreateDto
import com.gn.springtest.dto.TodoRUDto
import com.gn.springtest.mappings.TodoMappings
import com.gn.springtest.services.TodoService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class ToDoController(val todoService: TodoService) {


    @GetMapping("/todo/{id}")
    fun getOne(@PathVariable id: Long): ResponseEntity<TodoRUDto> {
        val todo = todoService.getOneById(id)

        todo?.let {
            return ResponseEntity.ok(TodoMappings.map(it))
        }

        return ResponseEntity.notFound().build()
    }

    @GetMapping("/todo")
    fun getAll(pageable: Pageable): Page<TodoRUDto> {
        val result = todoService.getAllPaginated(pageable)
        return result.map {
            TodoMappings.map(it)
        }
    }

    @PutMapping("todo")
    fun update(@RequestBody todoRUDto: TodoRUDto): ResponseEntity<TodoRUDto> {
        val todo = todoService.getOneById(todoRUDto.id)

        todo?.let {
            return ResponseEntity.ok(TodoMappings.map(todoService.update(todoRUDto)))
        }

        return ResponseEntity.notFound().build()
    }

    @PostMapping("todo")
    fun create(@RequestBody todoCreateDto: TodoCreateDto): TodoRUDto {
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