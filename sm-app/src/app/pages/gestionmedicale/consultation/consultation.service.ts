import { BamboAbstractService } from '../../../shared/services/bambo-abstract.service';
import { BamboHttpService } from './../../../shared/services/bambo-http.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService extends BamboAbstractService {

  constructor(public httpSrv: BamboHttpService, public toastr: ToastrService) {
    super(httpSrv, toastr);
    this.routePrefix = 'consultation/';
    this.resourceName = 'CONSULTATION';
  }

  findByDate(dateInterval: any) {
    return this.httpSrv.post(this.routePrefix + 'filter-by-date/', dateInterval);
  }

  getAnnualStatistic(annee: number) {
    return this.httpSrv.get(this.routePrefix + annee + '/statistique/');
  }

}
