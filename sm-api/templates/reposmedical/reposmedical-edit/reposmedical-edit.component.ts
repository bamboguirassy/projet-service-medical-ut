import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReposMedical } from '../reposmedical';
import { ReposMedicalService } from '../reposmedical.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reposmedical-edit',
  templateUrl: './reposmedical-edit.component.html',
  styleUrls: ['./reposmedical-edit.component.scss']
})
export class ReposMedicalEditComponent extends BasePageComponent<ReposMedical> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public reposMedicalSrv: ReposMedicalService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, reposMedicalSrv);
    this.pageData = {
      title: 'Modification - ReposMedical',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'ReposMedicals',
          route: '/'+this.orientation+'/reposmedical'
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
