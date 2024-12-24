import { Component, inject, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ProjectDto } from '../../dtos/ProjectDto';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { APPLICATION_NAME_SHORT } from '../../helpers/globalconstants';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-projects',
  standalone: true,
  imports: [DatePipe,ReactiveFormsModule,RouterModule],
  templateUrl: './admin-projects.component.html',
  styleUrl: './admin-projects.component.css',
})
export class AdminProjectsComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  projectFormGroup: FormGroup;
  projects?: ProjectDto[];
  APP_NAME_SHORT:string = APPLICATION_NAME_SHORT

  private initialFormValues = {
    projectName: '',
    description: ''
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private formBuilder: FormBuilder
  ) {
    this.projectFormGroup = this.formBuilder.group({
      projectName: new FormControl(this.initialFormValues.projectName, [
        Validators.required,
        Validators.minLength(5),
      ]),
      description: new FormControl(this.initialFormValues.description, [
        Validators.required,
        Validators.minLength(5),
      ])
    });
  }

  ngOnInit(): void {
    this.projects = this.activatedRoute.snapshot.data['allProjects'];
  }

  fetchAllProjects(){
    this.projectService.getAllProjects(true).subscribe({
      next: (next) => {
        this.projects = [...next];
      },
    });
  }

  handleProjectEdit(projectId: number | undefined) {
    const employee: ProjectDto | undefined = this.projects?.find((project) => {
      return project.projectId === projectId;
    });
    console.log(employee);
  }

  handleAddProject() {
    console.log(this.projectFormGroup.value)
    if (this.projectFormGroup.invalid) {
      this.snackBar.open(
        '!! Validation Failed !! Please Check Your Inputs !!',
        'OK'
      );
      return;
    }
    const {projectName,description}=this.projectFormGroup.value;
    const projectDto=new ProjectDto(projectName,description);
    this.projectService.createProject(projectDto).subscribe({
      next:(next)=>{
        this.snackBar.open('!! Project Successfully Added !!','OK');
        this.handleReset()
        this.fetchAllProjects();
      },error:(error)=>{
        this.snackBar.open('!! Something Went Wrong While Adding New Project !!','OK');
      }
    })

  }

  handleReset() {
    this.projectFormGroup.reset(this.initialFormValues);
  }

  //This getter method will help you to access specific controls in the template file
  get controls() {
    return this.projectFormGroup.controls;
  }
}
