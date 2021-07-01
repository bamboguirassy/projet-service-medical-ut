import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImputationMensuelleComponent } from './imputation-mensuelle.component';

describe('ImputationMensuelleComponent', () => {
  let component: ImputationMensuelleComponent;
  let fixture: ComponentFixture<ImputationMensuelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImputationMensuelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImputationMensuelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
