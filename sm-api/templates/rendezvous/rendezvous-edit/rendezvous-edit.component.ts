import { Component, OnInit, OnDestroy } from '@angular/core';
import { RendezVous } from '../rendezvous';
import { RendezVousService } from '../rendezvous.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rendezvous-edit',
  templateUrl: './rendezvous-edit.component.html',
  styleUrls: ['./rendezvous-edit.component.scss']
})
export class RendezVousEditComponent extends BasePageComponent<RendezVous> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public rendezVousSrv: RendezVousService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, rendezVousSrv);
    this.pageData = {
      title: 'Modification - RendezVous',
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
