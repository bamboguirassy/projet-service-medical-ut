import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { IPageData } from '../../interfaces/page-data';
import { IAppState } from '../../interfaces/app-state';
import * as PageActions from '../../store/actions/page.actions';
import { BamboAbstractService } from 'src/app/shared/services/bambo-abstract.service';
import { BamboAbstractObject } from 'src/app/shared/classes/bambo-abstract-object';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { SETTINGS } from 'src/environments/settings';
import * as XLSX from "xlsx";

@Component({
  selector: 'base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent<T extends BamboAbstractObject> implements OnInit, OnDestroy {
  pageData: IPageData;
  title: string;
  entity: T;
  items: T[] = [];
  original: T;
  orientation = 'horizontal';
  subscriptions: Subscription[] = [];

  lightGradient = ['#fff', SETTINGS.topbarBg];
  deepGradient = ['#fff', '#d3e5d8'];
  secondGradient = ['#fff', '#F5F6F1'];
  statisticGradient = ['#fff', SETTINGS.topbarBg];
  secondViewBorder = 'success';
  sidebarBg = SETTINGS.sidebarBg;

  constructor(
    public store: Store<IAppState>,
    public httpSv: BamboAbstractService
  ) { }

  ngOnInit() {
    this.pageData ? this.store.dispatch(new PageActions.Set(this.pageData)) : null;
  }

  ngOnDestroy() {
    this.store.dispatch(new PageActions.Reset());
    this.subscriptions.forEach(subscription=>subscription.unsubscribe());
  }

  addSubscription(subscription) {
    if(this.subscriptions.includes(subscription)) {
      this.subscriptions.push(subscription);
    }
  }

  // get data
  // parameters:
  // * url - data url
  // * dataName - set data to 'dataName'
  // * callbackFnName run callback function with name 'callbackFnName'
  getData(url: string, dataName: string, callbackFnName?: string) {
    this.httpSv.getData(url).subscribe(
      data => {
        this[dataName] = data;
      },
      err => {
        console.log(err);
      },
      () => {
        (callbackFnName && typeof this[callbackFnName] === 'function') ? this[callbackFnName](this[dataName]) : null;
      }
    );
  }

  setLoaded(during: number = 0) {
    setTimeout(() => this.store.dispatch(new PageActions.Update({ loaded: true })), during);
    this.handlePostLoad();
  }

  findAll() {
    this.setLoaded();
    this.httpSv.findAll()
    .subscribe((data: any)=>{
      this.items = data;
      this.handlePostLoad();
    },err=>this.httpSv.httpSrv.catchError(err));
  }

  findEntity(id: number) {
    this.setLoaded();
    this.httpSv.findOneById(id)
      .subscribe((data: any) => { 
        this.entity = data;
        this.handlePostLoad();
       },
        err => this.httpSv.httpSrv.catchError(err));
  }

  handlePostLoad() {
    throw new Error('Should be reimplemented');
  }

  update(params?: any) {
    this.prepareUpdate();
    this.httpSv.update(this.entity)
      .subscribe((resp) => {
        this.handlePostUpdate();
      });
  }

  prepareUpdate() {
    throw new Error('Should be reimplemented');
  }

  handlePostUpdate() {
    throw new Error('Should be reimplemented');
  }

  remove(entity: T) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette opération est irreversible !',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Non, annuler',
      confirmButtonColor: '#d33'
    }).then((result) => {
      if (result.value) {
        this.httpSv.remove(entity)
          .subscribe(() => {
            Swal.close();
            this.httpSv.toastr.success("Suppression reussie");
            this.handlePostDelete();
          },err=>this.httpSv.httpSrv.catchError(err));
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.close();
        this.httpSv.toastr.warning("Suppression annulée !");
      }
    });
  }

  handlePostDelete() {
    throw new Error("Should be reimplemented !");
  }

  onCreate(item: T) {
    this.items = [item, ...this.items];
  }

  // to be reimplemented
  prepareClone() {
    throw new Error("Should be reimplemented !");
  }

  clone() {
    this.prepareClone();
    this.httpSv.clone(this.original.id, this.entity)
      .subscribe((data: any) => {
        this.handlePostClone(data);
      }, error => this.httpSv.httpSrv.catchError(error));
  }

  // to be reimplemented
  handlePostClone(data: T) {
    throw new Error("Should be reimplemented !");
  }

  refreshCloneData() {
    this.httpSv.findOneById(this.original.id)
      .subscribe((data: any) => {
        this.original = data;
      }, err => this.httpSv.httpSrv.catchError(err));
  }

  exportToExcel(table: string, fileName: string) {
    /* table id is passed over here */

    let element = document.getElementById(table);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    /* save to file */
    XLSX.writeFile(wb, fileName + table + (new Date().toDateString()) + ".xlsx");
  }


}
