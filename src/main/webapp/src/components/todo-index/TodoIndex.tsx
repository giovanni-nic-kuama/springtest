import React from "react";
import {TodoRUDto} from "../../dtos/TodoRUDto";
import {Todo} from "../todo/Todo";

export interface TodoIndexProps {
  todos: readonly TodoRUDto[]
  totalTodosCount: number
  title: string
}

export function TodoIndex(props: TodoIndexProps) {
  const {todos, totalTodosCount, title} = props

  return (
    <div className="todoContainer">
      <div className="todosTitle">
        <h1>{title}</h1>
        <div className="counter">
          {totalTodosCount}
        </div>
      </div>

      <div className="todoListContainer">
        {todos.map(todo => (
          <Todo todo={todo}/>
        ))}
      </div>
    </div>
  )
}