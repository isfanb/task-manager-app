import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule, MatDialogActions, MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog'
import { TaskModel } from '../../models/task';

@Component({
  selector: 'app-task-delete-dialog',
  imports: [MatDialogContent, MatDialogActions, MatDialogModule, MatButtonModule],
  templateUrl: './task-delete-dialog.html',
  styleUrl: './task-delete-dialog.css',
})
export class TaskDeleteDialog {
  data = inject<TaskModel>(MAT_DIALOG_DATA)
}
