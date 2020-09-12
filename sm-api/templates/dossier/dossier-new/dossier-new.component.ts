import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren } from '@angular/core';
import { DossierService } from '../dossier.service';
import { Dossier } from '../dossier';
import { Router } from '@angular/router';

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

  constructor(public dossierSrv: DossierService,
    public router: Router) {
    this.entity = new Dossier();
  }

  ngOnInit(): void {}

  save() {
    this.dossierSrv.create(this.entity)
      .subscribe((data: any) => {
        this.closeModal();
        this.creation.emit(data);
        this.entity = new Dossier();
      }, error => this.dossierSrv.httpSrv.catchError(error));
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

