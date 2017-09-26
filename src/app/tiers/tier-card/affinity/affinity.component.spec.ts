import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffinityComponent } from './affinity.component';

describe('AffinityComponent', () => {
  let component: AffinityComponent;
  let fixture: ComponentFixture<AffinityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffinityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffinityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
