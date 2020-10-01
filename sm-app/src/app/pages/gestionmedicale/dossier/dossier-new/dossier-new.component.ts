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

  constructor(public dossierSrv: DossierService,
    public router: Router, public datePipe: DatePipe) {
    this.entity = new Dossier();
    this.entity.etat = true;
  }

  ngOnInit(): void {
    this.getStructures();
  }

  save() {
    this.entity.dateNaissance = this.datePipe.transform(this.entity.dateNaissance,'yyyy-MM-dd');
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
    .subscribe((data: any)=>{
      this.structures = data;
    })
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

