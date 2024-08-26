export class TaskDto {
  public taskId?: number;
  public taskName: string;
  public taskDescription: string;
  public taskStatus?: string;
  public startDate?: Date;
  public dueDate: Date;

  constructor(
    taskName: string,
    taskDescription: string,
    dueDate: Date
  ) {
    this.taskName = taskName;
    this.taskDescription = taskDescription;
    this.dueDate = dueDate;
  }
}
