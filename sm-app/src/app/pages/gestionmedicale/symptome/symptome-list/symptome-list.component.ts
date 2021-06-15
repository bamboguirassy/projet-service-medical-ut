import { Symptome } from './../symptome';
import { BasePageComponent } from '../../../base-page/base-page.component';
import { IAppState } from './../../../../interfaces/app-state';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { SymptomeService } from '../symptome.service';
import { Consultation } from '../../consultation/consultation';

@Component({
  selector: 'app-symptome-list',
  templateUrl: './symptome-list.component.html',
  styleUrls: ['./symptome-list.component.scss']
})
export class SymptomeListComponent extends BasePageComponent<Symptome> implements OnInit, OnDestroy {

  secondGradient = ['#fff', '#F5F6F1'];
  @Input() consultation: Consultation;

  constructor(store: Store<IAppState>,
    public symptomeSrv: SymptomeService) {
    super(store, symptomeSrv);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostDelete() {
    this.findByConsultation(this.consultation);
  }

  handlePostLoad() { }

  findByConsultation(consultation: Consultation) {
    this.symptomeSrv.findByConsultation(consultation)
      .subscribe((data: any) => {
        this.consultation.symptomes = data;
      }, err => this.symptomeSrv.httpSrv.catchError(err));
  }



  onCreate(item: Symptome) {
    this.findByConsultation(this.consultation);
  }

}
