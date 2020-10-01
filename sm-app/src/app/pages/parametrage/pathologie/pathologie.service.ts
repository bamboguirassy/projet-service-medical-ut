import { BamboAbstractService } from '../../../shared/services/bambo-abstract.service';
import { BamboHttpService } from './../../../shared/services/bambo-http.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PathologieService extends BamboAbstractService {

  constructor(public httpSrv: BamboHttpService, public toastr: ToastrService) {
    super(httpSrv, toastr);
    this.routePrefix = 'pathologie/';
    this.resourceName = 'PATHOLOGIE';
  }

  getAnnualTravailleurStatistic(annee: number) {
    return this.httpSrv.get(this.routePrefix + annee + '/statistique-annuelle-travailleur/');
  }

  getMensualTravailleurStatistic(annee: number) {
    return this.httpSrv.get(this.routePrefix + annee + '/statistique-mensuelle-travailleur/');
  }
  
  getMensualStatistic(annee: number) {
    return this.httpSrv.get(this.routePrefix + annee + '/statistique-mensuelle/');
  }
  
}
