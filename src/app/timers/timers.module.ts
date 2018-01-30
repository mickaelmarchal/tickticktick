import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';

import { CollectionPageComponent } from './containers/collection/collection-page.component';
import { EditPageComponent } from './containers/edit/edit-page.component';
import { TimerComponent } from './components/timer/timer.component';
import { EditComponent } from './components/edit/edit.component';
import { TimersRoutingModule } from './timers-routing.module';
import { TimerEffects } from './effects/timer';
import { CollectionEffects } from './effects/collection';
import { reducers } from './reducers';

@NgModule({
  imports: [
    SharedModule,
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
  declarations: [
    CollectionPageComponent,
    EditPageComponent,
    TimerComponent,
    EditComponent
  ],
  providers: []
})
export class TimersModule {}
