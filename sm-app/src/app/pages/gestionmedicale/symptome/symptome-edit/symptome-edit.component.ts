import { Component, OnInit, OnDestroy } from '@angular/core';
import { Symptome } from '../symptome';
import { SymptomeService } from '../symptome.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from './../../../../interfaces/app-state';
import { BasePageComponent } from '../../../base-page/base-page.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-symptome-edit',
  templateUrl: './symptome-edit.component.html',
  styleUrls: ['./symptome-edit.component.scss']
})
export class SymptomeEditComponent extends BasePageComponent<Symptome> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
    public symptomeSrv: SymptomeService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, symptomeSrv);
    this.pageData = {
      title: 'Modification - Symptôme',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des symptômes',
          route: '/' + this.orientation + '/symptome'
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
