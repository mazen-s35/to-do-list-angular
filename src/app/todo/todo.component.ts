import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ITask } from '../modle/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  tasks: ITask[] = [];
  inProgress: ITask[] = [];
  done: ITask[] = [];
  i!: number;
  updateIdIndex!: any;
  isEditEnable: boolean = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required],
    });
  }

  addTask() {
    this.tasks.push({
      des: this.todoForm.value.item,
      done: false,
    });
    this.todoForm.reset();
  }

  onEdit(item: ITask, i: number) {
    this.todoForm.controls['item'].setValue(item.des);
    this.updateIdIndex = i;
    this.isEditEnable = true;
  }

  updateTask() {
    this.tasks[this.updateIdIndex].des = this.todoForm.value.item;
    this.tasks[this.updateIdIndex].done = false;
    this.todoForm.reset();
    this.updateIdIndex = undefined;
    this.isEditEnable = false;
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }

  deleteInProgressTask(i: number) {
    this.inProgress.splice(i, 1);
  }

  deleteDoneTask(i: number) {
    this.done.splice(i, 1);
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
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
