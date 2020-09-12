import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren } from '@angular/core';
import { <?= $entity_class_name ?>Service } from '../<?= strtolower($entity_class_name) ?>.service';
import { <?= $entity_class_name ?> } from '../<?= strtolower($entity_class_name) ?>';
import { Router } from '@angular/router';

@Component({
  selector: 'app-<?= strtolower($entity_class_name) ?>-new',
  templateUrl: './<?= strtolower($entity_class_name) ?>-new.component.html',
  styleUrls: ['./<?= strtolower($entity_class_name) ?>-new.component.scss']
})
export class <?= $entity_class_name ?>NewComponent implements OnInit {

  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  @ViewChildren('form') form;
  entity: <?= $entity_class_name ?>;
  @Output() creation: EventEmitter<<?= $entity_class_name ?>> = new EventEmitter();
  isModalVisible = false;

  constructor(public <?= $entity_var_singular ?>Srv: <?= $entity_class_name ?>Service,
    public router: Router) {
    this.entity = new <?= $entity_class_name ?>();
  }

  ngOnInit(): void {}

  save() {
    this.<?= $entity_var_singular ?>Srv.create(this.entity)
      .subscribe((data: any) => {
        this.closeModal();
        this.creation.emit(data);
        this.entity = new <?= $entity_class_name ?>();
      }, error => this.<?= $entity_var_singular ?>Srv.httpSrv.catchError(error));
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

