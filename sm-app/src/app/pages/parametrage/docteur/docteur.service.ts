import { BamboAbstractService } from '../../../shared/services/bambo-abstract.service';
import { BamboHttpService } from './../../../shared/services/bambo-http.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Docteur } from './docteur';

@Injectable({
  providedIn: 'root'
})
export class DocteurService extends BamboAbstractService {

  constructor(public httpSrv: BamboHttpService, public toastr: ToastrService) {
    super(httpSrv, toastr);
    this.routePrefix = 'docteur/';
    this.resourceName = 'DOCTEUR';
  }
  uploadPhoto(docteur: Docteur, photo: any, fileName: any) {
    return this.httpSrv.put(this.routePrefix + 'upload-photo/' + docteur.id, { photo, fileName });
  }
  
}
