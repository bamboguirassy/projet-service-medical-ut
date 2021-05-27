import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren } from '@angular/core';
import { MedicamentRemisService } from '../medicamentremis.service';
import { MedicamentRemis } from '../medicamentremis';
import { Router } from '@angular/router';

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

  constructor(public medicamentRemiSrv: MedicamentRemisService,
    public router: Router) {
    this.entity = new MedicamentRemis();
  }

  ngOnInit(): void {}

  save() {
    this.medicamentRemiSrv.create(this.entity)
      .subscribe((data: any) => {
        this.closeModal();
        this.creation.emit(data);
        this.entity = new MedicamentRemis();
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

}

