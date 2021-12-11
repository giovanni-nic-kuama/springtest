import React from "react";
import {TodoRUDto} from "../../dtos/TodoRUDto";

export interface TodoProps {
  todo: TodoRUDto
}

export function Todo(props: TodoProps) {
  const {todo} = props
  return (
    <div className="todo">
      <div className="todoTitle">
        <code>
          &#9679;
        </code>
        {todo.id}
      </div>
      <div className="todoMesageArea">
        {todo.todoMessage}
      </div>
    </div>
  )
}