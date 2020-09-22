import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren } from '@angular/core';
import { MedicamentReceptionService } from '../medicamentreception.service';
import { MedicamentReception } from '../medicamentreception';
import { Router } from '@angular/router';

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

  constructor(public medicamentReceptionSrv: MedicamentReceptionService,
    public router: Router) {
    this.entity = new MedicamentReception();
  }

  ngOnInit(): void {}

  save() {
    this.medicamentReceptionSrv.create(this.entity)
      .subscribe((data: any) => {
        this.closeModal();
        this.creation.emit(data);
        this.entity = new MedicamentReception();
      }, error => this.medicamentReceptionSrv.httpSrv.catchError(error));
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

