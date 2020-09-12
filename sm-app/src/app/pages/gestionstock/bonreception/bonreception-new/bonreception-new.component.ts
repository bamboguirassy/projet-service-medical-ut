import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren } from '@angular/core';
import { BonReceptionService } from '../bonreception.service';
import { BonReception } from '../bonreception';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bonreception-new',
  templateUrl: './bonreception-new.component.html',
  styleUrls: ['./bonreception-new.component.scss']
})
export class BonReceptionNewComponent implements OnInit {

  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  @ViewChildren('form') form;
  entity: BonReception;
  @Output() creation: EventEmitter<BonReception> = new EventEmitter();
  isModalVisible = false;

  constructor(public bonReceptionSrv: BonReceptionService,
    public router: Router, private datePipe: DatePipe) {
    this.entity = new BonReception();
  }

  ngOnInit(): void {}

  save() {
    this.entity.date = this.datePipe.transform(this.entity.date,'yyyy-MM-dd');
    this.bonReceptionSrv.create(this.entity)
      .subscribe((data: any) => {
        this.closeModal();
        this.creation.emit(data);
        this.entity = new BonReception();
      }, error => this.bonReceptionSrv.httpSrv.catchError(error));
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

