import { Component, EventEmitter, Output, Type } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { Input } from '@angular/core';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SelectModule } from 'primeng/select';
import { KanbanBoard } from '../kanban-board';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

type TaskModel =  {
  Id? : string;
  Name : string;
  EstimatedTime : any;
  DateCreated : any;
  Status : any;
  Description : any;
}
const status = {
  value : 0,
  label : "chua lam"
}

@Component({
  selector: 'app-task',
  imports: [Dialog, Button,CommonModule, DatePickerModule,FormsModule,
     InputText, TextareaModule, AutoCompleteModule,SelectModule,ConfirmDialogModule],
  templateUrl: './task.html',
  styleUrl: './task.css',
  providers: [ConfirmationService]
})
export class Task {
  constructor(private kanbanboard: KanbanBoard,
    private confirmationService: ConfirmationService
  ){}
  items = ["To do", "Doing","Test", "Done"];
  selectedItem: any = null;
@Input() textHead : string = "";
@Output() saved = new EventEmitter<void>();
@Input() visible = false;
@Output() visiblechange = new EventEmitter();
@Input() isEdit = false;

@Input() data: TaskModel = {
  Name : "",
  EstimatedTime : "",
  DateCreated : "",
  Status : "",
  Description : ""
};
generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};
  reset(){
    this.data.Name = "";
    this.data.EstimatedTime = null;
    this.data.DateCreated = null;
    this.data.Status = "";
    this.data.Description = "";
  }
  ngOnInit() {
    // localStorage.removeItem('kanban');
    if (!localStorage.getItem('kanban')) {
      localStorage.setItem('kanban',JSON.stringify({todo: [],doing: [],test: [],done: []}));
    }
  }

  ngOnChanges() {
  if (!this.data) {
    this.data = {
      Name: "",
      EstimatedTime: null,
      DateCreated: null,
      Status: "",
      Description: ""
    };
  }
}
  
  showDialog(){
    this.reset();
    this.visible = true;
  }
  destroyTask(){
    this.warAdd = "";
    this.visible = false;
    this.visiblechange.emit(this.visible);
  }
  warAdd = "";
  addTask(){
    // TODO: lay ra data kanban trong localstorage
    // TODO: map data vua lay vao this.kanban
    // TODO: add this.data vua tao vao mang trong this.kanban
    // TODO: luu lai this.kanban vao localstorage
    const storage = JSON.parse(localStorage.getItem('kanban')!);

    if(!this.data.Name || !this.data.EstimatedTime || !this.data.DateCreated || 
      !this.data.Status || !this.data.Description){
        this.warAdd = "Vui lòng nhập đủ thông tin!";
        return;
    }else this.warAdd = "";
    
    const add = {...this.data, Id: this.generateId()};
    console.log(this.data);
    if(this.data.Status === "To do") storage.todo.push(add);
    if(this.data.Status === "Doing") storage.doing.push(add);
    if(this.data.Status === "Test") storage.test.push(add);
    if(this.data.Status === "Done") storage.done.push(add);

    localStorage.setItem("kanban", JSON.stringify(storage));
    this.saved.emit();
    this.destroyTask();
  }

  updateTask(){
    const storage = JSON.parse(localStorage.getItem('kanban')!);
    const columns = ['todo', 'doing', 'test', 'done'];

    if(!this.data.Name || !this.data.EstimatedTime || !this.data.DateCreated || 
      !this.data.Status || !this.data.Description){
        this.warAdd = "Vui lòng nhập đủ thông tin!";
        return;
    }else this.warAdd = "";

  for (const col of columns) {
    const index = storage[col].findIndex(
      (t: any) => t.Id === this.data.Id
    );
    if (index !== -1) {
      const oldTask = storage[col][index];
      if (oldTask.Status !== this.data.Status) {
        storage[col].splice(index, 1);
        storage[this.data.Status.toLowerCase().replace(' ', '')].push({ ...this.data });

      } else {
        storage[col][index] = { ...this.data };
      }
      break;
    }
  }

  localStorage.setItem('kanban', JSON.stringify(storage));
  this.saved.emit();
  this.destroyTask();
  }

  deleteTask(){
    const storage = JSON.parse(localStorage.getItem("kanban")!);
    const columns = ["todo","doing","test","done"];
    for(const col of columns){
      const index = storage[col].findIndex((t : any) => t.Id === this.data.Id)
      if(index !== -1){
        storage[col].splice(index, 1);
        break;
      }
    }

    localStorage.setItem('kanban', JSON.stringify(storage));
    this.saved.emit();
    this.destroyTask();
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Bạn có chắc muốn xóa task này không?',
      header: 'Xác nhận xóa',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      
      acceptButtonProps: {
          label: 'Delete',
          severity: 'danger',
      },

      accept: () => {
        this.deleteTask();
      }
    });
  }

}


