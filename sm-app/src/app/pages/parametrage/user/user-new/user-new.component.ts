import { UploadFileModel } from './../../../../shared/classes/upload-file-model';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Group } from '../../group/group';
import { GroupService } from '../../group/group.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  @ViewChildren('form') form: NgForm;
  entity: User;
  @Output() creation: EventEmitter<User> = new EventEmitter();
  loadingIndicator = false;
  groups: Group[] = [];
  fetching = false;
  selectedGroups: Group[] = [];
  isModalVisible = false;
  currentAvatar: any;
  fileModel: UploadFileModel = new UploadFileModel();

  constructor(
    public userSrv: UserService,
    public groupSrv: GroupService,
    public router: Router) {
    this.entity = new User();
  }

  ngOnInit(): void { }

  create() {
    this.loadingIndicator = true;
    let groupIds = this.selectedGroups.map(group => group.id);
    this.entity.groups = groupIds;
    this.entity.fileName = this.fileModel.fileName;
    this.entity.pathImage = this.fileModel.fileContent;
    this.userSrv.create(this.entity).pipe(finalize(() => this.loadingIndicator = false)
    ).subscribe((data: any) => {
      this.creation.emit(data);
      this.userSrv.httpSrv.toastr.success('Utilisateur créé avec succés.');
      this.closeModal();
    }, error => {
      this.userSrv.httpSrv.catchError(error);
    });
  }

  // open modal window
  openModal() {
    this.isModalVisible = true;
  }
  // close modal window
  closeModal() {
    this.isModalVisible = false;
  }

  fetchGroups() {
    if (!this.groups.length) {
      this.fetching = true;
      this.groupSrv.findAll().pipe(
        finalize(() => this.fetching = false)
      ).subscribe((groups: any) => {
        this.groups = groups;
      }, error => {
        this.groupSrv.httpSrv.catchError(error);
      });
    }
  }

  // upload new file
  onFileChanged(inputValue: any) {
    let file: File = inputValue.target.files[0];
    let reader: FileReader = new FileReader();
    reader.onloadend = () => {
      this.currentAvatar = reader.result;
      this.fileModel.fileName = file.name.split('.')[0];
      this.fileModel.fileContent = this.currentAvatar.split(',')[1];
    };
    reader.readAsDataURL(file);
  }

}
