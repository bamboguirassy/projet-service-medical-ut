import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { InputationService } from '../inputation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Inputation } from '../inputation';

@Component({
  selector: 'app-inputation-clone',
  templateUrl: './inputation-clone.component.html',
  styleUrls: ['./inputation-clone.component.scss']
})
export class InputationCloneComponent extends BasePageComponent<Inputation> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public inputationSrv: InputationService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, inputationSrv);
    this.pageData = {
      title: 'Clonage - Inputation',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Inputations',
          route: '/'+this.orientation+'/inputation'
        },
        {
          title: 'Clonage'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getData(this.inputationSrv.getRoutePrefix() + this.activatedRoute.snapshot.params.id, 'original', 'setLoaded');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
    this.entity = Object.assign({}, this.original);
    this.entity.id = null;
  }

  handlePostClone(data: Inputation) {
    this.inputationSrv.httpSrv.router.navigate([this.orientation,this.inputationSrv.getRoutePrefixWithoutSlash(),data.id]);
  }

  prepareClone() {}

}

