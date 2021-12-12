import React from "react";
import {TodoUpdateDto} from "../../dtos/TodoUpdateDto";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';

export interface TodoProps {
  todo: TodoUpdateDto
  setAsTodo: Function
  setAsInProgress: Function
  setAsCompleted: Function
  deleteTodo: Function
}

export function Todo(props: TodoProps) {
  const {todo} = props

  return (
    <div className="todo">
      <div className="buttonContainer">
        {
          !todo.inProgress ? (
            <IconButton aria-label="Progress" onClick={() => props.setAsInProgress(todo.id)} className="iconButton">
              <PendingIcon className="todoIcon"/>
            </IconButton>
          ) : (
            <IconButton aria-label="Cancel" onClick={() => props.setAsTodo(todo.id)} className="iconButton">
              <CancelIcon className="todoIcon"/>
            </IconButton>
          )
        }
        {
          !todo.isDone ? (
            <IconButton aria-label="Done" onClick={() => props.setAsCompleted(todo.id)}>
              <DoneIcon className="todoIcon"/>
            </IconButton>
          ) : (
            <IconButton aria-label="Cancel" onClick={() => props.setAsTodo(todo.id)}>
              <CancelIcon className="todoIcon"/>
            </IconButton>
          )
        }
        <IconButton aria-label="Edit">
          <EditIcon className="todoIcon"/>
        </IconButton>
        <IconButton aria-label="Delete" onClick={() => props.deleteTodo(todo.id)}>
          <DeleteIcon className="todoIcon"/>
        </IconButton>
      </div>
      <div className="todoTitle">
        <code>
          &#9679;
        </code>
        {todo.title}
      </div>
      <div className="todoMesageArea">
        {todo.todoMessage}
      </div>
    </div>
  )
}