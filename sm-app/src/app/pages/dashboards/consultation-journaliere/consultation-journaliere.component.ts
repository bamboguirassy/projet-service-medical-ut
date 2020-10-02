import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { BasePageComponent } from '../../base-page';
import { ConsultationService } from '../../gestionmedicale/consultation/consultation.service';

@Component({
  selector: 'app-consultation-journaliere',
  templateUrl: './consultation-journaliere.component.html',
  styleUrls: ['./consultation-journaliere.component.scss']
})
export class ConsultationJournaliereComponent extends BasePageComponent<any> implements OnInit, OnDestroy {

  data: any;
  selectedAnnee: number;

  constructor(
    store: Store<IAppState>,
    public consultationSrv: ConsultationService
  ) {
    super(store, consultationSrv);

    this.pageData = {
      title: 'Statistique Consultation Journalière',
      loaded: true,
      breadcrumbs: [
        {
          title: 'Statistique',
          route: 'default-dashboard'
        },
        {
          title: 'Statistique Consultation Journalière'
        }
      ]
    };
    this.selectedAnnee = new Date().getFullYear();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getData();
  }

  getData() {
    this.consultationSrv.getDaylyStatistic(this.selectedAnnee)
      .subscribe((data: any) => {
        this.data = data;
      }, err => this.consultationSrv.httpSrv.catchError(err));
  }

  handlePostLoad() { }

}
