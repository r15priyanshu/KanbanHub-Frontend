import { Injectable } from '@angular/core';
import { ProjectDto } from '../dtos/ProjectDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GET_ALL_PROJECT_URL, ADD_EMPLOYEE_TO_PROJECT_URL, ADD_TASK_TO_PROJECT_URL } from '../helpers/globalconstants';
import { TaskDto } from '../dtos/TaskDto';

@Injectable({
  providedIn: 'root'
})
export class BusinessOperationsService {

  constructor(private httpClient:HttpClient) { }

  addEmployeeToProject(employeeId:number,projectId:number):Observable<ProjectDto>{
    return this.httpClient.get<ProjectDto>(ADD_EMPLOYEE_TO_PROJECT_URL(employeeId,projectId))
  }

  addTaskToProject(taskDto:TaskDto,projectId:number):Observable<ProjectDto>{
    return this.httpClient.post<ProjectDto>(ADD_TASK_TO_PROJECT_URL(projectId),taskDto)
  }
}
