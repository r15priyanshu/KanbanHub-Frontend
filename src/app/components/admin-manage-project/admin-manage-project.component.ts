import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
  selectedProjectDisplayId:string = "";
  addEmployeeToggleState:boolean = false
  selectedEmployeeId:number = 0;
  allEmployees?:EmployeeDto[];
  searchedProjectDetails:ProjectDto | null = null;

  constructor(private router:Router,private activatedRoute:ActivatedRoute,private projectService:ProjectService,private employeeService:EmployeeService,private businessOperationsService:BusinessOperationsService){
    console.log("Inside Constructor Of AdminManageProjectComponent.")
  }

  ngOnInit(): void {
    console.log("Inside ngOnInit Of AdminManageProjectComponent.")
    
    this.activatedRoute.queryParamMap.subscribe((next)=>{
      const projectDisplayIdFromQueryParam = next.get('projectDisplayId')
      if(projectDisplayIdFromQueryParam){
        console.log("Project Display Id Found In Query Param : Fetching Project Details Now !!")
        this.selectedProjectDisplayId = projectDisplayIdFromQueryParam
        this.projectService.getProjectByProjectDisplayId(this.selectedProjectDisplayId).subscribe({next:(next)=>{
            this.searchedProjectDetails = next
        },error:(error)=>{
            this.snackBar.open('!! Error Fetching Project Details !! Please Try Again Later !!','OK');
        }})
      }
    })
  }

  async handleProjectSearch(){
    console.log("Inside handleProjectSearch")
    if(!this.selectedProjectDisplayId){
      this.snackBar.open('!! Validation Failed !! Please Check Your Inputs !!','OK')
      return;
    }

    //Check whether query parameter is available ,if no - that means it's a direct search, if yes - update the query param also with the new search value.
    const projectDisplayIdFromQueryParam = this.activatedRoute.snapshot.queryParamMap.get("projectDisplayId")
    let isDirectSearch:boolean = false;
    if(projectDisplayIdFromQueryParam==null){
      isDirectSearch = true;
    }

    if(projectDisplayIdFromQueryParam && projectDisplayIdFromQueryParam != this.selectedProjectDisplayId){
      console.log("ProjectDisplayId From QueryParam and Current Search Did not Match , Hence Updating QueryParam !!")
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { projectDisplayId: this.selectedProjectDisplayId },
        queryParamsHandling: 'merge', // Merge with existing params
      });
    }

    if(isDirectSearch){
      try{
        console.log("Direct Search - Calling Api Now To Fetch Project Details !!")
        const data = await this.projectService.getProjectByProjectDisplayIdPromise(this.selectedProjectDisplayId)
        this.searchedProjectDetails=data
      }catch(error){
        this.snackBar.open('!! Error Fetching Project Details !! Please Try Again Later !!','OK');
        console.log(error)
      }
    }
    console.log("Completed handleProjectSearch !!")
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
        this.businessOperationsService.addEmployeeToProjectByDisplayId(this.selectedEmployeeId,this.selectedProjectDisplayId).subscribe({next:(next)=>{
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
        this.projectService.getProjectByProjectDisplayId(this.selectedProjectDisplayId).subscribe({next:(next)=>{
        this.searchedProjectDetails = next
    },error:(error)=>{
        this.snackBar.open('!! Error Fetching Project Details !! Please Try Again Later !!','OK');
    }})
    }
  }

  handleSearchChangeEvent(event:any){
    if(event.target.value!==0){
      this.selectedProjectDisplayId = event.target.value;
    }
  }
}
