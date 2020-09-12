import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren } from '@angular/core';
import { DocteurService } from '../docteur.service';
import { Docteur } from '../docteur';
import { Router } from '@angular/router';

@Component({
  selector: 'app-docteur-new',
  templateUrl: './docteur-new.component.html',
  styleUrls: ['./docteur-new.component.scss']
})
export class DocteurNewComponent implements OnInit {

  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  @ViewChildren('form') form;
  entity: Docteur;
  @Output() creation: EventEmitter<Docteur> = new EventEmitter();
  isModalVisible = false;

  constructor(public docteurSrv: DocteurService,
    public router: Router) {
    this.entity = new Docteur();
  }

  ngOnInit(): void {}

  save() {
    this.docteurSrv.create(this.entity)
      .subscribe((data: any) => {
        this.closeModal();
        this.creation.emit(data);
        this.entity = new Docteur();
      }, error => this.docteurSrv.httpSrv.catchError(error));
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

