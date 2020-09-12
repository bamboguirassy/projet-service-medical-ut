import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { PathologieService } from '../pathologie.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Pathologie } from '../pathologie';

@Component({
  selector: 'app-pathologie-clone',
  templateUrl: './pathologie-clone.component.html',
  styleUrls: ['./pathologie-clone.component.scss']
})
export class PathologieCloneComponent extends BasePageComponent<Pathologie> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public pathologieSrv: PathologieService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, pathologieSrv);
    this.pageData = {
      title: 'Clonage - Pathologie',
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
          title: 'Clonage'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getData(this.pathologieSrv.getRoutePrefix() + this.activatedRoute.snapshot.params.id, 'original', 'setLoaded');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
    this.entity = Object.assign({}, this.original);
    this.entity.id = null;
  }

  handlePostClone(data: Pathologie) {
    this.pathologieSrv.httpSrv.router.navigate([this.orientation,this.pathologieSrv.getRoutePrefixWithoutSlash(),data.id]);
  }

  prepareClone() {}

}

