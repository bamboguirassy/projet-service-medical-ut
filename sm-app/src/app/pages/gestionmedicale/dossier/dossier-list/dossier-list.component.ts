import { TCModalService } from './../../../../ui/services/modal/modal.service';
import Swal from 'sweetalert2';
import { Content } from './../../../../ui/interfaces/modal';
import { Router } from '@angular/router';
import { GRHServiceService } from './../../../../shared/services/grhservice.service';
import { BasePageComponent } from '../../../base-page/base-page.component';
import { IAppState } from './../../../../interfaces/app-state';
import { Component, OnInit, OnDestroy, Input, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { DossierService } from '../dossier.service';
import { Dossier } from '../dossier';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-dossier-list',
  templateUrl: './dossier-list.component.html',
  styleUrls: ['./dossier-list.component.scss']
})
export class DossierListComponent extends BasePageComponent<Dossier> implements OnInit, OnDestroy {
  item: any;
  isModalVisible: boolean;
  visible = false;
  selectedDossiers: Dossier[];
  echecSendEmails: Dossier[];
  echecLength: number;
  isAllSelected = false;
  isPartialSelection = false;
  emailEditor = ClassicEditor;
  emailEditionModel = {
    body: '',
    object: ''
  };
  config = {
    language: 'fr'
  };

  @ViewChild('corps', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('pied', { static: true }) modalFooter: ElementRef<any>;

  constructor(store: Store<IAppState>, public router: Router,
    private modal: TCModalService,
    public dossierSrv: DossierService, public grhSrv: GRHServiceService) {
    super(store, dossierSrv);

    this.pageData = {
      title: 'Liste des dossiers médicaux',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des dossiers médicaux'
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

  onCreate() {
    this.findAll();
  }
  isAllCheckt() {
    return this.items.every(element => element.selected);
  }

  getSelectedDossiers() {
    return this.items.filter(item => item.selected);
  }

  toogleSendEmailModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, options: any = null) {
    this.selectedDossiers = this.getSelectedDossiers();
    if (!this.selectedDossiers.length) {
      Swal.fire('Vous devez d\'abord sélectionner les dossiers dont vous voulez envoyer le mail');
      return;
    }
    this.modal.open({
      body,
      header,
      footer,
      options
    });
  }

  sendEmaillToSelectedDossiers() {
    if (this.emailEditionModel.object.length === 0 || this.emailEditionModel.body.length === 0) {
      this.dossierSrv.toastr.error('Vérifier si vous avez donné l\'objet et le contenu');
      return;
    }
    const dossiersId = this.selectedDossiers.map(val => val.id);
    this.dossierSrv.sendEmail(dossiersId, this.emailEditionModel.object, this.emailEditionModel.body)
      .subscribe(
        (data: any) => {
          this.handlePostLoad();
          this.echecSendEmails = data[1];
          if (this.echecSendEmails.length) {
            this.visible = true;
          }
          if (!this.echecSendEmails.length) {
            this.dossierSrv.toastr.success('Email Envoyé avec succès');
          }
          this.closeModal();
          this.emailEditionModel = { body: '', object: '' };
          this.changeAllSelectionState(false);
          this.isAllSelected = false;
          this.isPartialSelection = false;
        },
        error => this.dossierSrv.httpSrv.catchError(error));
  }

  closeModal() {
    this.modal.close();
  }

  changeAllSelectionStateLink() {
    this.isAllSelected = !this.isAllCheckt();
    this.changeAllSelectionState(this.isAllSelected);
    this.isPartialSelection = false;
  }

  changeAllSelectionState(state = false) {
    this.items.forEach(element => {
      element.selected = state;
    });
  }

  onItemsSelectionStateChange() {
    setTimeout(() => {
      this.isAllSelected = this.isAllCheckt();
      this.isPartialSelection = this.items.some(element => element.selected) && this.items.some(element => !(element.selected));
    }, 1);
  }

}
