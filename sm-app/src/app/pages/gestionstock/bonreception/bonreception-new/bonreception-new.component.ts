import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren } from '@angular/core';
import { BonReceptionService } from '../bonreception.service';
import { BonReception } from '../bonreception';
import { MedicamentService } from '../../medicament/medicament.service';
import { MedicamentReceptionService } from '../../medicamentreception/medicamentreception.service';
import { MedicamentReception } from '../../medicamentreception/medicamentreception';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Medicament } from '../../medicament/medicament';

@Component({
  selector: 'app-bonreception-new',
  templateUrl: './bonreception-new.component.html',
  styleUrls: ['./bonreception-new.component.scss']
})
export class BonReceptionNewComponent implements OnInit {

  selectedMedicaments: Medicament[] = [];
  medicaments: Medicament[] = [];
  suivant = false;
  medicamentReceptions: MedicamentReception[] = [];

  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  @ViewChildren('form') form;
  entity: BonReception;
  @Output() creation: EventEmitter<BonReception> = new EventEmitter();
  isModalVisible = false;

  constructor(public bonReceptionSrv: BonReceptionService,
    public medicamentSrv: MedicamentService,
    public medicamentReceptionSrv: MedicamentReceptionService,
    public router: Router, private datePipe: DatePipe) {
    this.entity = new BonReception();
  }

  ngOnInit(): void {
    this.findMedicaments();
  }

  findMedicaments() {
    this.medicamentSrv.findAll()
      .subscribe((data: any) => {
        this.medicaments = data;
      }, error => this.medicamentSrv.httpSrv.catchError(error));
  }
  handlePostLoad() {
    this.entity.medocs = this.selectedMedicaments;
  }
  save() {
    this.entity.date = this.datePipe.transform(this.entity.date, 'yyyy-MM-dd');
    this.medicamentReceptions.forEach(medicamentReception => {
      medicamentReception.medicament = medicamentReception.medicamentSelectionne.id;
    });
    this.bonReceptionSrv.save(this.entity, this.medicamentReceptions)
      .subscribe((data: any) => {
        this.closeModal();
        this.creation.emit(data);
        this.selectedMedicaments = [];
        this.entity = new BonReception();
        this.suivant = false;
      }, error => this.bonReceptionSrv.httpSrv.catchError(error));
  }

  // open modal window
  openModal() {
    this.isModalVisible = true;
  }

  // close modal window
  closeModal() {
    this.isModalVisible = false;
    this.suivant = false;
  }

  afficheMedicaments() {
    this.suivant = true;
    this.medicamentReceptions = [];
    this.selectedMedicaments.forEach(medicament => {
      let medicamentReception = new MedicamentReception();
      medicamentReception.medicamentSelectionne = medicament;
      this.medicamentReceptions.push(medicamentReception);
    });
  }

}

