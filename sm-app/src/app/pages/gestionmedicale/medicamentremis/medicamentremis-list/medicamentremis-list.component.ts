import { BasePageComponent } from '../../../base-page/base-page.component';
import { IAppState } from './../../../../interfaces/app-state';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { MedicamentRemisService } from '../medicamentremis.service';
import { MedicamentRemis } from '../medicamentremis';
import { Consultation } from '../../consultation/consultation';

@Component({
  selector: 'app-medicamentremis-list',
  templateUrl: './medicamentremis-list.component.html',
  styleUrls: ['./medicamentremis-list.component.scss']
})
export class MedicamentRemisListComponent extends BasePageComponent<MedicamentRemis> implements OnInit, OnDestroy {

  @Input() consultation: Consultation;

  constructor(store: Store<IAppState>,
    public medicamentRemiSrv: MedicamentRemisService) {
    super(store, medicamentRemiSrv);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostDelete() {
    this.findMedicamentPrescrits();
  }

  handlePostLoad() { }

  onCreate() {
    this.findMedicamentPrescrits();
  }

  findMedicamentPrescrits() {
    this.medicamentRemiSrv.findByConsultation(this.consultation)
      .subscribe((data: any) => {
        this.consultation.medicamentRemis = data;
      }, err => this.medicamentRemiSrv.httpSrv.catchError(err));
  }

}
