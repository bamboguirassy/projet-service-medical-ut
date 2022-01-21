import { GRHServiceService } from './../../../../shared/services/grhservice.service';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren } from '@angular/core';
import { DossierService } from '../dossier.service';
import { Dossier } from '../dossier';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dossier-new',
  templateUrl: './dossier-new.component.html',
  styleUrls: ['./dossier-new.component.scss']
})
export class DossierNewComponent implements OnInit {

  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  @ViewChildren('form') form;
  entity: Dossier;
  @Output() creation: EventEmitter<Dossier> = new EventEmitter();
  isModalVisible = false;
  structures: string[] = [];
  situationMatrimoniales = [
    { value: 'mariee', label: 'Mariée' },
    { value: 'celibataire', label: 'Célibataire' },
    { value: 'veuve', label: 'Veuve' },
    { value: 'divorcee', label: 'Divorcée' },
    { value: 'separee', label: 'Séparée' },
  ];
  genreVies = [
    { value: 'Tabac', label: 'Tabac' },
    { value: 'Alcool', label: 'Alcool' },
    { value: 'autres', label: 'Autres' },
  ];
  sources = [
    { value: 'GRH', label: 'GRH' },
    { value: 'MANUEL', label: 'Ajout Manuel' },
  ];
  niveauInstructions = [
    { value: 'Non scolarisé', label: 'Non Scolarisé' },
    { value: 'primaire', label: 'Primaire' },
    { value: 'secondaire', label: 'Secondaire' },
    { value: 'superieur', label: 'Supérieur' },
  ];
  professionMaris = [
    { value: 'sans', label: 'Sans' },
    { value: 'cultivateur', label: 'Cultivateur' },
    { value: 'salarie', label: 'Salarié' },
    { value: 'compte propre', label: 'Travail à son compte propre' },
    { value: 'autres', label: 'Autres' },
  ];
  item: any;
  selected = false;
  selectedTypePatient: string;
  selectedFamille: any;
  selectedEmploye: any;

  constructor(public dossierSrv: DossierService,
    public router: Router, public datePipe: DatePipe,
    public grhSrv: GRHServiceService) {
    this.entity = new Dossier();
    this.entity.etat = true;
  }

  ngOnInit(): void {
    this.getStructures();
  }

  save() {
    if (this.entity.source == 'GRH') {
      if (this.selectedTypePatient == "TRAVAILLEUR") {
        this.entity.prenoms = this.item?.employe.prenoms;
        this.entity.nom = this.item?.employe.nom;
        this.entity.dateNaissance = this.item?.employe.dateNaissance;
        this.entity.genre = this.item?.employe.genre;
        this.entity.cni = this.item?.employe.cni;
        this.entity.matricule = this.item?.employe.matricule;
        this.entity.structure = this.item?.employe.structure.code;
        this.entity.situationMatrimoniale = this.item?.employe.situtationMatrimoniale;
        this.entity.telephone = this.item?.employe.telephonePrimaire;
        this.entity.typePatient = this.item?.employe.typeEmploye.code;
      }
      if (this.selectedTypePatient == "FAMILLE") {
        this.entity.prenoms = this.selectedFamille?.prenoms;
        this.entity.nom = this.selectedFamille?.nom;
        this.entity.dateNaissance = this.selectedFamille?.dateNaissance;
        this.entity.genre = this.selectedFamille?.genre;
        this.entity.lienParente = this.selectedFamille?.lienParente;
        this.entity.structure = this.selectedFamille?.employe.structure.code;
        this.entity.prenomTravailleur = this.selectedFamille?.employe.prenoms;
        this.entity.nomTravailleur = this.selectedFamille?.employe.nom;
        this.entity.matricule = this.selectedFamille?.employe.matricule;
        this.entity.telephone = this.selectedFamille?.telephone;

      }
    }
    if (this.entity.typePatient == "ETUDIANT") {
      this.entity.niveauInstruction = 'superieur';
      this.entity.dateNaissance = this.datePipe.transform(this.entity.dateNaissance, 'yyyy-MM-dd');
    }
    if (this.entity.dateMariage) {
      this.entity.dateMariage = this.datePipe.transform(this.entity.dateMariage, 'yyyy-MM-dd');
    }
    if (this.entity.dateNaissance && (this.entity.typePatient == 'AUTRES' || this.entity.source == 'MANUEL')) {
      this.entity.typePatient = this.selectedTypePatient;
      this.entity.dateNaissance = this.datePipe.transform(this.entity.dateNaissance, 'yyyy-MM-dd');
    }
    this.dossierSrv.create(this.entity)
      .subscribe((data: any) => {
        this.closeModal();
        this.creation.emit(data);
        this.entity = new Dossier();
        this.entity.etat = true;
      }, error => this.dossierSrv.httpSrv.catchError(error));
  }

  getStructures() {
    this.dossierSrv.httpSrv.http.get('assets/data/structures.json')
      .pipe(first())
      .subscribe((data: any) => {
        this.structures = data;
      });
  }

  // open modal window
  openModal() {
    this.isModalVisible = true;
  }

  // close modal window
  closeModal() {
    this.isModalVisible = false;
    this.selectedFamille = null;
    this.selected = false;
    this.selectedTypePatient = null;
    this.item = null;
    this.entity.typePatient = null;
    this.entity.matricule = null;

  }

  findEmploye(matricule) {
    this.grhSrv.findWithMemberFamily(matricule, this.grhSrv.grhPassword)
      .subscribe((data: any) => {
        this.item = data;
      }, err => this.dossierSrv.httpSrv.catchError(err));
  }

  createDossierTravailleur(item) {
    this.selectedTypePatient = "TRAVAILLEUR";
    this.selectedEmploye = item;
    this.selected = true;
    this.selectedFamille = null;
    this.entity.emailPatient = this.item?.employe?.email ?? this.item?.employe?.emailUniv;

  }

  createDossierFamille(item) {
    this.selectedFamille = item;
    this.selectedTypePatient = "FAMILLE";
    this.entity.typePatient = "FAMILLE";
    this.selected = true;
    this.selectedEmploye = null;
    this.entity.emailPatient = '';
  }

}

