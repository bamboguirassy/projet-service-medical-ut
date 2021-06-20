import { Symptome } from './../symptome/symptome';
import { BamboAbstractService } from '../../../shared/services/bambo-abstract.service';
import { BamboHttpService } from './../../../shared/services/bambo-http.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Mesure } from './mesure';
import { Medicament } from '../../gestionstock/medicament/medicament';

@Injectable({
  providedIn: 'root'
})
export class MesureService extends BamboAbstractService {
  

  constructor(public httpSrv: BamboHttpService, public toastr: ToastrService) {
    super(httpSrv, toastr);
    this.routePrefix = 'mesure/';
    this.resourceName = 'MESURE';
  }

  updateMedicamentsOfOnMesure(mesure: Mesure, medicaments: Medicament[]){
    return this.httpSrv.put(this.routePrefix + mesure.id + "/edit-medicaments", medicaments);
  }

  updateSymptomesOfOnMesure(mesure: Mesure, symptomes: Symptome[]) {
    return this.httpSrv.put(this.routePrefix + mesure.id + "/edit-symptomes", symptomes);
  }
  
}
