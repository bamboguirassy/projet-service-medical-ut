import { Component, OnInit, OnDestroy } from '@angular/core';
import { Consultation } from '../consultation';
import { ConsultationService } from '../consultation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Location } from '@angular/common';

@Component({
  selector: 'app-consultation-edit',
  templateUrl: './consultation-edit.component.html',
  styleUrls: ['./consultation-edit.component.scss']
})
export class ConsultationEditComponent extends BasePageComponent<Consultation> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
    public consultationSrv: ConsultationService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, consultationSrv);
    this.pageData = {
      title: 'Modification - Consultation',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des consultations',
          route: '/' + this.orientation + '/consultation'
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
