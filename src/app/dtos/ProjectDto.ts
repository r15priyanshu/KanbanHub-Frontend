import { EmployeeDto } from './EmployeeDto';
import { TaskDto } from './TaskDto';

export class ProjectDto {
  public projectId?: number;
  public projectDisplayId?: string;
  public projectName: string;
  public description: string;
  public createdDate?: Date;
  public startDate?: Date;
  public endDate?: Date;
  public projectStatus?: string;
  public employees?: EmployeeDto[];
  public tasks?: TaskDto[];

  constructor(projectName: string, description: string) {
    this.projectName = projectName;
    this.description = description;
  }
}
