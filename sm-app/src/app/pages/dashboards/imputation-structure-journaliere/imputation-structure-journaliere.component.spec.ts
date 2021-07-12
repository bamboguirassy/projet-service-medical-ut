import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImputationStructureJournaliereComponent } from './imputation-structure-journaliere.component';

describe('ImputationStructureJournaliereComponent', () => {
  let component: ImputationStructureJournaliereComponent;
  let fixture: ComponentFixture<ImputationStructureJournaliereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImputationStructureJournaliereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImputationStructureJournaliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
