import { BasePageComponent } from '../../../base-page/base-page.component';
import { IAppState } from './../../../../interfaces/app-state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MedicamentReceptionService } from '../medicamentreception.service';
import { MedicamentReception } from '../medicamentreception';

@Component({
  selector: 'app-medicamentreception-list',
  templateUrl: './medicamentreception-list.component.html',
  styleUrls: ['./medicamentreception-list.component.scss']
})
export class MedicamentReceptionListComponent extends BasePageComponent<MedicamentReception> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
    public medicamentReceptionSrv: MedicamentReceptionService) {
    super(store, medicamentReceptionSrv);

    this.pageData = {
      title: 'Liste des médicaments réceptionnés',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des médicaments réceptionnés'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.findAll();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostDelete() {
    this.findAll();
  }

  handlePostLoad() { }

}
