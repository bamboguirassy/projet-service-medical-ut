import { Component, OnInit, OnDestroy } from '@angular/core';
import { MedicamentRemis } from '../medicamentremis';
import { MedicamentRemisService } from '../medicamentremis.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Location } from '@angular/common';

@Component({
  selector: 'app-medicamentremis-edit',
  templateUrl: './medicamentremis-edit.component.html',
  styleUrls: ['./medicamentremis-edit.component.scss']
})
export class MedicamentRemisEditComponent extends BasePageComponent<MedicamentRemis> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
    public medicamentRemiSrv: MedicamentRemisService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, medicamentRemiSrv);
    this.pageData = {
      title: 'Modification - Médicament remis',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des médicament remis',
          route: '/' + this.orientation + '/medicamentremis'
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
