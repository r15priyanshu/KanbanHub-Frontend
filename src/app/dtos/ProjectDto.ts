import { EmployeeDto } from './EmployeeDto';
import { TaskDto } from './TaskDto';

export class ProjectDto {
  public projectId?: number;
  public projectDisplayId?: string;
  public projectName: string;
  public description: string;
  public startDate?: Date;
  public endDate?: Date;
  public statusActive?: boolean;
  public employees?: EmployeeDto[];
  public tasks?: TaskDto[];

  constructor(projectName: string, description: string) {
    this.projectName = projectName;
    this.description = description;
  }
}
