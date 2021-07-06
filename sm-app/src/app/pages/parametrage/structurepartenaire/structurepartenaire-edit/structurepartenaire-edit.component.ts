import { Component, OnInit, Input, ViewChild, ViewChildren, Output, EventEmitter, ElementRef } from '@angular/core';
import { StructurePartenaire } from '../structurepartenaire';
import { StructurePartenaireService } from '../structurepartenaire.service';

@Component({
  selector: 'app-structurepartenaire-edit',
  templateUrl: './structurepartenaire-edit.component.html',
  styleUrls: ['./structurepartenaire-edit.component.scss']
})
export class StructurePartenaireEditComponent implements OnInit{
  @Input() visible = false;
  @Input() entity: StructurePartenaire;

  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  @ViewChildren('form') form;
  @Output() update: EventEmitter<StructurePartenaire> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(
    public structurePartenaireSrv: StructurePartenaireService,
    ) {
  }

  ngOnInit(): void {
   
  }

  ngOnDestroy() {
  }

  handlePostLoad() {
  }

  prepareUpdate() {
  }

  handlePostUpdate() {
  }
 
  updateItem() {
    this.structurePartenaireSrv.update(this.entity)
      .subscribe((data: any) => {
        this.closeModal();
        this.update.emit(data);
      });
  }

  // close modal window
  closeModal() {
    this.close.emit();
  }

}
