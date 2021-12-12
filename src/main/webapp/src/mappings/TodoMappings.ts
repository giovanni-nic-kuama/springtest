import {TodoReadDto} from "../dtos/TodoReadDto";
import {TodoUpdateDto} from "../dtos/TodoUpdateDto";


export class TodoMappings {
  static Map(todoReadDto: TodoReadDto): TodoUpdateDto {
    return {
      id: todoReadDto.id,
      title: todoReadDto.title,
      todoMessage: todoReadDto.todoMessage,
      inProgress: todoReadDto.inProgress,
      isDone: todoReadDto.isDone
    }
  }
}