import React, {useEffect, useState} from "react";
import '../../App.css';
import {ToDoRepository} from "../../repositories/ToDoRepository";
import {PageRequest} from "../../utils/PageRequest";
import {initialPageStatus, PageStatus} from "../../utils/PageStatus";
import {TodoRUDto} from "../../dtos/TodoRUDto";
import {ResponseMappings} from "../../mappings/ResponseMappings";
import {TodoIndex} from "../todo-index/TodoIndex";

function Body() {
  const [notCompletedPageStatus, setNotCompletedPageStatus] = useState<PageStatus>(initialPageStatus)
  const [completedPageStatus, setCompletedPageStatus] = useState<PageStatus>(initialPageStatus)
  const [notCompletedTodoList, setNotCompletedTodoList] = useState<readonly TodoRUDto[]>([])
  const [completedTodoList, setCompletedTodoList] = useState<readonly TodoRUDto[]>([])

  useEffect(() => {
    async function fetchTodos() {
      const pageRequest: PageRequest = {
        paged: true,
        pageNumber: 0,
        pageSize: 20
      }
      let notCompletedResponse = await ToDoRepository.getAllNotCompleted(pageRequest)
      let completedResponse = await ToDoRepository.getAllCompleted(pageRequest)

      if (notCompletedResponse.status !== 200) {

      } else {
        setTimeout(() => {
          setNotCompletedTodoList(notCompletedResponse.data.content)
          setNotCompletedPageStatus(ResponseMappings.ToPageStatus(notCompletedResponse.data))
        }, 3000);
        setTimeout(() => {
          setCompletedTodoList(completedResponse.data.content)
          setCompletedPageStatus(ResponseMappings.ToPageStatus(completedResponse.data))
        }, 1000);
      }
    }

    fetchTodos()
  }, [])

  return (
    <div className="appBody">
      <div className="indexContainer">
        <TodoIndex todos={notCompletedTodoList} totalTodosCount={notCompletedPageStatus.totalElements} title={"Todos"}/>
        <TodoIndex todos={completedTodoList} totalTodosCount={completedPageStatus.totalElements} title={"In Progress"}/>
        <TodoIndex todos={completedTodoList} totalTodosCount={completedPageStatus.totalElements} title={"Completed"}/>
      </div>
    </div>
  )
}

export default Body;