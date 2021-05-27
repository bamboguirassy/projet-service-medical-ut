import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { ReposMedicalService } from '../reposmedical.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ReposMedical } from '../reposmedical';

@Component({
  selector: 'app-reposmedical-clone',
  templateUrl: './reposmedical-clone.component.html',
  styleUrls: ['./reposmedical-clone.component.scss']
})
export class ReposMedicalCloneComponent extends BasePageComponent<ReposMedical> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public reposMedicalSrv: ReposMedicalService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, reposMedicalSrv);
    this.pageData = {
      title: 'Clonage - ReposMedical',
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
          title: 'Clonage'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getData(this.reposMedicalSrv.getRoutePrefix() + this.activatedRoute.snapshot.params.id, 'original', 'setLoaded');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
    this.entity = Object.assign({}, this.original);
    this.entity.id = null;
  }

  handlePostClone(data: ReposMedical) {
    this.reposMedicalSrv.httpSrv.router.navigate([this.orientation,this.reposMedicalSrv.getRoutePrefixWithoutSlash(),data.id]);
  }

  prepareClone() {}

}

