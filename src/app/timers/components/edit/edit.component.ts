import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Timer } from '../../models/timer';
import { Store } from '@ngrx/store';

import * as fromTimers from '../../reducers';
import * as timer from '../../actions/timer';
import { ActivatedRoute } from '@angular/router/src/router_state';

@Component({
  selector: 'app-timers-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  timerForm: FormGroup;

  timer$: Observable<Timer>;

  constructor(private fb: FormBuilder, private store: Store<fromTimers.State>) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.timerForm = this.fb.group({
      name: ['', Validators.required],
      color: ['', Validators.required]
    });
  }
}
