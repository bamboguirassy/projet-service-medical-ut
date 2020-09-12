import { BasePageComponent } from '../../../base-page/base-page.component';
import { IAppState } from './../../../../interfaces/app-state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { PathologieService } from '../pathologie.service';
import { Pathologie } from '../pathologie';

@Component({
  selector: 'app-pathologie-list',
  templateUrl: './pathologie-list.component.html',
  styleUrls: ['./pathologie-list.component.scss']
})
export class PathologieListComponent extends BasePageComponent<Pathologie> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public pathologieSrv: PathologieService) {
    super(store, pathologieSrv);

    this.pageData = {
      title: 'Pathologie',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des pathologies'
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
