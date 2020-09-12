import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { BonReceptionService } from '../bonreception.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BonReception } from '../bonreception';

@Component({
  selector: 'app-bonreception-clone',
  templateUrl: './bonreception-clone.component.html',
  styleUrls: ['./bonreception-clone.component.scss']
})
export class BonReceptionCloneComponent extends BasePageComponent<BonReception> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public bonReceptionSrv: BonReceptionService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, bonReceptionSrv);
    this.pageData = {
      title: 'Clonage - BonReception',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'BonReceptions',
          route: '/'+this.orientation+'/bonreception'
        },
        {
          title: 'Clonage'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getData(this.bonReceptionSrv.getRoutePrefix() + this.activatedRoute.snapshot.params.id, 'original', 'setLoaded');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
    this.entity = Object.assign({}, this.original);
    this.entity.id = null;
  }

  handlePostClone(data: BonReception) {
    this.bonReceptionSrv.httpSrv.router.navigate([this.orientation,this.bonReceptionSrv.getRoutePrefixWithoutSlash(),data.id]);
  }

  prepareClone() {}

}

