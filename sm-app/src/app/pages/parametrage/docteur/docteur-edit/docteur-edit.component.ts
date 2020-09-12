import { Component, OnInit, OnDestroy } from '@angular/core';
import { Docteur } from '../docteur';
import { DocteurService } from '../docteur.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Location } from '@angular/common';

@Component({
  selector: 'app-docteur-edit',
  templateUrl: './docteur-edit.component.html',
  styleUrls: ['./docteur-edit.component.scss']
})
export class DocteurEditComponent extends BasePageComponent<Docteur> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public docteurSrv: DocteurService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, docteurSrv);
    this.pageData = {
      title: 'Modification - Docteur',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Docteurs',
          route: '/'+this.orientation+'/docteur'
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

  prepareUpdate() {}

  handlePostUpdate() {
    this.location.back();
  }

}
