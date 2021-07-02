import { BamboAbstractService } from '../../../shared/services/bambo-abstract.service';
import { BamboHttpService } from './../../../shared/services/bambo-http.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BonReception } from './bonreception';
import { MedicamentReception } from '../medicamentreception/medicamentreception';

@Injectable({
  providedIn: 'root'
})
export class BonReceptionService extends BamboAbstractService {

  constructor(public httpSrv: BamboHttpService, public toastr: ToastrService) {
    super(httpSrv, toastr);
    this.routePrefix = 'bonreception/';
    this.resourceName = 'BONRECEPTION';
  }
  
  save(bonReception: BonReception, medicamentReceptions: any) {
    return this.httpSrv.post(this.routePrefix + 'create', {bonReception,medicamentReceptions});
  }
 

  
}
