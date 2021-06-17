import { Component, OnInit, OnDestroy } from '@angular/core';
import { PathologieConsultation } from '../pathologieconsultation';
import { PathologieConsultationService } from '../pathologieconsultation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pathologieconsultation-edit',
  templateUrl: './pathologieconsultation-edit.component.html',
  styleUrls: ['./pathologieconsultation-edit.component.scss']
})
export class PathologieConsultationEditComponent extends BasePageComponent<PathologieConsultation> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public pathologieConsultationSrv: PathologieConsultationService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, pathologieConsultationSrv);
    this.pageData = {
      title: 'Modification - PathologieConsultation',
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
