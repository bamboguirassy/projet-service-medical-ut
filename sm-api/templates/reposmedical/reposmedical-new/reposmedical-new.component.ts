import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren } from '@angular/core';
import { ReposMedicalService } from '../reposmedical.service';
import { ReposMedical } from '../reposmedical';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reposmedical-new',
  templateUrl: './reposmedical-new.component.html',
  styleUrls: ['./reposmedical-new.component.scss']
})
export class ReposMedicalNewComponent implements OnInit {

  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  @ViewChildren('form') form;
  entity: ReposMedical;
  @Output() creation: EventEmitter<ReposMedical> = new EventEmitter();
  isModalVisible = false;

  constructor(public reposMedicalSrv: ReposMedicalService,
    public router: Router) {
    this.entity = new ReposMedical();
  }

  ngOnInit(): void {}

  save() {
    this.reposMedicalSrv.create(this.entity)
      .subscribe((data: any) => {
        this.closeModal();
        this.creation.emit(data);
        this.entity = new ReposMedical();
      }, error => this.reposMedicalSrv.httpSrv.catchError(error));
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

