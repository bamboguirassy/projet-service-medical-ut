import { Component, OnInit, OnDestroy } from '@angular/core';
import { Mesure } from '../mesure';
import { MesureService } from '../mesure.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mesure-edit',
  templateUrl: './mesure-edit.component.html',
  styleUrls: ['./mesure-edit.component.scss']
})
export class MesureEditComponent extends BasePageComponent<Mesure> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public mesureSrv: MesureService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, mesureSrv);
    this.pageData = {
      title: 'Modification - Mesure',
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
          title: 'Modification'
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
  }

  prepareUpdate() {
  }

  handlePostUpdate() {
    this.location.back();
  }

}
