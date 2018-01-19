import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Timer } from '../models/timer';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class TimersService {
  private initialTimers: Timer[] = [
    {
      name: 'Timer 1',
      color: '#fc0',
      running: false
    },
    {
      name: 'Timer 2',
      color: '#cf',
      running: false
    }
  ];

  private timers$: BehaviorSubject<Timer[]>;

  constructor() {
    this.timers$ = new BehaviorSubject<Timer[]>(this.initialTimers);
  }

  /**
   * Get all timers
   */
  public getAllTimers(): Subject<Timer[]> {
    return this.timers$;
  }

  public addTimer(timer: Timer) {
    const value = this.timers$.getValue();
    value.push(timer);
    this.timers$.next(value);
  }
}
