import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DndModule],
  declarations: [],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, DndModule]
})
export class SharedModule {}
