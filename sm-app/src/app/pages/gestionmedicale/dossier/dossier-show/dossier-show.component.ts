import { Component, OnInit,ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { DossierService } from '../dossier.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { Dossier } from '../dossier';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-dossier-show',
  templateUrl: './dossier-show.component.html',
  styleUrls: ['./dossier-show.component.scss']
})
export class DossierShowComponent extends BasePageComponent<Dossier> implements OnInit, OnDestroy {
  entity: Dossier;
  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  isModalVisible = false;
  editor = ClassicEditor;
  selectedTab = '';
  public email= {
      object: '',
      message: ''
    };

  constructor(store: Store<IAppState>,
    public dossierSrv: DossierService,
    public activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, dossierSrv);
    this.pageData = {
      title: '',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des dossiers médicaux',
          route: '/'+this.orientation+'/dossier'
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
    this.title = 'Dossier Médical - ' + this.entity?.numero;
    this.selectedTab = 'consultations';
  }

  handlePostDelete() {
    this.location.back();
  }
  // open modal window
  openModal() {
    setTimeout(() => {
      this.isModalVisible = true;
    }, 0);
  }

  // close modal window
  closeModal() {
    setTimeout(() => {
      this.isModalVisible = false;
    }, 0);
  }
  sendSingleEmail(){
    if(this.email.object.length==0 || this.email.message.length==0){
      this.dossierSrv.toastr.error('Verifier vos champs');
      return;
    }
    this.dossierSrv.sendEmail([this.entity.id],this.email.object,this.email.message)
    .subscribe(
      (data: any) => {
        this.dossierSrv.toastr.success('Email Envoyé avec succès')
        this.closeModal(); 
        this.email.object=""
        this.email.message=""
      },
      error => this.dossierSrv.httpSrv.catchError(error))

  }

  loadTab(tabName: string) {
    setTimeout(()=>{
      this.selectedTab= tabName;
    });
  }
    

}
