import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { MedicamentReceptionService } from '../medicamentreception.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MedicamentReception } from '../medicamentreception';

@Component({
  selector: 'app-medicamentreception-clone',
  templateUrl: './medicamentreception-clone.component.html',
  styleUrls: ['./medicamentreception-clone.component.scss']
})
export class MedicamentReceptionCloneComponent extends BasePageComponent<MedicamentReception> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public medicamentReceptionSrv: MedicamentReceptionService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, medicamentReceptionSrv);
    this.pageData = {
      title: 'Clonage - MedicamentReception',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'MedicamentReceptions',
          route: '/'+this.orientation+'/medicamentreception'
        },
        {
          title: 'Clonage'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getData(this.medicamentReceptionSrv.getRoutePrefix() + this.activatedRoute.snapshot.params.id, 'original', 'setLoaded');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
    this.entity = Object.assign({}, this.original);
    this.entity.id = null;
  }

  handlePostClone(data: MedicamentReception) {
    this.medicamentReceptionSrv.httpSrv.router.navigate([this.orientation,this.medicamentReceptionSrv.getRoutePrefixWithoutSlash(),data.id]);
  }

  prepareClone() {}

}

