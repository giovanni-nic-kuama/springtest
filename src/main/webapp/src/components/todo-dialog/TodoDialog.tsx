import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import React, {useState} from "react";
import {TodoReadDto} from "../../dtos/TodoReadDto";
import {Button, DialogActions, DialogContent, TextareaAutosize, TextField} from "@mui/material";
import {TodoCreateDto} from "../../dtos/TodoCreateDto";
import {TodoUpdateDto} from "../../dtos/TodoUpdateDto";

export interface TodoDialogProps {
  isOpen: boolean,
  onClose: Function,
  isNew: boolean,
  todo?: TodoReadDto,
  createTodo: Function,
  updateTodo: Function,
}

export function TodoDialog(props: TodoDialogProps) {
  const [title, setTitle] = useState<string>('')
  const [todoMessage, setTodoMessage] = useState<string>('')

  const {isOpen, isNew, todo} = props

  function onSubmit() {
    if (isNew) {
      const todoToCreate: TodoCreateDto = {
        title: title,
        todoMessage: todoMessage,
        inProgress: false,
        isDone: false
      }
      props.createTodo(todoToCreate)
    } else {
      const todoToUpdate: TodoUpdateDto = {
        id: todo!.id,
        title: title,
        todoMessage: todoMessage,
        inProgress: false,
        isDone: false
      }
      props.updateTodo(todoToUpdate)
    }
    setTodoMessage('')
    setTitle('')
    props.onClose()
  }

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={() => props.onClose}
        sx={{'& .MuiDialog-paper': {width: '80%', maxHeight: 435}}}
        maxWidth="sm"
      >
        {isNew ? (
          <DialogTitle>Create Todo</DialogTitle>
        ) : (
          <DialogTitle>Update Todo</DialogTitle>
        )}
        <DialogContent>
          <TextField
            autoFocus
            required={true}
            margin="dense"
            value={title}
            onChange={(text) => setTitle(text.target.value)}
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />

          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Todo"
            required={true}
            onChange={(text) => (setTodoMessage(text.target.value))}
            value={todoMessage}
            style={{width: "550px", height: "200px", marginTop: "2vh"}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.onClose()}>Cancel</Button>
          <Button onClick={() => onSubmit()}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}