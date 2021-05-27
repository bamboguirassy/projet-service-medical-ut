import { BasePageComponent } from '../../../base-page/base-page.component';
import { IAppState } from './../../../../interfaces/app-state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { InputationService } from '../inputation.service';
import { Inputation } from '../inputation';

@Component({
  selector: 'app-inputation-list',
  templateUrl: './inputation-list.component.html',
  styleUrls: ['./inputation-list.component.scss']
})
export class InputationListComponent extends BasePageComponent<Inputation> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public inputationSrv: InputationService) {
    super(store, inputationSrv);

    this.pageData = {
      title: 'Inputation',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des inputations'
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
