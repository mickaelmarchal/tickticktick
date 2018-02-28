import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Timer } from '../../models/timer';
import { Store } from '@ngrx/store';

import * as fromTimers from '../../reducers';
import * as timer from '../../actions/timer';
import { ActivatedRoute } from '@angular/router/src/router_state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timers-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  /**
   * Presentational components receieve data through @Input() and communicate events
   * through @Output() but generally maintain no internal state of their
   * own. All decisions are delegated to 'container', or 'smart'
   * components before data updates flow back down.
   *
   * More on 'smart' and 'presentational' components: https://gist.github.com/btroncone/a6e4347326749f938510#utilizing-container-components
   */
  @Input() timer: Timer | null;

  @Output() update = new EventEmitter<Timer>();

  timerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    this.timerForm.patchValue(this.timer || {});
  }

  createForm() {
    this.timerForm = this.fb.group({
      name: ['', Validators.required],
      color: ['', Validators.required]
    });
  }

  onSubmit() {
    const formValue = this.timerForm.value;
    if (this.timer) {
      formValue.id = this.timer.id;
    }
    this.update.emit(formValue);
  }

  onCancel() {
    this.router.navigate(['/timers']);
  }
}
