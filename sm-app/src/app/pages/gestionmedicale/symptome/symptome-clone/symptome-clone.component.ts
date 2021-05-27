import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { SymptomeService } from '../symptome.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Symptome } from '../symptome';

@Component({
  selector: 'app-symptome-clone',
  templateUrl: './symptome-clone.component.html',
  styleUrls: ['./symptome-clone.component.scss']
})
export class SymptomeCloneComponent extends BasePageComponent<Symptome> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public symptomeSrv: SymptomeService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, symptomeSrv);
    this.pageData = {
      title: 'Clonage - Symptome',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Symptomes',
          route: '/'+this.orientation+'/symptome'
        },
        {
          title: 'Clonage'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getData(this.symptomeSrv.getRoutePrefix() + this.activatedRoute.snapshot.params.id, 'original', 'setLoaded');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
    this.entity = Object.assign({}, this.original);
    this.entity.id = null;
  }

  handlePostClone(data: Symptome) {
    this.symptomeSrv.httpSrv.router.navigate([this.orientation,this.symptomeSrv.getRoutePrefixWithoutSlash(),data.id]);
  }

  prepareClone() {}

}

