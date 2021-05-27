import { BamboAbstractService } from '../../../shared/services/bambo-abstract.service';
import { BamboHttpService } from './../../../shared/services/bambo-http.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Dossier } from '../dossier/dossier';
import { Consultation } from '../consultation/consultation';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService extends BamboAbstractService {

  constructor(public httpSrv: BamboHttpService, public toastr: ToastrService) {
    super(httpSrv, toastr);
    this.routePrefix = 'rendezvous/';
    this.resourceName = 'RENDEZVOUS';
  }

  findByDate(dateInterval: any) {
    return this.httpSrv.post(this.routePrefix + 'filter-by-date/', dateInterval);
  }

  findByConsultation(consultation: Consultation) {
    return this.httpSrv.get(this.routePrefix + consultation.id + '/consultation');
  }

}
