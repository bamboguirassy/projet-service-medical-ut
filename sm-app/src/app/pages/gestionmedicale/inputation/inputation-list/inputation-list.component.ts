import { DatePipe } from '@angular/common';
import { BasePageComponent } from '../../../base-page/base-page.component';
import { IAppState } from './../../../../interfaces/app-state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { InputationService } from '../inputation.service';
import { Inputation } from '../inputation';

@Component({
  selector: 'app-inputation-list',
  templateUrl: './inputation-list.component.html',
  styleUrls: ['./inputation-list.component.scss']
})
export class InputationListComponent extends BasePageComponent<Inputation> implements OnInit, OnDestroy {

  dates: any;

  constructor(store: Store<IAppState>,
    public inputationSrv: InputationService,
    public datePipe: DatePipe) {
    super(store, inputationSrv);

    this.pageData = {
      title: 'Liste des imputations',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des imputations'
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
    this.inputationSrv.findByDate(formattedDate)
      .subscribe((data: any) => {
        this.items = data;
      }, err => this.inputationSrv.httpSrv.catchError(err));
  }
  findAll(){
    this.inputationSrv.findLastInputations()
    .subscribe((data: any) => {
      this.items = data;
      this.setLoaded();
    }, err => this.inputationSrv.httpSrv.catchError(err));
  }

}
