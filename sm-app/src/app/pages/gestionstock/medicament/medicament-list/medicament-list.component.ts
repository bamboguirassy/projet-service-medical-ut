import { BasePageComponent } from '../../../base-page/base-page.component';
import { IAppState } from './../../../../interfaces/app-state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MedicamentService } from '../medicament.service';
import { Medicament } from '../medicament';

@Component({
  selector: 'app-medicament-list',
  templateUrl: './medicament-list.component.html',
  styleUrls: ['./medicament-list.component.scss']
})
export class MedicamentListComponent extends BasePageComponent<Medicament> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public medicamentSrv: MedicamentService) {
    super(store, medicamentSrv);

    this.pageData = {
      title: 'Liste des Médicaments',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Stock de medicaments'
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
