import { BasePageComponent } from '../../../base-page/base-page.component';
import { IAppState } from './../../../../interfaces/app-state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { PathologieConsultationService } from '../pathologieconsultation.service';
import { PathologieConsultation } from '../pathologieconsultation';

@Component({
  selector: 'app-pathologieconsultation-list',
  templateUrl: './pathologieconsultation-list.component.html',
  styleUrls: ['./pathologieconsultation-list.component.scss']
})
export class PathologieConsultationListComponent extends BasePageComponent<PathologieConsultation> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public pathologieConsultationSrv: PathologieConsultationService) {
    super(store, pathologieConsultationSrv);

    this.pageData = {
      title: 'PathologieConsultation',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des pathologieconsultations'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.findAll();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostDelete() {
    this.findAll();
  }

  handlePostLoad(){}

}
