import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren } from '@angular/core';
import { AccessGroup } from '../access-group.model';
import { AccessModel } from '../access.model';
import { GroupService } from '../group.service';
import { Group } from '../group';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-new',
  templateUrl: './group-new.component.html',
  styleUrls: ['./group-new.component.scss']
})
export class GroupNewComponent implements OnInit {

  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  @ViewChildren('form') form;
  entity: Group;
  @Output() creation: EventEmitter<Group> = new EventEmitter();
  isModalVisible = false;

  accessGroups: AccessGroup[] = [];

  constructor(public groupSrv: GroupService,
    public router: Router) {
    this.entity = new Group();
  }

  ngOnInit(): void {
    this.getAccessModels();
  }

  getAccessModels() {
    this.groupSrv.getTables()
      .subscribe((data: any) => {
        this.accessGroups = data;
      }, error => {
        this.groupSrv.httpSrv.catchError(error);
      });
  }

  save() {
    this.entity.roles = this.accessGroups;
    this.groupSrv.create(this.entity)
      .subscribe((data: any) => {
        this.closeModal();
        this.creation.emit(data);
        this.entity = new Group();
      }, error => this.groupSrv.httpSrv.catchError(error));
  }

  // open modal window
  openModal() {
    this.isModalVisible = true;
  }

  // close modal window
  closeModal() {
    this.isModalVisible = false;
  }

  handleGroupSelection($event, accessGroup: AccessGroup) {
    accessGroup.accessModels.forEach(accessModel => {
      accessModel.isCloneAllowed = $event.target.checked;
      accessModel.isCreateAllowed = $event.target.checked;
      accessModel.isDeleteAllowed = $event.target.checked;
      accessModel.isEditAllowed = $event.target.checked;
      accessModel.isIndexAllowed = $event.target.checked;
      accessModel.isShowAllowed = $event.target.checked;
      // local attributes
      accessModel.checkAll = $event.target.checked;
    });
  }

  handleAccessSelection($event, accessModel: AccessModel) {
    accessModel.isCloneAllowed = $event.target.checked;
    accessModel.isCreateAllowed = $event.target.checked;
    accessModel.isDeleteAllowed = $event.target.checked;
    accessModel.isEditAllowed = $event.target.checked;
    accessModel.isIndexAllowed = $event.target.checked;
    accessModel.isShowAllowed = $event.target.checked;
  }

}
