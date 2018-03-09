import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Timer } from '../../models/timer';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/take';

import * as fromTimers from '../../reducers';
import * as timer from '../../actions/timer';

@Component({
  selector: 'app-timers-list',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  timers$: Observable<Timer[]>;

  constructor(private store: Store<fromTimers.State>) {
    this.timers$ = store.select(fromTimers.getAllTimers);
  }

  ngOnInit() {
    this.store.dispatch(new timer.Load());
  }

  removeTimer(timerToRemove: Timer) {
    console.log('Remove timer ' + timerToRemove.id);
    this.store.dispatch(new timer.Remove(timerToRemove));
  }

  testDrop(timerMoved: Timer, newPosition: number) {
    this.timers$.take(1).subscribe(timers => {
      const oldPosition = timerMoved.order;
      const entitiesToUpdate = [];

      timers.forEach(orgTimer => {
        const entity = Object.assign({}, orgTimer);

        if (entity.id === timerMoved.id) {
          entity.order = newPosition;
          entitiesToUpdate.push({
            id: entity.id,
            changes: entity
          });
        } else if (
          entity.order >= Math.min(oldPosition, newPosition) &&
          entity.order <= Math.max(oldPosition, newPosition)
        ) {
          // this entity is after the one we are moving
          if (oldPosition < newPosition) {
            entity.order--;
          } else {
            entity.order++;
          }
          entitiesToUpdate.push({
            id: entity.id,
            changes: entity
          });
        }
      });

      this.store.dispatch(
        new timer.UpdateMulti({
          changes: entitiesToUpdate
        })
      );
    });
  }
}
