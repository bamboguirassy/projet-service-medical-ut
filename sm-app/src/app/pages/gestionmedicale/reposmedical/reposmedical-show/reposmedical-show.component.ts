import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { ReposMedicalService } from '../reposmedical.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { ReposMedical } from '../reposmedical';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reposmedical-show',
  templateUrl: './reposmedical-show.component.html',
  styleUrls: ['./reposmedical-show.component.scss']
})
export class ReposMedicalShowComponent extends BasePageComponent<ReposMedical> implements OnInit, OnDestroy {
  entity: ReposMedical;

  constructor(store: Store<IAppState>,
    public reposMedicalSrv: ReposMedicalService,
    private activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, reposMedicalSrv);
    this.pageData = {
      title: 'Détails - Repos médical',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des repos médicaux prescrits',
          route: '/'+this.orientation+'/reposmedical'
        },
        {
          title: 'Affichage'
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
    this.title = 'Repos médical - ' + this.entity?.id;
  }

  handlePostDelete() {
    this.location.back();
  }

}
