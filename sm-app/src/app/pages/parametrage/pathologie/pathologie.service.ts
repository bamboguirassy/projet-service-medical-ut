import { Pathologie } from './pathologie';
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

  getMensualTravailleurStatistic(annee: number) {
    return this.httpSrv.get(this.routePrefix + annee + '/statistique-mensuelle-travailleur/');
  }

  getMensualTravailleurStatisticByPathologie(pathologie: any, annee: number) {
    return this.httpSrv.get(this.routePrefix + pathologie +'/'+annee + '/diagram-statistique-mensuelle-travailleur/');
  }

  getDaylyTravailleurStatistic(mois: any, annee: number) {
    return this.httpSrv.get(this.routePrefix + mois +'/'+ annee + '/statistique-journaliere-travailleur/');
  }

  getDaylyTravailleurStatisticByPathologie(pathologie: any, mois: any, annee: number) {
    return this.httpSrv.get(this.routePrefix +pathologie+'/'+mois +'/'+ annee + '/diagram-statistique-journaliere-travailleur/');
  }
  
  getGenericStatistic(annee: number) {
    return this.httpSrv.get(this.routePrefix + annee + '/statistique-generale/');
  }

  getGenericStatisticDiagram(annee: number) {
    return this.httpSrv.get(this.routePrefix + annee + '/diagram-statistique-generale/');
  }
  
}
