import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { ProjectDto } from '../../dtos/ProjectDto';
import { DatePipe, JsonPipe } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeDto } from '../../dtos/EmployeeDto';
import { BusinessOperationsService } from '../../services/businessoperations.service';
import { AdminManageTaskComponent } from '../admin-manage-task/admin-manage-task.component';

@Component({
  selector: 'app-admin-manage-project',
  standalone: true,
  imports: [FormsModule,JsonPipe,DatePipe,AdminManageTaskComponent],
  templateUrl: './admin-manage-project.component.html',
  styleUrl: './admin-manage-project.component.css'
})
export class AdminManageProjectComponent implements OnInit{
  private snackBar = inject(MatSnackBar);
  selectedProjectId:number = 0;
  addEmployeeToggleState:boolean = false
  selectedEmployeeId:number = 0;
  allEmployees?:EmployeeDto[];
  searchedProjectDetails:ProjectDto | null = null;

  constructor(private activatedRoute:ActivatedRoute,private projectService:ProjectService,private employeeService:EmployeeService,private businessOperationsService:BusinessOperationsService){
    console.log("Inside Constructor Of AdminManageProjectComponent.")
  }

  ngOnInit(): void {
    console.log("Inside ngOnInit Of AdminManageProjectComponent.")
    
    this.activatedRoute.queryParamMap.subscribe((next)=>{
      const projectIdFromQueryParam = next.get('projectId')
      if(projectIdFromQueryParam){
        this.selectedProjectId = +projectIdFromQueryParam
        this.projectService.getProjectById(this.selectedProjectId).subscribe({next:(next)=>{
            this.searchedProjectDetails = next
        },error:(error)=>{
            this.snackBar.open('!! Error Fetching Project Details !! Please Try Again Later !!','OK');
        }})
      }
    })
  }

  async handleProjectSearch(){
    if(!this.selectedProjectId){
      this.snackBar.open('!! Validation Failed !! Please Check Your Inputs !!','OK');
    }else{
      try{
        const data = await this.projectService.getProjectByIdPromise(this.selectedProjectId)
        this.searchedProjectDetails=data
      }catch(error){
        console.log(error)
      }
    }
  }

  handleAddEmployeeToggle(){
    if(this.addEmployeeToggleState){
      this.employeeService.getAllEmployees().subscribe({next:(next)=>{
      this.allEmployees = [...next];
    },error:(error)=>{
      console.log(error)
      this.snackBar.open('!! Error Fetching All Employees Details !! Please Try Again Later !!','OK');
    }})
    }
  }

  handleAddEmployeeToProject(){
    if(this.selectedEmployeeId===0){
      this.snackBar.open('!! No Employee Seleted !! Please Check !!','OK');
    }else{
        this.businessOperationsService.addEmployeeToProject(this.selectedEmployeeId,this.selectedProjectId).subscribe({next:(next)=>{
          this.snackBar.open('!! Employee Successfully Added To The Project !!','OK');
          this.searchedProjectDetails = next;                            
      },error:(error)=>{
          console.log(error)
          this.snackBar.open('!! Error While Adding Employee To Project !! Please Try Again Later !!','OK');
      }})
    }
  }

  handleAddTaskEvent(isTaskAdded:boolean){
    if(isTaskAdded){
        this.projectService.getProjectById(this.selectedProjectId).subscribe({next:(next)=>{
        this.searchedProjectDetails = next
    },error:(error)=>{
        this.snackBar.open('!! Error Fetching Project Details !! Please Try Again Later !!','OK');
    }})
    }
  }

  handleSearchChangeEvent(event:any){
    if(event.target.value!==0){
      this.selectedProjectId = event.target.value;
    }
  }
}
