export interface TodoReadDto {
  id: number,
  title: string,
  todoMessage: string,
  inProgress: boolean,
  isDone: boolean,
  createDate: Date,
  updateDate?: Date
}