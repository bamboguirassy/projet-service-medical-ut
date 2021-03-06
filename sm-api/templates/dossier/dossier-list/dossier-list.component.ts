import { BasePageComponent } from '../../../base-page/base-page.component';
import { IAppState } from './../../../../interfaces/app-state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { DossierService } from '../dossier.service';
import { Dossier } from '../dossier';

@Component({
  selector: 'app-dossier-list',
  templateUrl: './dossier-list.component.html',
  styleUrls: ['./dossier-list.component.scss']
})
export class DossierListComponent extends BasePageComponent<Dossier> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public dossierSrv: DossierService) {
    super(store, dossierSrv);

    this.pageData = {
      title: 'Dossier',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des dossiers'
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
