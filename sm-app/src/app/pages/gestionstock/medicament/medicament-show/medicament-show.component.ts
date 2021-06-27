import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { MedicamentService } from '../medicament.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { Medicament } from '../medicament';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-medicament-show',
  templateUrl: './medicament-show.component.html',
  styleUrls: ['./medicament-show.component.scss']
})
export class MedicamentShowComponent extends BasePageComponent<Medicament> implements OnInit, OnDestroy {
  entity: Medicament;

  constructor(store: Store<IAppState>,
    public medicamentSrv: MedicamentService,
    private activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, medicamentSrv);
    this.pageData = {
      title: 'Détails - Médicament',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des médicaments en stock',
          route: '/' + this.orientation + '/medicament'
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
    this.title = 'Médicament - ' + this.entity?.id;
  }

  handlePostDelete() {
    this.location.back();
  }

}
