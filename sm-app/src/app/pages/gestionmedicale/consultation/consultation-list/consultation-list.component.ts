import { PathologieService } from './../../../parametrage/pathologie/pathologie.service';
import { DocteurService } from './../../../parametrage/docteur/docteur.service';
import { BasePageComponent } from '../../../base-page/base-page.component';
import { IAppState } from './../../../../interfaces/app-state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConsultationService } from '../consultation.service';
import { Consultation } from '../consultation';
import { Docteur } from 'src/app/pages/parametrage/docteur/docteur';
import { Pathologie } from 'src/app/pages/parametrage/pathologie/pathologie';

@Component({
  selector: 'app-consultation-list',
  templateUrl: './consultation-list.component.html',
  styleUrls: ['./consultation-list.component.scss']
})
export class ConsultationListComponent extends BasePageComponent<Consultation> implements OnInit, OnDestroy {


  constructor(store: Store<IAppState>,
    public consultationSrv: ConsultationService) {
    super(store, consultationSrv);

    this.pageData = {
      title: 'Consultation',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des consultations'
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

  handlePostLoad() { }

}
