import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren } from '@angular/core';
import { InputationService } from '../inputation.service';
import { Inputation } from '../inputation';
import { Router } from '@angular/router';

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

  constructor(public inputationSrv: InputationService,
    public router: Router) {
    this.entity = new Inputation();
  }

  ngOnInit(): void {}

  save() {
    this.inputationSrv.create(this.entity)
      .subscribe((data: any) => {
        this.closeModal();
        this.creation.emit(data);
        this.entity = new Inputation();
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

}

