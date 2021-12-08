package com.gn.springtest.controllers

import com.gn.springtest.dto.TodoRUDto
import com.gn.springtest.mappings.TodoMappings
import com.gn.springtest.services.TodoService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class ToDoController(val todoService: TodoService) {


    @GetMapping("/{id}")
    fun getOne(@PathVariable id: Long): TodoRUDto? {
        val todo = todoService.getOneById(id)

        todo?.let {
            return TodoMappings.map(it)
        }

        return null
    }

}