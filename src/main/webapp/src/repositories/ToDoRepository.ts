import {PageRequest} from "../utils/PageRequest";
import axios, {AxiosResponse} from "axios";
import {PageResponse} from "../utils/PageResponse";
import {TodoRUDto} from "../dtos/TodoRUDto";
import {TodoCreateDto} from "../dtos/TodoCreateDto";

export class ToDoRepository {
  public static readonly apiUrl = "http://localhost:8080/api/todo"

  static getAllNotCompleted(pageRequest: PageRequest) : Promise<AxiosResponse<PageResponse<TodoRUDto>>>  {
    const query = `?paged=true&pageNumber=${pageRequest.pageNumber}&pageSize=${pageRequest.pageSize}`;

    return axios.get<PageResponse<TodoRUDto>>(this.apiUrl + query);
  }

  static getAllCompleted(pageRequest: PageRequest) : Promise<AxiosResponse<PageResponse<TodoRUDto>>>  {
    const query = `/completed?paged=true&pageNumber=${pageRequest.pageNumber}&pageSize=${pageRequest.pageSize}`;

    return axios.get<PageResponse<TodoRUDto>>(this.apiUrl + query);
  }

  static getOne(id: number) : Promise<AxiosResponse<TodoRUDto>> {
    let query = `/${id}`;
    return axios.get<TodoRUDto>(this.apiUrl + query)
  }

  static create(todo: TodoCreateDto) : Promise<AxiosResponse<TodoRUDto>> {
    return axios.post<TodoRUDto>(this.apiUrl, todo)
  }

  static update(todo: TodoRUDto) : Promise<AxiosResponse<TodoRUDto>> {
    return axios.put(this.apiUrl, todo)
  }

  static delete(id: number) : Promise<AxiosResponse> {
    let query = `/${id}`;
    return axios.delete(this.apiUrl + query)
  }
}