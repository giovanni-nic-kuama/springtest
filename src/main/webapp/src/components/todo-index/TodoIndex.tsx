import React from "react";
import {TodoUpdateDto} from "../../dtos/TodoUpdateDto";
import {Todo} from "../todo/Todo";
import CircularProgress from '@mui/material/CircularProgress';

export interface TodoIndexProps {
  todos: readonly TodoUpdateDto[]
  totalTodosCount: number
  title: string
  setAsTodo: Function
  setAsInProgress: Function
  setAsCompleted: Function
  deleteTodo: Function
  isLoading: boolean
}

export function TodoIndex(props: TodoIndexProps) {
  const {todos, totalTodosCount, title, isLoading} = props

  return (
    <div className="todoContainer">
      <div className="todosTitle">
        <h1>{title}</h1>
        <div className="counter">
          <h1>{totalTodosCount}</h1>
        </div>
      </div>


      {
        !isLoading ? (
          todos.length > 0 && (
            <div className="todoListContainer">
              {todos.map(todo => (
                <Todo
                  todo={todo}
                  setAsTodo={props.setAsTodo}
                  setAsCompleted={props.setAsCompleted}
                  setAsInProgress={props.setAsInProgress}
                  deleteTodo={props.deleteTodo}
                />))}
            </div>
          )
        ) : (
          <div className="progress">
            <CircularProgress className="spinner"/>
          </div>
        )
      }
    </div>
  )
}