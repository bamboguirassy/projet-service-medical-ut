import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { RendezVousService } from '../rendezvous.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RendezVous } from '../rendezvous';

@Component({
  selector: 'app-rendezvous-clone',
  templateUrl: './rendezvous-clone.component.html',
  styleUrls: ['./rendezvous-clone.component.scss']
})
export class RendezVousCloneComponent extends BasePageComponent<RendezVous> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public rendezVousSrv: RendezVousService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, rendezVousSrv);
    this.pageData = {
      title: 'Clonage - RendezVous',
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
          title: 'Clonage'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getData(this.rendezVousSrv.getRoutePrefix() + this.activatedRoute.snapshot.params.id, 'original', 'setLoaded');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
    this.entity = Object.assign({}, this.original);
    this.entity.id = null;
  }

  handlePostClone(data: RendezVous) {
    this.rendezVousSrv.httpSrv.router.navigate([this.orientation,this.rendezVousSrv.getRoutePrefixWithoutSlash(),data.id]);
  }

  prepareClone() {}

}

