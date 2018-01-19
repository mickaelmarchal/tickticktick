import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimersRoutingModule } from './timers-routing.module';
import { ListComponent } from './list/list.component';
import { TimerComponent } from './timer/timer.component';

@NgModule({
  imports: [CommonModule, TimersRoutingModule],
  declarations: [ListComponent, TimerComponent]
})
export class TimersModule {}
