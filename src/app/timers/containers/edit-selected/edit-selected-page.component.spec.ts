import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSelectedPageComponent } from './edit-selected-page.component';

describe('TimerComponent', () => {
  let component: EditSelectedPageComponent;
  let fixture: ComponentFixture<EditSelectedPageComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [EditSelectedPageComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSelectedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
