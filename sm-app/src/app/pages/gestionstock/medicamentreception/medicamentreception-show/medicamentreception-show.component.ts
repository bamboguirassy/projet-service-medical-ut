import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from '../../../base-page/base-page.component';
import { MedicamentReceptionService } from '../medicamentreception.service';
import { Store } from '@ngrx/store';
import { IAppState } from './../../../../interfaces/app-state';
import { MedicamentReception } from '../medicamentreception';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-medicamentreception-show',
  templateUrl: './medicamentreception-show.component.html',
  styleUrls: ['./medicamentreception-show.component.scss']
})
export class MedicamentReceptionShowComponent extends BasePageComponent<MedicamentReception> implements OnInit, OnDestroy {
  entity: MedicamentReception;

  constructor(store: Store<IAppState>,
    public medicamentReceptionSrv: MedicamentReceptionService,
    private activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, medicamentReceptionSrv);
    this.pageData = {
      title: 'Détails - MedicamentReception',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'MedicamentReceptions',
          route: '/' + this.orientation + '/medicamentreception'
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
    this.title = 'MedicamentReception - ' + this.entity?.id;
  }

  handlePostDelete() {
    this.location.back();
  }

}
