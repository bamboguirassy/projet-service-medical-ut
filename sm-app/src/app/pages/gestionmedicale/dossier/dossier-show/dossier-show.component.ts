import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { DossierService } from '../dossier.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { Dossier } from '../dossier';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dossier-show',
  templateUrl: './dossier-show.component.html',
  styleUrls: ['./dossier-show.component.scss']
})
export class DossierShowComponent extends BasePageComponent<Dossier> implements OnInit, OnDestroy {
  entity: Dossier;

  constructor(store: Store<IAppState>,
    public dossierSrv: DossierService,
    public activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, dossierSrv);
    this.pageData = {
      title: '',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Dossiers Médicaux',
          route: '/'+this.orientation+'/dossier'
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
    this.title = 'Dossier Médical - ' + this.entity?.numero;
  }

  handlePostDelete() {
    this.location.back();
  }

}
