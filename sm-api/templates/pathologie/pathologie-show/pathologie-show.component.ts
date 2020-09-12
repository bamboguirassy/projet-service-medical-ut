import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { PathologieService } from '../pathologie.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { Pathologie } from '../pathologie';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pathologie-show',
  templateUrl: './pathologie-show.component.html',
  styleUrls: ['./pathologie-show.component.scss']
})
export class PathologieShowComponent extends BasePageComponent<Pathologie> implements OnInit, OnDestroy {
  entity: Pathologie;

  constructor(store: Store<IAppState>,
    public pathologieSrv: PathologieService,
    private activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, pathologieSrv);
    this.pageData = {
      title: 'Détails - Pathologie',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Pathologies',
          route: '/'+this.orientation+'/pathologie'
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
    this.title = 'Pathologie - ' + this.entity?.id;
  }

  handlePostDelete() {
    this.location.back();
  }

}
