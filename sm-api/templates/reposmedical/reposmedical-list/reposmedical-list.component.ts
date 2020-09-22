import { BasePageComponent } from '../../../base-page/base-page.component';
import { IAppState } from './../../../../interfaces/app-state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReposMedicalService } from '../reposmedical.service';
import { ReposMedical } from '../reposmedical';

@Component({
  selector: 'app-reposmedical-list',
  templateUrl: './reposmedical-list.component.html',
  styleUrls: ['./reposmedical-list.component.scss']
})
export class ReposMedicalListComponent extends BasePageComponent<ReposMedical> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public reposMedicalSrv: ReposMedicalService) {
    super(store, reposMedicalSrv);

    this.pageData = {
      title: 'ReposMedical',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des reposmedicals'
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
