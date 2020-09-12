import { BasePageComponent } from '../../../base-page/base-page.component';
import { IAppState } from './../../../../interfaces/app-state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { StructurePartenaireService } from '../structurepartenaire.service';
import { StructurePartenaire } from '../structurepartenaire';

@Component({
  selector: 'app-structurepartenaire-list',
  templateUrl: './structurepartenaire-list.component.html',
  styleUrls: ['./structurepartenaire-list.component.scss']
})
export class StructurePartenaireListComponent extends BasePageComponent<StructurePartenaire> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public structurePartenaireSrv: StructurePartenaireService) {
    super(store, structurePartenaireSrv);

    this.pageData = {
      title: 'StructurePartenaire',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des structurepartenaires'
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
