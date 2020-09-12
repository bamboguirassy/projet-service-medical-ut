import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medicament } from '../medicament';
import { MedicamentService } from '../medicament.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Location } from '@angular/common';

@Component({
  selector: 'app-medicament-edit',
  templateUrl: './medicament-edit.component.html',
  styleUrls: ['./medicament-edit.component.scss']
})
export class MedicamentEditComponent extends BasePageComponent<Medicament> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public medicamentSrv: MedicamentService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, medicamentSrv);
    this.pageData = {
      title: 'Modification - Medicament',
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
