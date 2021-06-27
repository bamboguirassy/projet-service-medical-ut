import { DossierService } from 'src/app/pages/gestionmedicale/dossier/dossier.service';
import { PathologieService } from './../../../parametrage/pathologie/pathologie.service';
import { Component, OnInit, OnDestroy, ViewChildren } from '@angular/core';
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
  selectedPathologies: Pathologie[] = [];
  pathologies: Pathologie[] = [];
  @ViewChildren('form') form;
  activated:Boolean;
  selectedTab = '';

  constructor(store: Store<IAppState>,
    public consultationSrv: ConsultationService,
    public activatedRoute: ActivatedRoute,
    public location: Location,
    public pathologieSrv: PathologieService,
    public dossierSrv: DossierService) {
    super(store, consultationSrv);
    this.pageData = {
      title: '',
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
          title: 'Affichage'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.findEntity(this.activatedRoute.snapshot.params.id);
    this.findPathologies();
    this.activated=true;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
    this.selectedPathologies=this.entity?.pathologies?.map(pathologie=>pathologie.id);
    this.title = 'Consultation n° ' + this.entity?.id;
    this.selectedTab = 'symptomes';
   
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
   let pathologiesIds=this.selectedPathologies;
    this.entity.pathologies=pathologiesIds;
    this.consultationSrv.update(this.entity)
      .subscribe((data: any) => {  
        this.entity = data;
        this.consultationSrv.httpSrv.toastr.success("Modification réussie")
        this.activated=true;
      }, err => this.consultationSrv.httpSrv.catchError(err));
  }

  loadTab(tabName: string) {
    setTimeout(()=>{
      this.selectedTab= tabName;
    });
  }

}
