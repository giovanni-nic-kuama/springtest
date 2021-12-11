import React, {useEffect, useState} from "react";
import '../../App.css';
import {ToDoRepository} from "../../repositories/ToDoRepository";
import {PageRequest} from "../../utils/PageRequest";
import {initialPageStatus, PageStatus} from "../../utils/PageStatus";
import {TodoRUDto} from "../../dtos/TodoRUDto";
import {ResponseMappings} from "../../mappings/ResponseMappings";
import {TodoIndex} from "../todo-index/TodoIndex";

function Body() {
  const [pageStatus, setPageStatus] = useState<PageStatus>(initialPageStatus)
  const [todoList, setTodoList] = useState<readonly TodoRUDto[]>([])

  useEffect(() => {
    async function fetchTodos() {
      const pageRequest: PageRequest = {
        paged: true,
        pageNumber: 0,
        pageSize: 20
      }
      let response = await ToDoRepository.getAll(pageRequest)

      if (response.status != 200) {
        // Manage error
      } else {
        setTimeout(() => {
          setTodoList(response.data.content)
          setPageStatus(ResponseMappings.ToPageStatus(response.data))
        }, 3000);
      }
    }

    fetchTodos()
  }, [])

  return (
    <div className="appBody">
      {todoList.length > 0 ? (
          <div className="indexContainer">
            <TodoIndex todos={todoList} totalTodosCount={pageStatus.totalElements} title={"Todos"}/>
            <TodoIndex todos={todoList} totalTodosCount={pageStatus.totalElements} title={"Completed"}/>
          </div>
      ) : (
        <div>
          <h1>Loading</h1>
        </div>
      )}
    </div>
  )
}

export default Body;