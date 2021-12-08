package com.gn.springtest.mappings

import com.gn.springtest.domain.Todo
import com.gn.springtest.dto.TodoCreateDto
import com.gn.springtest.dto.TodoRUDto

class TodoMappings {
    companion object {
        fun map(todoRUDto: TodoRUDto) = Todo(
            id = todoRUDto.id,
            todoMessage = todoRUDto.todoMessage,
            isDone = todoRUDto.isDone
        )

        fun map(todo: Todo) = TodoRUDto(
            id = todo.id!!,
            todoMessage = todo.todoMessage,
            isDone = todo.isDone
        )

        fun map(todoCreateDto: TodoCreateDto) = Todo(
            id = null,
            todoMessage = todoCreateDto.todoMessage,
            isDone = false
        )
    }
}
