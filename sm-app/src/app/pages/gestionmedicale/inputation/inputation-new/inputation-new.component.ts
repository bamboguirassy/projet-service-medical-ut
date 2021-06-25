import { StructurePartenaireService } from './../../../parametrage/structurepartenaire/structurepartenaire.service';
import { StructurePartenaire } from './../../../parametrage/structurepartenaire/structurepartenaire';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren, Input } from '@angular/core';
import { InputationService } from '../inputation.service';
import { Inputation } from '../inputation';
import { Router } from '@angular/router';
import { Dossier } from '../../dossier/dossier';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inputation-new',
  templateUrl: './inputation-new.component.html',
  styleUrls: ['./inputation-new.component.scss']
})
export class InputationNewComponent implements OnInit {

  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  @ViewChildren('form') form;
  entity: Inputation;
  @Output() creation: EventEmitter<Inputation> = new EventEmitter();
  isModalVisible = false;
  @Input() dossier: Dossier;
  selectedStructurePartenaire: StructurePartenaire;
  structurePartenaires: StructurePartenaire[] = [];

  constructor(public inputationSrv: InputationService,
    public router: Router, public datePipe: DatePipe,
    public structurePartenaireSrv: StructurePartenaireService) {
    this.entity = new Inputation();
    this.entity.date = new Date();
  }

  ngOnInit(): void {
    this.findStructurePartenaires();
  }

  save() {
    this.entity.structureHospitaliere = this.selectedStructurePartenaire.id;
    this.entity.dossier = this.dossier.id;
    this.entity.date = this.datePipe.transform(this.entity.date, ('yyyy-MM-dd'));
    this.inputationSrv.create(this.entity)
      .subscribe((data: any) => {
        this.closeModal();
        this.creation.emit(data);
        this.entity = new Inputation();
        this.entity.date = new Date();
      }, error => this.inputationSrv.httpSrv.catchError(error));
  }

  // open modal window
  openModal() {
    this.isModalVisible = true;
  }

  // close modal window
  closeModal() {
    this.isModalVisible = false;
  }

  findStructurePartenaires() {
    this.structurePartenaireSrv.findAll()
      .subscribe((data: any) => {
        this.structurePartenaires = data;
      }, err => this.structurePartenaireSrv.httpSrv.catchError(err));
  }

}

