import { Component, inject, input, output, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatSelect, MatOption } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatTooltipModule } from '@angular/material/tooltip'
import { TaskModel } from '../../models/task';
import { TaskService } from '../../services/task';
import { TaskDeleteDialog } from '../task-delete-dialog/task-delete-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task-item',
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatIconModule,
    MatFormField,
    MatSelect,
    MatLabel,
    MatOption
],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {

  task = input.required<TaskModel>()
  remove = output<number>()
  taskStore = inject(TaskService)
  taskListService = this.taskStore.listTaskItem
  dialog = inject(MatDialog)
  isValue = signal<string>('Open')

  onCategoryChange(e: string) {
    this.taskStore.updateTaskCategory(this.task().id, e)
  }

  openDialog(e: number) {
    const findData = this.taskListService().find(t => t.id === e)

    if(findData){
      const dialogRef = this.dialog.open(TaskDeleteDialog, {
        data: findData,
        width: '25%'
      })
      dialogRef.afterClosed().subscribe(result => {
        if(result === true){
          this.remove.emit(findData.id)
        }
      })
    }
  }

}
