import { PathologieService } from './../../../parametrage/pathologie/pathologie.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { ConsultationService } from '../consultation.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { Consultation } from '../consultation';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Pathologie } from 'src/app/pages/parametrage/pathologie/pathologie';

@Component({
  selector: 'app-consultation-show',
  templateUrl: './consultation-show.component.html',
  styleUrls: ['./consultation-show.component.scss']
})
export class ConsultationShowComponent extends BasePageComponent<Consultation> implements OnInit, OnDestroy {
  entity: Consultation;
  isPathologieModalVisible = false;
  selectedPathologie: Pathologie;
  pathologies: Pathologie[] = [];

  constructor(store: Store<IAppState>,
              public consultationSrv: ConsultationService,
              public activatedRoute: ActivatedRoute,
              public location: Location,
              public pathologieSrv: PathologieService) {
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
          route: '/' + this.orientation + '/consultation'
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
    this.findPathologies();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
    this.title = 'Consultation n° ' + this.entity?.id;
  }

  handlePostDelete() {
    this.location.back();
  }

  closePathologieModal() {
    this.isPathologieModalVisible = false;
  }

  findPathologies() {
    this.pathologieSrv.findAll()
    .subscribe((data: any) => {
      this.pathologies = data;
    }, err => this.pathologieSrv.httpSrv.catchError(err));
  }

  setPathologieDiagnostiquee() {
    this.entity.pathologieDiagnostiquee = this.selectedPathologie.id;
    this.consultationSrv.update(this.entity)
    .subscribe((data: any) => {
      this.entity = data;
      this.closePathologieModal();
    }, err => this.consultationSrv.httpSrv.catchError(err));
  }

}
