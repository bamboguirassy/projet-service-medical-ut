import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { RendezVousService } from '../rendezvous.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { RendezVous } from '../rendezvous';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rendezvous-show',
  templateUrl: './rendezvous-show.component.html',
  styleUrls: ['./rendezvous-show.component.scss']
})
export class RendezVousShowComponent extends BasePageComponent<RendezVous> implements OnInit, OnDestroy {
  entity: RendezVous;

  constructor(store: Store<IAppState>,
    public rendezVousSrv: RendezVousService,
    private activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, rendezVousSrv);
    this.pageData = {
      title: 'Détails - RendezVous',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'RendezVouss',
          route: '/'+this.orientation+'/rendezvous'
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
    this.title = 'RendezVous - ' + this.entity?.id;
  }

  handlePostDelete() {
    this.location.back();
  }

}
