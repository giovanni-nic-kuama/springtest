package com.gn.springtest.services

import com.gn.springtest.domain.Todo
import com.gn.springtest.dto.TodoCreateDto
import com.gn.springtest.dto.TodoUpdateDto
import com.gn.springtest.mappings.TodoMappings
import com.gn.springtest.repositories.ToDoSpecifications
import com.gn.springtest.repositories.TodoRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class TodoService(val todoRepository: TodoRepository) {
    fun getOneById(id: Long): Todo? {
        return todoRepository.findByIdOrNull(id)
    }

    fun getAllPaginated(pageable: Pageable): Page<Todo> {
        return todoRepository.findAll(pageable)
    }

    fun getAllCompleted(pageable: Pageable): Page<Todo> {
        return todoRepository.findAll(ToDoSpecifications.completed(true), pageable)
    }

    fun getAllInProgress(pageable: Pageable): Page<Todo> {
        return todoRepository.findAll(ToDoSpecifications.inProgress(true), pageable)
    }

    fun getAllTodos(pageable: Pageable): Page<Todo> {
        val specifications = ToDoSpecifications.completed(false)
            .and(ToDoSpecifications.inProgress(false))

        return todoRepository.findAll(specifications, pageable)
    }

    fun getAll(): MutableList<Todo> {
        return todoRepository.findAll()
    }

    fun delete(id: Long) {
        todoRepository.deleteById(id)
    }

    fun deleteInBatchById(ids: List<Long>) {
        todoRepository.deleteAllByIdInBatch(ids)
    }

    fun create(todoCreateDto: TodoCreateDto): Todo {
        val todoToCreate: Todo = TodoMappings.map(todoCreateDto)
        return todoRepository.save(todoToCreate)
    }

    fun update(todoUpdateDto: TodoUpdateDto, todoToUpdate: Todo): Todo {
        return todoRepository.save(TodoMappings.map(todoUpdateDto, todoToUpdate))
    }
}