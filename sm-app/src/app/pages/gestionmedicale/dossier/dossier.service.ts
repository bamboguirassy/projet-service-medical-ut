import { HttpClient } from '@angular/common/http';
import { BamboAbstractService } from '../../../shared/services/bambo-abstract.service';
import { BamboHttpService } from './../../../shared/services/bambo-http.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DossierService extends BamboAbstractService {

  constructor(public httpSrv: BamboHttpService, public toastr: ToastrService, public http: HttpClient) {
    super(httpSrv, toastr);
    this.routePrefix = 'dossier/';
    this.resourceName = 'DOSSIER';
  }

  getDossierSearch(searchTerm: any) {
    return this.httpSrv.post(this.routePrefix+ 'search', {'searchTerm':searchTerm});
  }

  
}
