import { Component, inject, signal } from '@angular/core';
import { TaskService } from '../../services/task';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { MatDialog } from '@angular/material/dialog'
import { MatSelect, MatOption } from '@angular/material/select'
import { MatCard, MatCardModule } from '@angular/material/card'
import { TaskItem } from '../task-item/task-item';
import { TaskDialog } from '../task-dialog/task-dialog';

@Component({
  selector: 'app-task-list',
  imports: [
    CommonModule,
    ScrollingModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatCard,
    TaskItem,
    MatSelect,
    MatOption
],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})

export class TaskList {
  taskTitle = signal('Task Manager')

  taskStore = inject(TaskService)
  dialog = inject(MatDialog)

  openDialog(){
    this.dialog.open(TaskDialog, {
      width: '25%'
    })
  }

  deleteItem(e: number) {
    this.taskStore.deleteTask(e)
  }

}
