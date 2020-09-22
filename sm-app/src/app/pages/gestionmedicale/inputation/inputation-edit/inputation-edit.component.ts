import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inputation } from '../inputation';
import { InputationService } from '../inputation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Location } from '@angular/common';

@Component({
  selector: 'app-inputation-edit',
  templateUrl: './inputation-edit.component.html',
  styleUrls: ['./inputation-edit.component.scss']
})
export class InputationEditComponent extends BasePageComponent<Inputation> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public inputationSrv: InputationService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, inputationSrv);
    this.pageData = {
      title: 'Modification - Inputation',
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
