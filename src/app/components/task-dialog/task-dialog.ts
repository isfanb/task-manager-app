import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { form, required, Field } from '@angular/forms/signals';
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatDialog, MatDialogActions, MatDialogRef, MatDialogContent } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from "@angular/material/card";
import { TaskService } from '../../services/task';
@Component({
  selector: 'app-task-dialog',
  imports: [
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormField,
    MatLabel,
    MatDialogContent,
    MatDialogActions,
    MatCardModule,
    Field
],
  templateUrl: './task-dialog.html',
  styleUrl: './task-dialog.css',
})
export class TaskDialog {
  dialog = inject(MatDialogRef<MatDialog>)
  taskStore = inject(TaskService)

  newTaskModel = signal({
    name: '',
    desc: '',
    complete: false
  })

  taskModelForm = form(this.newTaskModel, (schema) => {
    required(schema.name, {message: 'Task is required'})
    required(schema.desc, {message: 'Description is required'})
  })

  closeDialog() {
    this.dialog.close()
  }

  saveDialog(){
    this.taskStore.addTask(
      this.newTaskModel().name,
      this.newTaskModel().desc,
      this.newTaskModel().complete
    )
    this.dialog.close(true)
  }

}
