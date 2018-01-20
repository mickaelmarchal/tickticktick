import { Component, OnInit } from '@angular/core';
import { TimersService } from '../../services/timers.service';
import { Observable } from 'rxjs/Observable';
import { Timer } from '../../models/timer';

@Component({
  selector: 'app-timers-list',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListComponent implements OnInit {
  public timers$: Observable<Timer[]>;

  constructor(private timersService: TimersService) {}

  ngOnInit() {
    this.timers$ = this.timersService.getAllTimers();
  }

  public onAddTimer() {
    console.log('addTimer');
    this.timersService.addTimer({
      name: 'New Timer',
      color: '#000',
      running: false
    });
  }
}
