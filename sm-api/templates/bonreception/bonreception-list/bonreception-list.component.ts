import { BasePageComponent } from '../../../base-page/base-page.component';
import { IAppState } from './../../../../interfaces/app-state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { BonReceptionService } from '../bonreception.service';
import { BonReception } from '../bonreception';

@Component({
  selector: 'app-bonreception-list',
  templateUrl: './bonreception-list.component.html',
  styleUrls: ['./bonreception-list.component.scss']
})
export class BonReceptionListComponent extends BasePageComponent<BonReception> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public bonReceptionSrv: BonReceptionService) {
    super(store, bonReceptionSrv);

    this.pageData = {
      title: 'BonReception',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des bonreceptions'
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
