import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { InputationService } from '../inputation.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { Inputation } from '../inputation';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-inputation-show',
  templateUrl: './inputation-show.component.html',
  styleUrls: ['./inputation-show.component.scss']
})
export class InputationShowComponent extends BasePageComponent<Inputation> implements OnInit, OnDestroy {
  entity: Inputation;

  constructor(store: Store<IAppState>,
    public inputationSrv: InputationService,
    private activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, inputationSrv);
    this.pageData = {
      title: 'Détails - Imputation',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des imputations',
          route: '/'+this.orientation+'/inputation'
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
    this.title = 'Inputation - ' + this.entity?.id;
  }

  handlePostDelete() {
    this.location.back();
  }

}
