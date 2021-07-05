import { BasePageComponent } from '../../../base-page/base-page.component';
import { IAppState } from './../../../../interfaces/app-state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConsultationService } from '../consultation.service';
import { Consultation } from '../consultation';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-consultation-list',
  templateUrl: './consultation-list.component.html',
  styleUrls: ['./consultation-list.component.scss']
})
export class ConsultationListComponent extends BasePageComponent<Consultation> implements OnInit, OnDestroy {

  dates: any;

  constructor(store: Store<IAppState>,
    public consultationSrv: ConsultationService,
    public datePipe: DatePipe) {
    super(store, consultationSrv);

    this.pageData = {
      title: 'Liste des consultations',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des consultations'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.findAll();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostDelete() {
   this.findAll();
  }

  handlePostLoad() {
    this.dates = null;
  }

  filter() {
    var formattedDate = { startDate: null, endDate: null };
    formattedDate.startDate = this.datePipe.transform(this.dates[0], 'yyyy-MM-dd');
    formattedDate.endDate = this.datePipe.transform(this.dates[1], 'yyyy-MM-dd');
    this.consultationSrv.findByDate(formattedDate)
      .subscribe((data: any) => {
        this.items = data;
      }, err => this.consultationSrv.httpSrv.catchError(err));
  }
  findAll(){
    this.consultationSrv.findLastestConsultation()
    .subscribe((data: any) => {
      this.items = data;
      this.setLoaded();
    }, err => this.consultationSrv.httpSrv.catchError(err));
  }
 
}
