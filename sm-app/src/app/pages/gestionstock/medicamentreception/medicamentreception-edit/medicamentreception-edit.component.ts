import { Component, OnInit, OnDestroy } from '@angular/core';
import { MedicamentReception } from '../medicamentreception';
import { MedicamentReceptionService } from '../medicamentreception.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from './../../../../interfaces/app-state';
import { BasePageComponent } from '../../../base-page/base-page.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-medicamentreception-edit',
  templateUrl: './medicamentreception-edit.component.html',
  styleUrls: ['./medicamentreception-edit.component.scss']
})
export class MedicamentReceptionEditComponent extends BasePageComponent<MedicamentReception> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
    public medicamentReceptionSrv: MedicamentReceptionService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, medicamentReceptionSrv);
    this.pageData = {
      title: 'Modification - Médicament réceptionnné',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des médicaments réceptionnnés',
          route: '/' + this.orientation + '/medicamentreception'
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
