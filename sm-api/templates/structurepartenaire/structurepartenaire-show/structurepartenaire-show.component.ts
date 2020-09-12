import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { StructurePartenaireService } from '../structurepartenaire.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { StructurePartenaire } from '../structurepartenaire';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-structurepartenaire-show',
  templateUrl: './structurepartenaire-show.component.html',
  styleUrls: ['./structurepartenaire-show.component.scss']
})
export class StructurePartenaireShowComponent extends BasePageComponent<StructurePartenaire> implements OnInit, OnDestroy {
  entity: StructurePartenaire;

  constructor(store: Store<IAppState>,
    public structurePartenaireSrv: StructurePartenaireService,
    private activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, structurePartenaireSrv);
    this.pageData = {
      title: 'Détails - StructurePartenaire',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'StructurePartenaires',
          route: '/'+this.orientation+'/structurepartenaire'
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
    this.title = 'StructurePartenaire - ' + this.entity?.id;
  }

  handlePostDelete() {
    this.location.back();
  }

}
