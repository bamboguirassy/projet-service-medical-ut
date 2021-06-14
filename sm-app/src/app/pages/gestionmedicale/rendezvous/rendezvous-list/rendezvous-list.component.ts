import { BasePageComponent } from '../../../base-page/base-page.component';
import { IAppState } from './../../../../interfaces/app-state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { RendezVousService } from '../rendezvous.service';
import { RendezVous } from '../rendezvous';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rendezvous-list',
  templateUrl: './rendezvous-list.component.html',
  styleUrls: ['./rendezvous-list.component.scss']
})
export class RendezVousListComponent extends BasePageComponent<RendezVous> implements OnInit, OnDestroy {

  dates: any;

  constructor(store: Store<IAppState>,
    public rendezVousSrv: RendezVousService,
    public datePipe: DatePipe) {
    super(store, rendezVousSrv);

    this.pageData = {
      title: 'liste des rendez-vous',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des rendez-vous'
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
    let formattedDate = { startDate: null, endDate: null };
    formattedDate.startDate = this.datePipe.transform(this.dates[0], 'yyyy-MM-dd');
    formattedDate.endDate = this.datePipe.transform(this.dates[1], 'yyyy-MM-dd');
    this.rendezVousSrv.findByDate(formattedDate)
      .subscribe((data: any) => {
        this.items = data;
      }, err => this.rendezVousSrv.httpSrv.catchError(err));
  }

}
