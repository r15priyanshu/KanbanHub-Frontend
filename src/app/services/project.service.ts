import { Injectable } from '@angular/core';
import { ProjectDto } from '../dtos/ProjectDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GET_ALL_PROJECT_URL } from '../helpers/globalconstants';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient:HttpClient) { }

  getAllProjects():Observable<ProjectDto[]>{
    return this.httpClient.get<ProjectDto[]>(GET_ALL_PROJECT_URL)
  }

  createProject(projectDto:ProjectDto){
    return this.httpClient.post(GET_ALL_PROJECT_URL,projectDto)
  }
}
