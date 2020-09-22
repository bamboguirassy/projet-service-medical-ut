import { BasePageComponent } from '../../../base-page/base-page.component';
import { IAppState } from './../../../../interfaces/app-state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { SymptomeService } from '../symptome.service';
import { Symptome } from '../symptome';

@Component({
  selector: 'app-symptome-list',
  templateUrl: './symptome-list.component.html',
  styleUrls: ['./symptome-list.component.scss']
})
export class SymptomeListComponent extends BasePageComponent<Symptome> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public symptomeSrv: SymptomeService) {
    super(store, symptomeSrv);

    this.pageData = {
      title: 'Symptome',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des symptomes'
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
