import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Timer } from '../../models/timer';
import { Store } from '@ngrx/store';

import * as fromTimers from '../../reducers';
import * as collection from '../../actions/collection';

@Component({
  selector: 'app-timers-collection',
  templateUrl: './collection-page.component.html',
  styleUrls: ['./collection-page.component.scss']
})
export class CollectionPageComponent implements OnInit {
  timers$: Observable<Timer[]>;

  constructor(private store: Store<fromTimers.State>) {
    this.timers$ = store.select(fromTimers.getTimerCollection);
  }

  ngOnInit() {
    this.store.dispatch(new collection.Load());
  }

  public onAddTimer() {
    console.log('addTimer');
    const id = Math.round(Math.random() * 1000).toString();
    this.store.dispatch(
      new collection.AddTimer({
        id: 'timer' + id,
        name: 'Timer ' + id,
        color: '#f00',
        running: false
      })
    );
  }
}
