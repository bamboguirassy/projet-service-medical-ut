import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dossier } from '../dossier';
import { DossierService } from '../dossier.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dossier-edit',
  templateUrl: './dossier-edit.component.html',
  styleUrls: ['./dossier-edit.component.scss']
})
export class DossierEditComponent extends BasePageComponent<Dossier> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public dossierSrv: DossierService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, dossierSrv);
    this.pageData = {
      title: 'Modification - Dossier',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Dossiers',
          route: '/'+this.orientation+'/dossier'
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
