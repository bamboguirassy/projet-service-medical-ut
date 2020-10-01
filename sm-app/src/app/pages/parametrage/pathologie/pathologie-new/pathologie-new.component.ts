import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren } from '@angular/core';
import { PathologieService } from '../pathologie.service';
import { Pathologie } from '../pathologie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pathologie-new',
  templateUrl: './pathologie-new.component.html',
  styleUrls: ['./pathologie-new.component.scss']
})
export class PathologieNewComponent implements OnInit {

  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  @ViewChildren('form') form;
  entity: Pathologie;
  @Output() creation: EventEmitter<Pathologie> = new EventEmitter();
  isModalVisible = false;

  constructor(public pathologieSrv: PathologieService,
    public router: Router) {
    this.entity = new Pathologie();
  }

  ngOnInit(): void {}

  save() {
    this.pathologieSrv.create(this.entity)
      .subscribe((data: any) => {
        this.creation.emit(data);
        this.entity = new Pathologie();
      }, error => this.pathologieSrv.httpSrv.catchError(error));
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

