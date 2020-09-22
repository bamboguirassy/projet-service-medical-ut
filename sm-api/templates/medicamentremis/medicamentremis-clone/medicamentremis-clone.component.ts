import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { MedicamentRemisService } from '../medicamentremis.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MedicamentRemis } from '../medicamentremis';

@Component({
  selector: 'app-medicamentremis-clone',
  templateUrl: './medicamentremis-clone.component.html',
  styleUrls: ['./medicamentremis-clone.component.scss']
})
export class MedicamentRemisCloneComponent extends BasePageComponent<MedicamentRemis> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public medicamentRemiSrv: MedicamentRemisService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, medicamentRemiSrv);
    this.pageData = {
      title: 'Clonage - MedicamentRemis',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'MedicamentRemiss',
          route: '/'+this.orientation+'/medicamentremis'
        },
        {
          title: 'Clonage'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getData(this.medicamentRemiSrv.getRoutePrefix() + this.activatedRoute.snapshot.params.id, 'original', 'setLoaded');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
    this.entity = Object.assign({}, this.original);
    this.entity.id = null;
  }

  handlePostClone(data: MedicamentRemis) {
    this.medicamentRemiSrv.httpSrv.router.navigate([this.orientation,this.medicamentRemiSrv.getRoutePrefixWithoutSlash(),data.id]);
  }

  prepareClone() {}

}

