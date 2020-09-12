import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { MedicamentService } from '../medicament.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Medicament } from '../medicament';

@Component({
  selector: 'app-medicament-clone',
  templateUrl: './medicament-clone.component.html',
  styleUrls: ['./medicament-clone.component.scss']
})
export class MedicamentCloneComponent extends BasePageComponent<Medicament> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public medicamentSrv: MedicamentService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, medicamentSrv);
    this.pageData = {
      title: 'Clonage - Medicament',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Medicaments',
          route: '/'+this.orientation+'/medicament'
        },
        {
          title: 'Clonage'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getData(this.medicamentSrv.getRoutePrefix() + this.activatedRoute.snapshot.params.id, 'original', 'setLoaded');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
    this.entity = Object.assign({}, this.original);
    this.entity.id = null;
  }

  handlePostClone(data: Medicament) {
    this.medicamentSrv.httpSrv.router.navigate([this.orientation,this.medicamentSrv.getRoutePrefixWithoutSlash(),data.id]);
  }

  prepareClone() {}

}

