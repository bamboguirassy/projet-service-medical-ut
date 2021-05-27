import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren } from '@angular/core';
import { ConsultationService } from '../consultation.service';
import { Consultation } from '../consultation';
import { Router } from '@angular/router';

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
  @Output() creation: EventEmitter<Consultation> = new EventEmitter();
  isModalVisible = false;

  constructor(public consultationSrv: ConsultationService,
    public router: Router) {
    this.entity = new Consultation();
  }

  ngOnInit(): void {}

  save() {
    this.consultationSrv.create(this.entity)
      .subscribe((data: any) => {
        this.closeModal();
        this.creation.emit(data);
        this.entity = new Consultation();
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

}

