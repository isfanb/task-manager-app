import { computed, Injectable, signal } from '@angular/core';
import { listCategoryModel, TaskModel } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  filter = signal<string>('All');

  listCategoryService = signal<listCategoryModel[]>([
    {
      id: 1,
      name: 'On Progress'
    },
    {
      id: 2,
      name: 'Done'
    }
  ])

  listTaskItem = signal<TaskModel[]>([
    {
      id: 1,
      title: 'Task One',
      description: 'lorem ipsum dolor sit amet',
      completed: false
    },
    {
      id: 2,
      title: 'Task Two',
      description: 'lorem ipsum dolor sit amet',
      completed: false
    },
    {
      id: 3,
      title: 'Task Three',
      description: 'lorem ipsum dolor sit amet',
      completed: false
    },
  ])

  filteredTasks = computed<TaskModel[]>(() => {
    const tasks = this.listTaskItem()
    const currentFilter = this.filter()

    if(currentFilter == 'All') return tasks
    return tasks.filter(e => e.completed == (currentFilter == 'Done' ? true : false))
  })

  updateTaskCategory(taskId: number, newCategory: string){
    this.listTaskItem.update(tasks =>
      tasks.map(e => e.id == taskId ? {...e, completed: newCategory == 'Done' ? true : false} : e )
    )
  }

  addTask(title: string, description: string, completed: boolean) {
    return this.listTaskItem.update(tasks => {
      const nextId = tasks.length > 0 ? Math.max(...tasks.map(e => e.id)) + 1 : 1
      return [
        ...tasks, {
        id: nextId,
        title: title,
        description: description,
        completed: completed
      }]
    })
  }

  deleteTask(id: number) {
    return this.listTaskItem.update(tasks => tasks.filter(t => t.id != id))
  }

}
