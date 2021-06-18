import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { MesureService } from '../mesure.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { Mesure } from '../mesure';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mesure-show',
  templateUrl: './mesure-show.component.html',
  styleUrls: ['./mesure-show.component.scss']
})
export class MesureShowComponent extends BasePageComponent<Mesure> implements OnInit, OnDestroy {
  entity: Mesure;

  constructor(store: Store<IAppState>,
    public mesureSrv: MesureService,
    private activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, mesureSrv);
    this.pageData = {
      title: 'Détails - Mesure',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Mesures',
          route: '/'+this.orientation+'/mesure'
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
    this.title = 'Mesure - ' + this.entity?.id;
  }

  handlePostDelete() {
    this.location.back();
  }

}
