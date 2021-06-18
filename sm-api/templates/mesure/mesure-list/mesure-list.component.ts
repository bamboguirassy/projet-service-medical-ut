import { BasePageComponent } from '../../../base-page/base-page.component';
import { IAppState } from './../../../../interfaces/app-state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MesureService } from '../mesure.service';
import { Mesure } from '../mesure';

@Component({
  selector: 'app-mesure-list',
  templateUrl: './mesure-list.component.html',
  styleUrls: ['./mesure-list.component.scss']
})
export class MesureListComponent extends BasePageComponent<Mesure> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public mesureSrv: MesureService) {
    super(store, mesureSrv);

    this.pageData = {
      title: 'Mesure',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des mesures'
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
