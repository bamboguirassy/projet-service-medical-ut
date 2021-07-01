import { BamboAbstractService } from '../../../shared/services/bambo-abstract.service';
import { BamboHttpService } from './../../../shared/services/bambo-http.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BonReception } from '../bonreception/bonreception';

@Injectable({
  providedIn: 'root'
})
export class MedicamentReceptionService extends BamboAbstractService {

  constructor(public httpSrv: BamboHttpService, public toastr: ToastrService) {
    super(httpSrv, toastr);
    this.routePrefix = 'medicamentreception/';
    this.resourceName = 'MEDICAMENTRECEPTION';
  }

  findByBonReception(bonReception: BonReception) {
    return this.httpSrv.get(this.routePrefix + bonReception?.id + '/bonreception');
  }
}
