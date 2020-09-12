import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { DocteurService } from '../docteur.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Docteur } from '../docteur';

@Component({
  selector: 'app-docteur-clone',
  templateUrl: './docteur-clone.component.html',
  styleUrls: ['./docteur-clone.component.scss']
})
export class DocteurCloneComponent extends BasePageComponent<Docteur> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public docteurSrv: DocteurService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, docteurSrv);
    this.pageData = {
      title: 'Clonage - Docteur',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Docteurs',
          route: '/'+this.orientation+'/docteur'
        },
        {
          title: 'Clonage'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getData(this.docteurSrv.getRoutePrefix() + this.activatedRoute.snapshot.params.id, 'original', 'setLoaded');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
    this.entity = Object.assign({}, this.original);
    this.entity.id = null;
  }

  handlePostClone(data: Docteur) {
    this.docteurSrv.httpSrv.router.navigate([this.orientation,this.docteurSrv.getRoutePrefixWithoutSlash(),data.id]);
  }

  prepareClone() {}

}

