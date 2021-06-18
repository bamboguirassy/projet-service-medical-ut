import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { MesureService } from '../mesure.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Mesure } from '../mesure';

@Component({
  selector: 'app-mesure-clone',
  templateUrl: './mesure-clone.component.html',
  styleUrls: ['./mesure-clone.component.scss']
})
export class MesureCloneComponent extends BasePageComponent<Mesure> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public mesureSrv: MesureService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, mesureSrv);
    this.pageData = {
      title: 'Clonage - Mesure',
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
          title: 'Clonage'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getData(this.mesureSrv.getRoutePrefix() + this.activatedRoute.snapshot.params.id, 'original', 'setLoaded');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
    this.entity = Object.assign({}, this.original);
    this.entity.id = null;
  }

  handlePostClone(data: Mesure) {
    this.mesureSrv.httpSrv.router.navigate([this.orientation,this.mesureSrv.getRoutePrefixWithoutSlash(),data.id]);
  }

  prepareClone() {}

}

