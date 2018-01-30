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

  updateTimer(timerToUpdate: Timer) {
    this.store.dispatch(
      new timer.Update({ id: timerToUpdate.id, changes: timerToUpdate })
    );
  }
}
