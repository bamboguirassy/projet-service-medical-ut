import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImputationJournaliereComponent } from './imputation-journaliere.component';

describe('ImputationJournaliereComponent', () => {
  let component: ImputationJournaliereComponent;
  let fixture: ComponentFixture<ImputationJournaliereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImputationJournaliereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImputationJournaliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
