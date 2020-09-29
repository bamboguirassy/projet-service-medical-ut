import { BasePageComponent } from '../../../base-page/base-page.component';
import { IAppState } from './../../../../interfaces/app-state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { RendezVousService } from '../rendezvous.service';
import { RendezVous } from '../rendezvous';

@Component({
  selector: 'app-rendezvous-list',
  templateUrl: './rendezvous-list.component.html',
  styleUrls: ['./rendezvous-list.component.scss']
})
export class RendezVousListComponent extends BasePageComponent<RendezVous> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public rendezVousSrv: RendezVousService) {
    super(store, rendezVousSrv);

    this.pageData = {
      title: 'Rendez-Vous prescrits',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des rendez-vouss'
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
