import { Component, OnInit, OnDestroy, Input, ElementRef, EventEmitter, Output, ViewChild, ViewChildren } from '@angular/core';
import { RendezVous } from '../rendezvous';
import { RendezVousService } from '../rendezvous.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rendezvous-edit',
  templateUrl: './rendezvous-edit.component.html',
  styleUrls: ['./rendezvous-edit.component.scss']
})
export class RendezVousEditComponent implements OnInit {

  @Input() visible = false;
  @Input() entity: RendezVous;

  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  @ViewChildren('form') form;
  @Output() update: EventEmitter<RendezVous> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();


  // @Input() dossier: Dossier;
  constructor(public rendezVousSrv: RendezVousService,
    public datePipe: DatePipe) {
  }

  ngOnInit(): void { }

  updateItem() {
    this.entity.dateRendezVous = this.datePipe.transform(this.entity.dateRendezVous, 'yyyy-MM-dd');
    this.rendezVousSrv.update(this.entity)
      .subscribe((data: any) => {
        this.update.emit(data);
      });
  }

  // close modal window
  closeModal() {
    this.close.emit();
  }

}
