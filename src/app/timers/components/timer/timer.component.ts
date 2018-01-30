import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Timer } from '../../models/timer';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @Input() public timer: Observable<Timer>;
  @Output() remove = new EventEmitter<Timer>();

  constructor() {}

  ngOnInit() {}
}
