import { UploadFileModel } from './../../../../shared/classes/upload-file-model';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren } from '@angular/core';
import { MedicamentService } from '../medicament.service';
import { Medicament } from '../medicament';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicament-new',
  templateUrl: './medicament-new.component.html',
  styleUrls: ['./medicament-new.component.scss']
})
export class MedicamentNewComponent implements OnInit {

  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  @ViewChildren('form') form;
  entity: Medicament;
  @Output() creation: EventEmitter<Medicament> = new EventEmitter();
  isModalVisible = false;
  currentAvatar: any;
  fileModel: UploadFileModel = new UploadFileModel();

  constructor(public medicamentSrv: MedicamentService,
    public router: Router) {
    this.entity = new Medicament();
  }

  ngOnInit(): void { }

  save() {
    this.entity.filename = this.fileModel.fileName;
    this.entity.filepath = this.fileModel.fileContent;
    this.medicamentSrv.create(this.entity)
      .subscribe((data: any) => {
        this.closeModal();
        this.creation.emit(data);
        this.entity = new Medicament();
      }, error => this.medicamentSrv.httpSrv.catchError(error));
  }

  // open modal window
  openModal() {
    this.isModalVisible = true;
  }

  // close modal window
  closeModal() {
    this.isModalVisible = false;
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

