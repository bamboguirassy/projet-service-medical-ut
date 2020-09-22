import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { SymptomeService } from '../symptome.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { Symptome } from '../symptome';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-symptome-show',
  templateUrl: './symptome-show.component.html',
  styleUrls: ['./symptome-show.component.scss']
})
export class SymptomeShowComponent extends BasePageComponent<Symptome> implements OnInit, OnDestroy {
  entity: Symptome;

  constructor(store: Store<IAppState>,
    public symptomeSrv: SymptomeService,
    private activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, symptomeSrv);
    this.pageData = {
      title: 'Détails - Symptome',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Symptomes',
          route: '/'+this.orientation+'/symptome'
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
    this.title = 'Symptome - ' + this.entity?.id;
  }

  handlePostDelete() {
    this.location.back();
  }

}
