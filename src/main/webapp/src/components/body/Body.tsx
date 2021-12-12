import React, {useEffect, useState} from "react";
import '../../App.css';
import {ToDoRepository} from "../../repositories/ToDoRepository";
import {PageRequest} from "../../utils/PageRequest";
import {initialPageStatus, PageStatus} from "../../utils/PageStatus";
import {TodoUpdateDto} from "../../dtos/TodoUpdateDto";
import {ResponseMappings} from "../../mappings/ResponseMappings";
import {TodoIndex} from "../todo-index/TodoIndex";
import {TodoReadDto} from "../../dtos/TodoReadDto";
import {TodoMappings} from "../../mappings/TodoMappings";
import {Button} from "@mui/material";
import {TodoCreateDto} from "../../dtos/TodoCreateDto";
import {TodoDialog} from "../todo-dialog/TodoDialog";

function Body() {
  const [todosPageStatus, setTodosPageStatus] = useState<PageStatus>(initialPageStatus)
  const [inProgressPageStatus, setInProgressPageStatus] = useState<PageStatus>(initialPageStatus)
  const [completedPageStatus, setCompletedPageStatus] = useState<PageStatus>(initialPageStatus)

  const [todosList, setTodosList] = useState<readonly TodoReadDto[]>([])
  const [inProgressTodoList, setInProgressTodoList] = useState<readonly TodoReadDto[]>([])
  const [completedTodoList, setCompletedTodoList] = useState<readonly TodoReadDto[]>([])

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isEditDialogOpen, setEditDialogOpen] = useState<boolean>(false)

  function getTodoFromStorage(id: number): TodoReadDto {
    const maybeTodo1 = completedTodoList.filter(it => it.id === id)
    const maybeTodo2 = todosList.filter(it => it.id === id)
    const maybeTodo3 = inProgressTodoList.filter(it => it.id === id)

    if (maybeTodo1.length > 0) {
      return maybeTodo1[0]
    }
    if (maybeTodo2.length > 0) {
      return maybeTodo2[0]
    }
    return maybeTodo3[0]
  }

  function deleteTodo(id: number) {
    setIsLoading(true)

    async function deleteTodo(id: number) {
      await ToDoRepository.delete(id)
    }

    deleteTodo(id).then(fetchTodos).then(() => setIsLoading(false))
  }

  function setAsInProgress(id: number) {
    setIsLoading(true)
    const todo = getTodoFromStorage(id)
    const todoToUpdate = TodoMappings.Map(todo)
    todoToUpdate.isDone = false
    todoToUpdate.inProgress = true
    updateTodo(todoToUpdate).then(() => {
      fetchTodos().then(() => {
        setIsLoading(false)
      })
    })
  }

  function setAsCompleted(id: number) {
    const todo = getTodoFromStorage(id)
    const todoToUpdate = TodoMappings.Map(todo)
    todoToUpdate.isDone = true
    todoToUpdate.inProgress = false
    updateTodo(todoToUpdate).then(() => {
      fetchTodos().then(() => {
        setIsLoading(false)
      })
    })
  }

  function setAsTodo(id: number) {
    setIsLoading(true)
    const todo = getTodoFromStorage(id)
    const todoToUpdate = TodoMappings.Map(todo)
    todoToUpdate.isDone = false
    todoToUpdate.inProgress = false
    updateTodo(todoToUpdate).then(() => {
      fetchTodos().then(() => {
        setIsLoading(false)
      })
    })
  }

  function createTodo(todo: TodoCreateDto) {
    setIsLoading(true)

    async function createTodo(todo: TodoCreateDto) {
      await ToDoRepository.create(todo)
    }

    createTodo(todo).then(() => fetchTodos().then(() => {
      setIsLoading(false)
    }))
  }

  function updateTodoAndFetch(todo: TodoUpdateDto) {
    setIsLoading(true)
    updateTodo(todo).then(() => {
      fetchTodos().then(() => {
        setIsLoading(false)
      })
    })
  }

  useEffect(() => {
    if (!isEditDialogOpen) {
      setIsLoading(true)
      fetchTodos().then(() => setIsLoading(false))
    }
  }, [isEditDialogOpen])

  async function fetchTodos() {
    const pageRequest: PageRequest = {
      paged: true,
      pageNumber: 0,
      pageSize: 20
    }

    let todosResponse = await ToDoRepository.getAllTodos(pageRequest)
    let inProgressResponse = await ToDoRepository.getAllInProgress(pageRequest)
    let completedResponse = await ToDoRepository.getAllCompleted(pageRequest)

    if (todosResponse.status !== 200) {

    } else {
      setTodosList(todosResponse.data.content)
      setTodosPageStatus(ResponseMappings.ToPageStatus(todosResponse.data))

      setCompletedTodoList(completedResponse.data.content)
      setCompletedPageStatus(ResponseMappings.ToPageStatus(completedResponse.data))

      setInProgressTodoList(inProgressResponse.data.content)
      setInProgressPageStatus(ResponseMappings.ToPageStatus(inProgressResponse.data))
    }
  }

  async function updateTodo(todoUpdateDto: TodoUpdateDto) {
    await ToDoRepository.update(todoUpdateDto)
  }

  return (
    <div className="appBody">
      <div className="indexContainer">
        <TodoIndex
          todos={todosList}
          setAsTodo={(id: number) => setAsTodo(id)}
          setAsCompleted={(id: number) => setAsCompleted(id)}
          setAsInProgress={(id: number) => setAsInProgress(id)}
          deleteTodo={(id: number) => deleteTodo(id)}
          totalTodosCount={todosPageStatus.totalElements}
          isLoading={isLoading}
          title={"Todos"}/>

        <TodoIndex
          todos={inProgressTodoList}
          setAsTodo={(id: number) => setAsTodo(id)}
          setAsCompleted={(id: number) => setAsCompleted(id)}
          setAsInProgress={(id: number) => setAsInProgress(id)}
          deleteTodo={(id: number) => deleteTodo(id)}
          totalTodosCount={inProgressPageStatus.totalElements}
          isLoading={isLoading}
          title={"In Progress"}/>

        <TodoIndex
          todos={completedTodoList}
          setAsTodo={(id: number) => setAsTodo(id)}
          setAsCompleted={(id: number) => setAsCompleted(id)}
          setAsInProgress={(id: number) => setAsInProgress(id)}
          deleteTodo={(id: number) => deleteTodo(id)}
          totalTodosCount={completedPageStatus.totalElements}
          isLoading={isLoading}
          title={"Completed"}/>

        <TodoDialog
          isNew={true}
          isOpen={isEditDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          createTodo={(todo: TodoCreateDto) => createTodo(todo)}
          updateTodo={(todo: TodoUpdateDto) => updateTodoAndFetch(todo)}
        />

        <Button onClick={() => setEditDialogOpen(true)}>
          Open
        </Button>

      </div>
    </div>
  )
}

export default Body;