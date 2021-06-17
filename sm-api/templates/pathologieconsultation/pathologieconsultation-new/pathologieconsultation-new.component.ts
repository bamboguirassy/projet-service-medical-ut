import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren } from '@angular/core';
import { PathologieConsultationService } from '../pathologieconsultation.service';
import { PathologieConsultation } from '../pathologieconsultation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pathologieconsultation-new',
  templateUrl: './pathologieconsultation-new.component.html',
  styleUrls: ['./pathologieconsultation-new.component.scss']
})
export class PathologieConsultationNewComponent implements OnInit {

  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  @ViewChildren('form') form;
  entity: PathologieConsultation;
  @Output() creation: EventEmitter<PathologieConsultation> = new EventEmitter();
  isModalVisible = false;

  constructor(public pathologieConsultationSrv: PathologieConsultationService,
    public router: Router) {
    this.entity = new PathologieConsultation();
  }

  ngOnInit(): void {}

  save() {
    this.pathologieConsultationSrv.create(this.entity)
      .subscribe((data: any) => {
        this.closeModal();
        this.creation.emit(data);
        this.entity = new PathologieConsultation();
      }, error => this.pathologieConsultationSrv.httpSrv.catchError(error));
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

