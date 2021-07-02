import { DocteurService } from './../../../parametrage/docteur/docteur.service';
import { Docteur } from './../../../parametrage/docteur/docteur';
import { Dossier } from './../../dossier/dossier';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren, Input } from '@angular/core';
import { ReposMedicalService } from '../reposmedical.service';
import { ReposMedical } from '../reposmedical';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reposmedical-new',
  templateUrl: './reposmedical-new.component.html',
  styleUrls: ['./reposmedical-new.component.scss']
})
export class ReposMedicalNewComponent implements OnInit {

  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  @ViewChildren('form') form;
  entity: ReposMedical;
  @Output() creation: EventEmitter<ReposMedical> = new EventEmitter();
  isModalVisible = false;
  @Input() dossier: Dossier;
  docteurs: Docteur[] = [];
  selectedDocteur: Docteur;

  constructor(public reposMedicalSrv: ReposMedicalService, public datePipe: DatePipe,
    public docteurSrv: DocteurService) {
    this.entity = new ReposMedical();
    this.entity.date = new Date();
  }

  ngOnInit(): void {
    this.findDocteurs();
  }

  save() {
    this.entity.docteur = this.selectedDocteur.id;
    this.entity.dossier = this.dossier.id;
    this.entity.date = this.datePipe.transform(this.entity.date, 'yyyy-MM-dd');
    this.reposMedicalSrv.create(this.entity)
      .subscribe((data: any) => {
        this.closeModal();
        this.creation.emit(data);
        this.entity = new ReposMedical();
        this.entity.date = new Date();
      }, error => this.reposMedicalSrv.httpSrv.catchError(error));
  }

  // open modal window
  openModal() {
    this.isModalVisible = true;
  }

  // close modal window
  closeModal() {
    this.isModalVisible = false;
  }

  findDocteurs() {
    this.docteurSrv.findAll()
      .subscribe((data: any) => { 
        this.docteurs = data
        this.selectedDocteur=this.docteurs[0];
       },
        err => this.docteurSrv.httpSrv.catchError(err));
  }

}

