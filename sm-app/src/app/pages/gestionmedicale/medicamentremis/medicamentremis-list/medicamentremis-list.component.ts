import { BasePageComponent } from '../../../base-page/base-page.component';
import { IAppState } from './../../../../interfaces/app-state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MedicamentRemisService } from '../medicamentremis.service';
import { MedicamentRemis } from '../medicamentremis';

@Component({
  selector: 'app-medicamentremis-list',
  templateUrl: './medicamentremis-list.component.html',
  styleUrls: ['./medicamentremis-list.component.scss']
})
export class MedicamentRemisListComponent extends BasePageComponent<MedicamentRemis> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public medicamentRemiSrv: MedicamentRemisService) {
    super(store, medicamentRemiSrv);

    this.pageData = {
      title: 'MedicamentRemis',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des medicamentremiss'
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

  handlePostLoad(){}

}
