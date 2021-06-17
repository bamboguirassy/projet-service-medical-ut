import { Dossier } from './../../dossier/dossier';
import { DocteurService } from './../../../parametrage/docteur/docteur.service';
import { Component, OnInit, ViewChild, ElementRef, ViewChildren, Input } from '@angular/core';
import { ConsultationService } from '../consultation.service';
import { Consultation } from '../consultation';
import { Router } from '@angular/router';
import { Docteur } from 'src/app/pages/parametrage/docteur/docteur';
import { Pathologie } from 'src/app/pages/parametrage/pathologie/pathologie';
import { PathologieService } from 'src/app/pages/parametrage/pathologie/pathologie.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-consultation-new',
  templateUrl: './consultation-new.component.html',
  styleUrls: ['./consultation-new.component.scss']
})
export class ConsultationNewComponent implements OnInit {

  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  @ViewChildren('form') form;
  entity: Consultation;
  isModalVisible = false;
  @Input() dossier: Dossier;

  docteurs: Docteur[] = [];
  pathologies: Pathologie[] = [];
  selectedDocteur: Docteur;
  selectedPathologie: Pathologie;

  constructor(public consultationSrv: ConsultationService,
    public router: Router,
    public docteurSrv: DocteurService,
    public pathologieSrv: PathologieService,
    public datePipe: DatePipe) {
    this.entity = new Consultation();
    this.entity.date = new Date();
  }

  ngOnInit(): void {
    this.findPathologies();
    this.findDocteurs();
  }

  save() {
    this.entity.dossier = this.dossier.id;
    this.entity.docteur = this.selectedDocteur.id;
    if (this.selectedPathologie) {
      this.entity.pathologies = this.selectedPathologie.id;
    }
    this.entity.date = this.datePipe.transform(this.entity.date, 'yyyy-MM-dd');
    this.consultationSrv.create(this.entity)
      .subscribe((data: any) => {
        this.closeModal();
        this.entity = new Consultation();
        this.entity.date = new Date();
        this.consultationSrv.httpSrv.router.navigate(['/horizontal', this.consultationSrv.getRoutePrefixWithoutSlash(), data.id]);
      }, error => this.consultationSrv.httpSrv.catchError(error));
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
      .subscribe((data: any) => { this.docteurs = data; },
        err => this.docteurSrv.httpSrv.catchError(err));

  }

  findPathologies() {
    this.pathologieSrv.findAll()
      .subscribe((data: any) => { this.pathologies = data; },
        err => this.pathologieSrv.httpSrv.catchError(err));
  }

}

