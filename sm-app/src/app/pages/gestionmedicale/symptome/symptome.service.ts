import { Consultation } from './../consultation/consultation';
import { BamboAbstractService } from '../../../shared/services/bambo-abstract.service';
import { BamboHttpService } from './../../../shared/services/bambo-http.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SymptomeService extends BamboAbstractService {

  constructor(public httpSrv: BamboHttpService, public toastr: ToastrService) {
    super(httpSrv, toastr);
    this.routePrefix = 'symptome/';
    this.resourceName = 'SYMPTOME';
  }

  findByConsultation(consultation: Consultation) {
    return this.httpSrv.get(this.routePrefix + consultation.id + '/consultation');
  }

}
