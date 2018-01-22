import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TimerEffects } from './effects/timer';
import { CollectionEffects } from './effects/collection';

import { TimersRoutingModule } from './timers-routing.module';
import { CollectionPageComponent } from './containers/collection/collection-page.component';

import { TimerComponent } from './components/timer/timer.component';
// import { TimersService } from './services/timers.service';

import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    TimersRoutingModule,
    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('timers', reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([TimerEffects, CollectionEffects])
  ],
  declarations: [CollectionPageComponent, TimerComponent],
  providers: [
    /*TimersService */
  ]
})
export class TimersModule {}
