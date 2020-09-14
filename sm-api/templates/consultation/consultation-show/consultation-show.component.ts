import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { ConsultationService } from '../consultation.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { Consultation } from '../consultation';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-consultation-show',
  templateUrl: './consultation-show.component.html',
  styleUrls: ['./consultation-show.component.scss']
})
export class ConsultationShowComponent extends BasePageComponent<Consultation> implements OnInit, OnDestroy {
  entity: Consultation;

  constructor(store: Store<IAppState>,
    public consultationSrv: ConsultationService,
    private activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, consultationSrv);
    this.pageData = {
      title: 'Détails - Consultation',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Consultations',
          route: '/'+this.orientation+'/consultation'
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
    this.title = 'Consultation - ' + this.entity?.id;
  }

  handlePostDelete() {
    this.location.back();
  }

}
