export class TaskDto {
  public taskId?: number;
  public taskName: string;
  public taskDescription: string;
  public taskStatus: string;
  public startDate?: Date;
  public endDate: Date;

  constructor(
    taskName: string,
    taskDescription: string,
    taskStatus: string,
    endDate: Date
  ) {
    this.taskName = taskName;
    this.taskDescription = taskDescription;
    this.taskStatus = taskStatus;
    this.endDate = endDate;
  }
}
