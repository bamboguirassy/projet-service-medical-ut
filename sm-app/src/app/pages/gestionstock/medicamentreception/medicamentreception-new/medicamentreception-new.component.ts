import { BonReception } from './../../bonreception/bonreception';
import { Medicament } from 'src/app/pages/gestionstock/medicament/medicament';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren, Input } from '@angular/core';
import { MedicamentReceptionService } from '../medicamentreception.service';
import { MedicamentReception } from '../medicamentreception';
import { Router } from '@angular/router';
import { MedicamentService } from '../../medicament/medicament.service';

@Component({
  selector: 'app-medicamentreception-new',
  templateUrl: './medicamentreception-new.component.html',
  styleUrls: ['./medicamentreception-new.component.scss']
})
export class MedicamentReceptionNewComponent implements OnInit {

  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  @ViewChildren('form') form;
  entity: MedicamentReception;
  @Output() creation: EventEmitter<MedicamentReception> = new EventEmitter();
  isModalVisible = false;
  medicaments: Medicament[] = [];
  medicamentReceptions: MedicamentReception[] = [];
  medicamentReceptionIds: number[] = [];
  selectedMedicament: Medicament;
  @Input() bonReception: BonReception;


  constructor(public medicamentReceptionSrv: MedicamentReceptionService,
    public medicamentSrv: MedicamentService,
    public router: Router) {
    this.entity = new MedicamentReception();
  }

  ngOnInit(): void {
    this.findMedicaments();
    this.findMedicamentReceptions();

  }
  handlePostLoad() {
  }

  save() {
    this.entity.bonReception = this.bonReception.id;
    this.entity.medicamentSelectionne = this.selectedMedicament;
    this.entity.medicament = this.entity.medicamentSelectionne.id
    this.medicamentReceptionSrv.create(this.entity)
      .subscribe((data: any) => {
        this.closeModal();
        this.creation.emit(data);
        this.entity = new MedicamentReception();
        this.selectedMedicament = null;
      }, error => this.medicamentReceptionSrv.httpSrv.catchError(error));
  }

  findMedicamentReceptions() {
    this.medicamentReceptionSrv.findByBonReception(this.bonReception)
      .subscribe((data: any) => {
        this.medicamentReceptions = data
      }, error => this.medicamentSrv.httpSrv.catchError(error));
  }
  
  findMedicaments() {
    this.medicamentSrv.findAll()
      .subscribe((data: any) => {
        this.medicaments = data;
      }, error => this.medicamentSrv.httpSrv.catchError(error));
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

