import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Col } from './col/col';
import { TabsModule } from 'primeng/tabs';
import { Task } from './task/task';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { FormsModule } from "@angular/forms";
import { DatePickerModule } from 'primeng/datepicker';



// 1️⃣ TYPE TRƯỚC
type TaskModel = {
  Id?: string;
  Name: string;
  EstimatedTime: any;
  DateCreated: any;
  Status: any;
  Description: any;
};

type ColumnKey = 'todo' | 'doing' | 'test' | 'done';

type KanbanData = {
  todo: TaskModel[];
  doing: TaskModel[];
  test: TaskModel[];
  done: TaskModel[];
};

@Component({
  selector: 'app-kanban-board',
  imports: [Button, DragDropModule, CommonModule, Col, TabsModule, Task, InputText, FormsModule, DatePickerModule],
  templateUrl: './kanban-board.html',
  styleUrl: './kanban-board.css',
  encapsulation: ViewEncapsulation.None,
})
export class KanbanBoard {
@Input() searchInput : string = "";
  taskVisible = false;

  data: KanbanData = {
    todo: [],
    doing: [],
    test: [],
    done: []
  };

  emptyTask(): TaskModel {
    return {
      Name: '',
      EstimatedTime: null,
      DateCreated: null,
      Status: '',
      Description: ''
    };
  }

  selectedTask: TaskModel = this.emptyTask();

  isEdit = false;

  constructor(private router: Router) {
    this.getdata();
  }
  textHead : string = "";
  headAdd(){
    this.textHead = "Thêm Task";
  }
  visibleChange(visible: boolean) {
    this.taskVisible = visible;
  }

  // Search(){
    
  // }

  // filterDate: Date | null = null;
  // before = false;
  // applyDateFilter = false;
  
  // filterByDate(tasks: TaskModel[]): TaskModel[] {
  //   if (!this.applyDateFilter) return tasks;
  //   if (!this.filterDate) return tasks;

  //   const target = new Date(this.filterDate).setHours(0,0,0,0);

  //   const result: TaskModel[] = [];

  //   for (let i = 0; i < tasks.length; i++) {
  //     if (!tasks[i].EstimatedTime) continue;

  //     const taskDate = new Date(tasks[i].EstimatedTime).setHours(0,0,0,0);

  //     if (this.before) {
  //       if (taskDate <= target) result.push(tasks[i]);
  //     } else {
  //       if (taskDate >= target) result.push(tasks[i]);
  //     }
  //   }

  //   return result;
  // }


  filterTasks(col: ColumnKey): TaskModel[] {
    let tasks = this.data[col];
    console.log("abc")
    if (this.searchInput.trim()) {
      const keyword = this.searchInput.toLowerCase();
      const result: TaskModel[] = [];
      for (let i = 0; i < tasks.length; i++) {
        const nameLower = tasks[i].Name.toLowerCase();
        if (
          nameLower.includes(keyword)
        ) {
          result.push(tasks[i]);
        }
      }
      tasks = result.sort((a:TaskModel, b:TaskModel) => a.Name.localeCompare(b.Name));
      // tasks = result;
    }
    // tasks = this.filterByDate(tasks);
    return tasks;
  }


  opentask(id: string) {
    this.textHead = "Thông tin chi tiết Task";
    const task = this.findTaskById(id);
    if (!task) return;

    this.selectedTask = { ...task,
      DateCreated: task.DateCreated ? new Date(task.DateCreated) : null,
      EstimatedTime: task.EstimatedTime ? new Date(task.EstimatedTime) : null
    };
    this.isEdit = true;
    this.taskVisible = true;
  }

  findTaskById(id: string): TaskModel | null {
    const columns: ColumnKey[] = ['todo', 'doing', 'test', 'done'];

    for (const col of columns) {
      const found = this.data[col].find(t => t.Id === id);
      if (found) return found;
    }
    return null;
  }

  showaddDialog() {
    this.selectedTask = this.emptyTask();
    this.isEdit = false;
    this.taskVisible = true;
  }

  getdata() {
    const raw = localStorage.getItem('kanban');
    if (raw) {
      this.data = JSON.parse(raw);
    }
  }

  onTaskSaved() {
    this.getdata();
  }

  logout() {
    localStorage.setItem('token', '');
    this.router.navigate(['/login']);
  }
}