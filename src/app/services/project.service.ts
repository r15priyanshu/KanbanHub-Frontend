import { Injectable } from '@angular/core';
import { ProjectDto } from '../dtos/ProjectDto';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  GET_ALL_PROJECT_URL,
  GET_PROJECT_BY_ID_URL,
} from '../helpers/globalconstants';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private httpClient: HttpClient) {}

  getAllProjects(): Observable<ProjectDto[]> {
    return this.httpClient.get<ProjectDto[]>(GET_ALL_PROJECT_URL);
  }

  getProjectById(projectId: number): Observable<ProjectDto> {
    return this.httpClient.get<ProjectDto>(GET_PROJECT_BY_ID_URL(projectId));
  }

  getProjectByIdPromise(projectId: number) : Promise<ProjectDto> {
    return firstValueFrom(this.getProjectById(projectId));
  }

  createProject(projectDto: ProjectDto) {
    return this.httpClient.post(GET_ALL_PROJECT_URL, projectDto);
  }
}
