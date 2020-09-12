import { BasePageComponent } from '../../../base-page/base-page.component';
import { IAppState } from './../../../../interfaces/app-state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { DocteurService } from '../docteur.service';
import { Docteur } from '../docteur';

@Component({
  selector: 'app-docteur-list',
  templateUrl: './docteur-list.component.html',
  styleUrls: ['./docteur-list.component.scss']
})
export class DocteurListComponent extends BasePageComponent<Docteur> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public docteurSrv: DocteurService) {
    super(store, docteurSrv);

    this.pageData = {
      title: 'Docteur',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des docteurs'
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

  handlePostLoad(){}

}
