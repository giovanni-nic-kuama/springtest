import {PageRequest} from "../utils/PageRequest";
import axios, {AxiosResponse} from "axios";
import {PageResponse} from "../utils/PageResponse";
import {TodoUpdateDto} from "../dtos/TodoUpdateDto";
import {TodoCreateDto} from "../dtos/TodoCreateDto";
import {TodoReadDto} from "../dtos/TodoReadDto";

export class ToDoRepository {
  public static readonly apiUrl = "http://localhost:8080/api/todo"

  static getAllTodos(pageRequest: PageRequest): Promise<AxiosResponse<PageResponse<TodoReadDto>>> {
    const query = `?paged=true&pageNumber=${pageRequest.pageNumber}&pageSize=${pageRequest.pageSize}&sort=updateDate,desc`;

    return axios.get<PageResponse<TodoReadDto>>(this.apiUrl + query);
  }

  static getAllCompleted(pageRequest: PageRequest): Promise<AxiosResponse<PageResponse<TodoReadDto>>> {
    const query = `/completed?paged=true&pageNumber=${pageRequest.pageNumber}&pageSize=${pageRequest.pageSize}&sort=updateDate,desc`;

    return axios.get<PageResponse<TodoReadDto>>(this.apiUrl + query);
  }

  static getAllInProgress(pageRequest: PageRequest): Promise<AxiosResponse<PageResponse<TodoReadDto>>> {
    const query = `/inProgress?paged=true&pageNumber=${pageRequest.pageNumber}&pageSize=${pageRequest.pageSize}&sort=updateDate,desc`;

    return axios.get<PageResponse<TodoReadDto>>(this.apiUrl + query);
  }

  static getOne(id: number): Promise<AxiosResponse<TodoReadDto>> {
    let query = `/${id}`;
    return axios.get<TodoReadDto>(this.apiUrl + query)
  }

  static create(todo: TodoCreateDto): Promise<AxiosResponse<TodoReadDto>> {
    return axios.post<TodoReadDto>(this.apiUrl, todo)
  }

  static update(todo: TodoUpdateDto): Promise<AxiosResponse<TodoReadDto>> {
    return axios.put<TodoReadDto>(this.apiUrl, todo)
  }

  static delete(id: number): Promise<AxiosResponse> {
    let query = `/${id}`;
    return axios.delete(this.apiUrl + query)
  }
}