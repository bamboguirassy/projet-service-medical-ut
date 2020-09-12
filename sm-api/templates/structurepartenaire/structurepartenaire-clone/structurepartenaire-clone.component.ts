import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { StructurePartenaireService } from '../structurepartenaire.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StructurePartenaire } from '../structurepartenaire';

@Component({
  selector: 'app-structurepartenaire-clone',
  templateUrl: './structurepartenaire-clone.component.html',
  styleUrls: ['./structurepartenaire-clone.component.scss']
})
export class StructurePartenaireCloneComponent extends BasePageComponent<StructurePartenaire> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public structurePartenaireSrv: StructurePartenaireService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, structurePartenaireSrv);
    this.pageData = {
      title: 'Clonage - StructurePartenaire',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'StructurePartenaires',
          route: '/'+this.orientation+'/structurepartenaire'
        },
        {
          title: 'Clonage'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getData(this.structurePartenaireSrv.getRoutePrefix() + this.activatedRoute.snapshot.params.id, 'original', 'setLoaded');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
    this.entity = Object.assign({}, this.original);
    this.entity.id = null;
  }

  handlePostClone(data: StructurePartenaire) {
    this.structurePartenaireSrv.httpSrv.router.navigate([this.orientation,this.structurePartenaireSrv.getRoutePrefixWithoutSlash(),data.id]);
  }

  prepareClone() {}

}

