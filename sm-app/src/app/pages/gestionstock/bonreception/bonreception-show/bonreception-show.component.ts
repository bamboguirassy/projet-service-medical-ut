import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { BonReceptionService } from '../bonreception.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { BonReception } from '../bonreception';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bonreception-show',
  templateUrl: './bonreception-show.component.html',
  styleUrls: ['./bonreception-show.component.scss']
})
export class BonReceptionShowComponent extends BasePageComponent<BonReception> implements OnInit, OnDestroy {
  entity: BonReception;

  constructor(store: Store<IAppState>,
    public bonReceptionSrv: BonReceptionService,
    private activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, bonReceptionSrv);
    this.pageData = {
      title: 'Détails - Bon de réception',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des bons de Réceptions',
          route: '/' + this.orientation + '/bonreception'
        },
        {
          title: 'Affichage'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.findEntity(this.activatedRoute.snapshot.params.id);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
    this.title = 'Bon de réception - ' + this.entity?.numero;
  }

  handlePostDelete() {
    this.location.back();
  }

}
