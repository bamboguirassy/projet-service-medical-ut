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
    { value: 'tabac', label: 'Tabac' },
    { value: 'alcool', label: 'Alcool' },
    { value: 'autres', label: 'Autres' },
  ];
  niveauInstructions = [
    { value: 'non scolarisee', label: 'Non Scolarisée' },
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

  constructor(public dossierSrv: DossierService,
              public router: Router, public datePipe: DatePipe) {
    this.entity = new Dossier();
    this.entity.etat = true;
  }

  ngOnInit(): void {
    this.getStructures();
  }

  save() {
    this.entity.dateNaissance = this.datePipe.transform(this.entity.dateNaissance, 'yyyy-MM-dd');
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
  }

}

