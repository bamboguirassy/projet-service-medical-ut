import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from '../../../base-page/base-page.component';
import { MedicamentRemisService } from '../medicamentremis.service';
import { Store } from '@ngrx/store';
import { IAppState } from './../../../../interfaces/app-state';
import { MedicamentRemis } from '../medicamentremis';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-medicamentremis-show',
  templateUrl: './medicamentremis-show.component.html',
  styleUrls: ['./medicamentremis-show.component.scss']
})
export class MedicamentRemisShowComponent extends BasePageComponent<MedicamentRemis> implements OnInit, OnDestroy {
  entity: MedicamentRemis;

  constructor(store: Store<IAppState>,
    public medicamentRemiSrv: MedicamentRemisService,
    private activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, medicamentRemiSrv);
    this.pageData = {
      title: 'Détails - MedicamentRemis',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'MedicamentRemiss',
          route: '/'+this.orientation+'/medicamentremis'
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
    this.title = 'MedicamentRemis - ' + this.entity?.id;
  }

  handlePostDelete() {
    this.location.back();
  }

}
