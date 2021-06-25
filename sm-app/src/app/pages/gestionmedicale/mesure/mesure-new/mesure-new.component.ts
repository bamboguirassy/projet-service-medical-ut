import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren, Input } from '@angular/core';
import { MesureService } from '../mesure.service';
import { Mesure } from '../mesure';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mesure-new',
  templateUrl: './mesure-new.component.html',
  styleUrls: ['./mesure-new.component.scss']
})
export class MesureNewComponent implements OnInit {

  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  @ViewChildren('form') form;
  @Input()entity: Mesure;
  @Output() creation: EventEmitter<Mesure> = new EventEmitter();
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Input()isModalVisible;

  constructor(public mesureSrv: MesureService,
    public router: Router) {
    this.entity = new Mesure();
  }

  ngOnInit(): void {}

  save() {
    this.mesureSrv.create(this.entity)
      .subscribe((data: any) => {
        this.closeModal();
        this.creation.emit(data);
        this.entity = new Mesure();
      }, error => this.mesureSrv.httpSrv.catchError(error));
  }

  // open modal window
  openModal() {
    this.isModalVisible = true;
  }

  // close modal window
  closeModal() {
    this.close.emit(true);
    this.isModalVisible = false;
  }

}

