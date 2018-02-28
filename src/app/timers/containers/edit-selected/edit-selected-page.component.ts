import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Timer } from '../../models/timer';
import { Store } from '@ngrx/store';

import * as fromTimers from '../../reducers';
import * as timer from '../../actions/timer';

@Component({
  selector: 'app-timers-edit-selected-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-selected-page.component.html',
  styleUrls: ['./edit-selected-page.component.scss']
})
export class EditSelectedPageComponent {
  timer$: Observable<Timer>;

  constructor(private store: Store<fromTimers.State>) {
    this.timer$ = store.select(fromTimers.getSelectedTimer);
  }

  updateTimer(timerToUpdate: Timer | null) {
    if (timerToUpdate.id) {
      this.store.dispatch(
        new timer.Update({ id: timerToUpdate.id, changes: timerToUpdate })
      );
    } else {
      // TODO generate id in a better way
      timerToUpdate.id = Math.round(Math.random() * 1000).toString();
      timerToUpdate.running = false;
      this.store.dispatch(new timer.Add(timerToUpdate));
    }
  }
}
