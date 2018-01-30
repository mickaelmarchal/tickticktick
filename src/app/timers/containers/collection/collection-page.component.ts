import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Timer } from '../../models/timer';
import { Store } from '@ngrx/store';

import * as fromTimers from '../../reducers';
import * as timer from '../../actions/timer';

@Component({
  selector: 'app-timers-collection',
  templateUrl: './collection-page.component.html',
  styleUrls: ['./collection-page.component.scss']
})
export class CollectionPageComponent implements OnInit {
  timers$: Observable<Timer[]>;

  constructor(private store: Store<fromTimers.State>) {
    this.timers$ = store.select(fromTimers.getAllTimers);
  }

  ngOnInit() {
    this.store.dispatch(new timer.Load());
  }

  public onAddTimer() {
    console.log('addTimer');
    const id = Math.round(Math.random() * 1000).toString();
    this.store.dispatch(
      new timer.Add({
        id: 'timer' + id,
        name: 'Timer ' + id,
        color: '#f00',
        running: false
      })
    );
  }

  removeTimer(timerToRemove: Timer) {
    console.log('Remove timer ' + timerToRemove.id);
    this.store.dispatch(new timer.Remove(timerToRemove));
  }
}
