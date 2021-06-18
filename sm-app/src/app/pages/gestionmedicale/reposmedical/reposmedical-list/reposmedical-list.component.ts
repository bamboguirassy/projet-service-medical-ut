import { DatePipe } from '@angular/common';
import { BasePageComponent } from '../../../base-page/base-page.component';
import { IAppState } from './../../../../interfaces/app-state';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReposMedicalService } from '../reposmedical.service';
import { ReposMedical } from '../reposmedical';

@Component({
  selector: 'app-reposmedical-list',
  templateUrl: './reposmedical-list.component.html',
  styleUrls: ['./reposmedical-list.component.scss']
})
export class ReposMedicalListComponent extends BasePageComponent<ReposMedical> implements OnInit, OnDestroy {

  dates: any;
  isEditModalVisible = false;
  selectedItem: ReposMedical;
  
  constructor(store: Store<IAppState>,
    public reposMedicalSrv: ReposMedicalService,
    public datePipe: DatePipe) {
    super(store, reposMedicalSrv);

    this.pageData = {
      title: 'Liste des repos médicaux prescrits',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des repos médicaux prescrits'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.findAll();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostDelete() {
    this.findAll();
  }

  handlePostLoad() {
    this.dates = null;
  }

  setEditItem(item: ReposMedical) {
    this.selectedItem = item;
    this.isEditModalVisible = true;
  }

  findAll() {
    this.closeEditModal();
    super.findAll();
  }

  closeEditModal() {
    this.isEditModalVisible = false;
  }

  filter() {
    var formattedDate = { startDate: null, endDate: null };
    formattedDate.startDate = this.datePipe.transform(this.dates[0], 'yyyy-MM-dd');
    formattedDate.endDate = this.datePipe.transform(this.dates[1], 'yyyy-MM-dd');
    this.reposMedicalSrv.findByDate(formattedDate)
      .subscribe((data: any) => {
        this.items = data;
      }, err => this.reposMedicalSrv.httpSrv.catchError(err));
  }

}
