import { StructurePartenaire } from './../../parametrage/structurepartenaire/structurepartenaire';
import { BamboAbstractService } from '../../../shared/services/bambo-abstract.service';
import { BamboHttpService } from './../../../shared/services/bambo-http.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class InputationService extends BamboAbstractService {

  constructor(public httpSrv: BamboHttpService, public toastr: ToastrService) {
    super(httpSrv, toastr);
    this.routePrefix = 'inputation/';
    this.resourceName = 'INPUTATION';
  }

  findByDate(dateInterval: any) {
    return this.httpSrv.post(this.routePrefix + 'filter-by-date/', dateInterval);
  }

  getDaylyStatistic(mois: any, annee: number) {
    return this.httpSrv.get(this.routePrefix + mois + '/' + annee + '/statistique-journaliere/');
  }

  getDaylyByStrucrureStatistic( mois: any, annee: number) {
    return this.httpSrv.get(this.routePrefix + mois + '/' + annee + '/statistique-by-structure-journaliere/');
  }

  getDaylyTravailleurByStructureDiagram(structure: any, mois: any, annee: number) {
    return this.httpSrv.get(this.routePrefix +structure+'/'+mois +'/'+ annee + '/diagram-journaliere-travailleur-par-structure/');
  }

  getMensualStatistic(annee: number) {
    return this.httpSrv.get(this.routePrefix + annee + '/statistique-mensuelle/');
  }

  findLastestInputation() {
    return this.httpSrv.get(this.routePrefix + 'latest/');
  }

}
