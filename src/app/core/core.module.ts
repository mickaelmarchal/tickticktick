import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimersService } from './services/timers.service';

@NgModule({
  imports: [CommonModule],
  declarations: []
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [TimersService]
    };
  }
}
