import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { PathologieConsultationService } from '../pathologieconsultation.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { PathologieConsultation } from '../pathologieconsultation';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pathologieconsultation-show',
  templateUrl: './pathologieconsultation-show.component.html',
  styleUrls: ['./pathologieconsultation-show.component.scss']
})
export class PathologieConsultationShowComponent extends BasePageComponent<PathologieConsultation> implements OnInit, OnDestroy {
  entity: PathologieConsultation;

  constructor(store: Store<IAppState>,
    public pathologieConsultationSrv: PathologieConsultationService,
    private activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, pathologieConsultationSrv);
    this.pageData = {
      title: 'Détails - PathologieConsultation',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'PathologieConsultations',
          route: '/'+this.orientation+'/pathologieconsultation'
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
    this.title = 'PathologieConsultation - ' + this.entity?.id;
  }

  handlePostDelete() {
    this.location.back();
  }

}
