import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskDto } from '../../dtos/TaskDto';
import { BusinessOperationsService } from '../../services/businessoperations.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-manage-task',
  standalone: true,
  imports: [ReactiveFormsModule,DatePipe],
  templateUrl: './admin-manage-task.component.html',
  styleUrl: './admin-manage-task.component.css',
})
export class AdminManageTaskComponent {
  private snackBar = inject(MatSnackBar);

  @Input({required:true}) 
  projectDisplayId:string="";

  @Input({required:true})
  allTasksList?:TaskDto[];

  @Output() 
  addTaskEventEmiter:EventEmitter<boolean>=new EventEmitter();


  taskFormGroup: FormGroup;

  private initialFormValues = {
    taskName: '',
    taskDescription: '',
    taskStatus: '',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
  };

  constructor(
    private businessOperationsService:BusinessOperationsService,
    private formBuilder: FormBuilder
  ) {
    console.log("Inside Constructor Of AdminManageTaskComponent.")
    this.taskFormGroup = this.formBuilder.group({
      taskName: new FormControl(this.initialFormValues.taskName, [
        Validators.required,
        Validators.minLength(5),
      ]),
      taskDescription: new FormControl(this.initialFormValues.taskDescription, [
        Validators.required,
        Validators.minLength(5),
      ]),
      dueDate: new FormControl(this.initialFormValues.dueDate, [
        Validators.required,
      ]),
    });
  }

  ngOnInit(): void {
    console.log("Inside ngOnInit Of AdminManageTaskComponent.")
  }

  handleAddTaskToProject() {
    console.log(this.taskFormGroup.value);
    if (this.taskFormGroup.invalid) {
      this.snackBar.open('!! Validation Failed !! Please Check Your Inputs !!','OK');
      return;
    }
    const { taskName, taskDescription , dueDate} = this.taskFormGroup.value;
    const taskDto = new TaskDto(taskName,taskDescription,dueDate);
    this.businessOperationsService.addTaskToProjectByProjectDisplayId(taskDto,this.projectDisplayId).subscribe({
      next:(next)=>{
        this.snackBar.open('!! Task Successfully Added !!','OK');
        this.addTaskEventEmiter.emit(true);
        this.handleReset()
      },error:(error)=>{
        console.log(error)
      }
    })
  }

  handleReset() {
    this.taskFormGroup.reset(this.initialFormValues);
  }

  //This getter method will help you to access specific controls in the template file
  get controls() {
    return this.taskFormGroup.controls;
  }
}
