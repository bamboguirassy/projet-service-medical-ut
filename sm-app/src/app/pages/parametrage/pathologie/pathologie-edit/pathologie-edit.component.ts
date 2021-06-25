import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pathologie } from '../pathologie';
import { PathologieService } from '../pathologie.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pathologie-edit',
  templateUrl: './pathologie-edit.component.html',
  styleUrls: ['./pathologie-edit.component.scss']
})
export class PathologieEditComponent extends BasePageComponent<Pathologie> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
    public pathologieSrv: PathologieService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, pathologieSrv);
    this.pageData = {
      title: 'Modification - Pathologie',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des pathologies',
          route: '/' + this.orientation + '/pathologie'
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
