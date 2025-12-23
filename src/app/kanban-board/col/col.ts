import { Component, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-columns-contains-task',
  imports: [CommonModule,DragDropModule],
  templateUrl: './col.html',
  styleUrl: './col.css',
})
export class Col {
  @Output() dataChange = new EventEmitter();
  @Input() arr: any[] = [];
  @Input() bgColor: string = "";
  @Input() name: string = "";
  @Input() borderRight: string = "";
  @Input() tcolor: string = "";
  @Input() cdkDropListData: any[] = [];
  @Input() cdkDropListConnectedTo: string[] = [];
  @Input() idcol: string = "";
  opentask(id: string){
    this.dataChange.emit(id);
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
}
