import { MedicamentService } from './../../../gestionstock/medicament/medicament.service';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren, Input } from '@angular/core';
import { MedicamentRemisService } from '../medicamentremis.service';
import { MedicamentRemis } from '../medicamentremis';
import { Router } from '@angular/router';
import { Medicament } from 'src/app/pages/gestionstock/medicament/medicament';
import { Consultation } from '../../consultation/consultation';

@Component({
  selector: 'app-medicamentremis-new',
  templateUrl: './medicamentremis-new.component.html',
  styleUrls: ['./medicamentremis-new.component.scss']
})
export class MedicamentRemisNewComponent implements OnInit {

  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  @ViewChildren('form') form;
  entity: MedicamentRemis;
  @Output() creation: EventEmitter<MedicamentRemis> = new EventEmitter();
  isModalVisible = false;
  medicaments: Medicament[] = [];
  selectedMedicament: Medicament;
  @Input() consultation: Consultation;

  constructor(public medicamentRemiSrv: MedicamentRemisService,
    public router: Router, public medicamentSrv: MedicamentService) {
    this.entity = new MedicamentRemis();
  }

  ngOnInit(): void {
    this.findMedicaments();
  }

  save() {
    this.entity.consultation = this.consultation.id;
    this.entity.medicament = this.selectedMedicament.id;
    this.medicamentRemiSrv.create(this.entity)
      .subscribe((data: any) => {
        this.creation.emit(data);
        this.findMedicaments();
        this.entity = new MedicamentRemis();
        this.selectedMedicament = null;
      }, error => this.medicamentRemiSrv.httpSrv.catchError(error));
  }

  // open modal window
  openModal() {
    this.isModalVisible = true;
  }

  // close modal window
  closeModal() {
    this.isModalVisible = false;
  }

  findMedicaments() {
    this.medicamentSrv.findAll()
    .subscribe((data: any)=>{
      this.medicaments = data;
    },err=>this.medicamentSrv.httpSrv.catchError(err));
  }

}

