import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { DossierService } from '../dossier.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dossier } from '../dossier';

@Component({
  selector: 'app-dossier-clone',
  templateUrl: './dossier-clone.component.html',
  styleUrls: ['./dossier-clone.component.scss']
})
export class DossierCloneComponent extends BasePageComponent<Dossier> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public dossierSrv: DossierService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, dossierSrv);
    this.pageData = {
      title: 'Clonage - Dossier',
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
          title: 'Clonage'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getData(this.dossierSrv.getRoutePrefix() + this.activatedRoute.snapshot.params.id, 'original', 'setLoaded');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
    this.entity = Object.assign({}, this.original);
    this.entity.id = null;
  }

  handlePostClone(data: Dossier) {
    this.dossierSrv.httpSrv.router.navigate([this.orientation,this.dossierSrv.getRoutePrefixWithoutSlash(),data.id]);
  }

  prepareClone() {}

}

