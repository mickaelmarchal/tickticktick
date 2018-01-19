import { Component, OnInit } from '@angular/core';
import { TimersService } from '../../core/services/timers.service';
import { Observable } from 'rxjs/Observable';
import { Timer } from '../../core/models/timer';

@Component({
  selector: 'app-timers-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public timers$: Observable<Timer[]>;

  constructor(private timersService: TimersService) {}

  ngOnInit() {
    this.timers$ = this.timersService.getAllTimers();
  }

  public onAddTimer() {
    console.log('addimter');
    this.timersService.addTimer({
      name: 'New Timer',
      color: '#000',
      running: false
    });
  }
}
