import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren, Input } from '@angular/core';
import { RendezVousService } from '../rendezvous.service';
import { RendezVous } from '../rendezvous';
import { Router } from '@angular/router';
import { Dossier } from '../../dossier/dossier';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-rendezvous-new',
  templateUrl: './rendezvous-new.component.html',
  styleUrls: ['./rendezvous-new.component.scss']
})
export class RendezVousNewComponent implements OnInit {
  Non
  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  @ViewChildren('form') form;
  entity: RendezVous;
  @Output() creation: EventEmitter<RendezVous> = new EventEmitter();
  isModalVisible = false;
  @Input() dossier:Dossier;
  
  selectedOpt: string;
 
  // @Input() dossier: Dossier;
  constructor(public rendezVousSrv: RendezVousService,
    public router: Router, public datePipe:DatePipe) {
    this.entity = new RendezVous();
  }

  ngOnInit(): void {}

  save() {
    this.entity.dossier = this.dossier.id;
    if(this.selectedOpt) {
      this.entity.presence = this.selectedOpt;
    }
    this.entity.dateRendezVous = this.datePipe.transform(this.entity.dateRendezVous,'yyyy-MM-dd');
    this.entity.dateCreation = this.datePipe.transform(new Date(),'yyyy-MM-dd');
    this.rendezVousSrv.create(this.entity)
      .subscribe((data: any) => {
        this.closeModal();
        this.creation.emit(data);
        this.entity = new RendezVous();
      }, error => this.rendezVousSrv.httpSrv.catchError(error));
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

