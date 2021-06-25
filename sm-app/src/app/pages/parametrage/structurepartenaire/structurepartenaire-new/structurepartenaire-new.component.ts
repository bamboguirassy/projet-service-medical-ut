import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren } from '@angular/core';
import { StructurePartenaireService } from '../structurepartenaire.service';
import { StructurePartenaire } from '../structurepartenaire';
import { Router } from '@angular/router';

@Component({
  selector: 'app-structurepartenaire-new',
  templateUrl: './structurepartenaire-new.component.html',
  styleUrls: ['./structurepartenaire-new.component.scss']
})
export class StructurePartenaireNewComponent implements OnInit {

  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  @ViewChildren('form') form;
  entity: StructurePartenaire;
  @Output() creation: EventEmitter<StructurePartenaire> = new EventEmitter();
  isModalVisible = false;

  constructor(public structurePartenaireSrv: StructurePartenaireService,
    public router: Router) {
    this.entity = new StructurePartenaire();
  }

  ngOnInit(): void { }

  save() {
    this.structurePartenaireSrv.create(this.entity)
      .subscribe((data: any) => {
        this.closeModal();
        this.creation.emit(data);
        this.entity = new StructurePartenaire();
      }, error => this.structurePartenaireSrv.httpSrv.catchError(error));
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

