import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromTimers from '../../reducers';
import * as timer from '../../actions/timer';

/**
 * Note: Container components are also reusable. Whether or not
 * a component is a presentation component or a container
 * component is an implementation detail.
 *
 * The View Book Page's responsibility is to map router params
 * to a 'Select' book action. Actually showing the selected
 * book remains a responsibility of the
 * SelectedBookPageComponent
 */
@Component({
  selector: 'app-timers-edit-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<fromTimers.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .map(params => new timer.Select(params.id || null))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
