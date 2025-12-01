import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kanban-board',
  imports:[DragDropModule,CommonModule],
  templateUrl: './kanban-board.html',
  styleUrl: './kanban-board.css',
  encapsulation: ViewEncapsulation.None,
})

export class KanbanBoard {
  constructor(private router: Router){}
  logout(){
    this.router.navigate(['/login']);
  }
  ngOnInit(){
    this.kanban();
  }
  todo: any[] = [];
  doing: any[] = [];
  test: any[] = [];
  done: any[] = [];
  kanbandata: any[] = [];
  async kanban(){
    try {
          let response = await fetch("http://192.168.18.87:8066/api/KanBanBroad/KanbanBoard?sprintId=10121",{
              method: "GET",
              headers:{
                  "Content-Type": "application/json",
              }
          });
          let data = await response.json();
          console.log(data);
          // let table1 = '';
          // let table2 = '';
          // let table3 = '';
          // let table4 = '';
        //   if(response.ok) return;
          if(data.data.length === 0) return alert("khong co du lieu");
          this.kanbandata = data.data;
          this.todo  = this.kanbandata.find(x => x.status === 1)?.tasks || [];
          this.doing = this.kanbandata.find(x => x.status === 2)?.tasks || [];
          this.test  = this.kanbandata.find(x => x.status === 3)?.tasks || [];
          this.done  = this.kanbandata.find(x => x.status === 4)?.tasks || [];
        //   if(response.ok){
        //       if(data.data.length === 0) return alert("khong co du lieu");
        //       for(let j = 0; j < data.data.length; j++){
                
        //           if(data.data[j].status == 1){
        //               for (let i = 0; i < data.data[j].tasks.length; i++){
        //           table1 += `<div class="alert alert-info" id = "${data.data[j].tasks[i].id}" draggable="true" ondragstart="dragstartHandler(event)"><strong>${data.data[j].tasks[i].assigneeName}</strong> 
        //               <p>${data.data[j].tasks[i].name}</p></div>`;
        //               }
        //               document.getElementById("todo")!.innerHTML = table1;
        //           }
                  
        //           if(data.data[j].status == 2){
        //               for (let i = 0; i < data.data[j].tasks.length; i++){
        //           table2 += `<div class="alert alert-warning" id = "${data.data[j].tasks[i].id}"  draggable="true" ondragstart="dragstartHandler(event)"><strong>${data.data[j].tasks[i].assigneeName}</strong> 
        //               <p>${data.data[j].tasks[i].name}</p></div>`;
        //               }
        //               document.getElementById("doing")!.innerHTML = table2;
        //           }
                  
        //           if(data.data[j].status == 3){
        //               for (let i = 0; i < data.data[j].tasks.length; i++){
        //           table3 += `<div class="alert alert-primary" id = "${data.data[j].tasks[i].id}"  draggable="true" ondragstart="dragstartHandler(event)"><strong>${data.data[j].tasks[i].assigneeName}</strong> 
        //               <p>${data.data[j].tasks[i].name}</p></div>`;
        //               }
        //               document.getElementById("test")!.innerHTML = table3;
        //           }
                  
        //           if(data.data[j].status == 4){
        //               for (let i = 0; i < data.data[j].tasks.length; i++){
        //           table4 += `<div class="alert alert-primary" id = "${data.data[j].tasks[i].id}"  draggable="true" ondragstart="dragstartHandler(event)"><strong>${data.data[j].tasks[i].assigneeName}</strong> 
        //               <p>${data.data[j].tasks[i].name}</p></div>`;
        //               }
        //               document.getElementById("done")!.innerHTML = table4;
        //           }
                  
        //       }
        //       this.dem();
        //   }else{
        //       alert("ket noi that bai");
        //   }
      } catch (error) {
          alert("loi ket noi" + error);
      }
  }
  dem(){
      let divtodo = document.getElementById("todo")!;
      document.getElementById("todototal")!.innerHTML = `<span>(${divtodo.children.length})</span>`;

      let divdoing = document.getElementById("doing")!;
      document.getElementById("doingtotal")!.innerHTML = `<span>(${divdoing.children.length})</span>`;

      let divtest = document.getElementById("test")!;
      document.getElementById("testtotal")!.innerHTML = `<span>(${divtest.children.length})</span>`;

      let divdone = document.getElementById("done")!;
      document.getElementById("donetotal")!.innerHTML = `<span>(${divdone.children.length})</span>`;
  }
  drop(event: CdkDragDrop<string[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
//   drop(event: CdkDragDrop<any[]>) {

//     // cùng 1 cột -> rearrange
//     if (event.previousContainer === event.container) {
//       moveItemInArray(
//         event.container.data,
//         event.previousIndex,
//         event.currentIndex
//       );
//     } 
//     // khác cột -> chuyển task
//     else {
//       transferArrayItem(
//         event.previousContainer.data,
//         event.container.data,
//         event.previousIndex,
//         event.currentIndex
//       );
//     }
//   }
}
