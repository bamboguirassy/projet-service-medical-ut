import { Consultation } from './../../consultation/consultation';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren, Input } from '@angular/core';
import { SymptomeService } from '../symptome.service';
import { Symptome } from '../symptome';
import { Router } from '@angular/router';

@Component({
  selector: 'app-symptome-new',
  templateUrl: './symptome-new.component.html',
  styleUrls: ['./symptome-new.component.scss']
})
export class SymptomeNewComponent implements OnInit {

  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  @ViewChildren('form') form;
  entity: Symptome;
  @Output() creation: EventEmitter<Symptome> = new EventEmitter();
  isModalVisible = false;
  @Input() consultation: Consultation;

  constructor(public symptomeSrv: SymptomeService,
    public router: Router) {
    this.entity = new Symptome();
  }

  ngOnInit(): void {}

  save() {
    this.entity.consultation = this.consultation.id;
    this.symptomeSrv.create(this.entity)
      .subscribe((data: any) => {
        this.closeModal();
        this.creation.emit(data);
        this.entity = new Symptome();
      }, error => this.symptomeSrv.httpSrv.catchError(error));
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

