package com.gn.springtest.mappings

import com.gn.springtest.domain.Todo
import com.gn.springtest.dto.TodoCreateDto
import com.gn.springtest.dto.TodoReadDto
import com.gn.springtest.dto.TodoUpdateDto
import java.sql.Time
import java.time.LocalTime

class TodoMappings {
    companion object {
        fun map(todoUpdateDto: TodoUpdateDto, todoToUpdate: Todo) = Todo(
            id = todoUpdateDto.id,
            title = todoUpdateDto.title,
            todoMessage = todoUpdateDto.todoMessage,
            inProgress = todoUpdateDto.inProgress,
            isDone = todoUpdateDto.isDone,
            createDate = todoToUpdate.createDate,
            updateDate = Time.valueOf(LocalTime.now())
        )

        fun map(todo: Todo) = TodoReadDto(
            id = todo.id!!,
            title = todo.title,
            todoMessage = todo.todoMessage,
            inProgress = todo.inProgress,
            isDone = todo.isDone,
            createDate = todo.createDate,
            updateDate = todo.updateDate
        )

        fun map(todoCreateDto: TodoCreateDto) = Todo(
            id = null,
            title = todoCreateDto.title,
            todoMessage = todoCreateDto.todoMessage,
            inProgress = todoCreateDto.inProgress,
            isDone = false,
            createDate = Time.valueOf(LocalTime.now()),
            updateDate = null
        )
    }
}
