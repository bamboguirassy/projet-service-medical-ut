import { Component, OnInit, Input, ElementRef, EventEmitter, Output, ViewChild, ViewChildren } from '@angular/core';
import { ReposMedical } from '../reposmedical';
import { ReposMedicalService } from '../reposmedical.service';
import { DatePipe } from '@angular/common';
import { Docteur } from 'src/app/pages/parametrage/docteur/docteur';
import { DocteurService } from 'src/app/pages/parametrage/docteur/docteur.service';

@Component({
  selector: 'app-reposmedical-edit',
  templateUrl: './reposmedical-edit.component.html',
  styleUrls: ['./reposmedical-edit.component.scss']
})
export class ReposMedicalEditComponent implements OnInit {

  @Input() visible = false;
  @Input() entity: ReposMedical;

  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  @ViewChildren('form') form;
  @Output() update: EventEmitter<ReposMedical> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();

  docteurs: Docteur[] = [];
  selectedDocteurId: any;

  constructor(public reposMedicalSrv: ReposMedicalService,
    public datePipe: DatePipe,
    public docteurSrv: DocteurService) { }

  ngOnInit(): void {
    this.selectedDocteurId = this.entity.docteur?.id;
    this.findDocteurs();
  }

  updateItem() {
    this.entity.docteur = this.selectedDocteurId;
    this.entity.date = this.datePipe.transform(this.entity.date, 'yyyy-MM-dd');
    this.reposMedicalSrv.update(this.entity)
      .subscribe((data: any) => {
        this.update.emit(data);
      });
  }

  // close modal window
  closeModal() {
    this.close.emit();
  }

  findDocteurs() {
    this.docteurSrv.findAll()
      .subscribe((data: any) => { this.docteurs = data },
        err => this.docteurSrv.httpSrv.catchError(err));
  }

}
