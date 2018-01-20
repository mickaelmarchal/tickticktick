import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimersRoutingModule } from './timers-routing.module';
import { ListComponent } from './containers/list-page/list-page.component';
import { TimerComponent } from './components/timer/timer.component';
import { TimersService } from './services/timers.service';

@NgModule({
  imports: [CommonModule, TimersRoutingModule],
  declarations: [ListComponent, TimerComponent],
  providers: [TimersService]
})
export class TimersModule {}
