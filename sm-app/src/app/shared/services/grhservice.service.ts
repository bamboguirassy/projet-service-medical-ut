import { HttpClient } from '@angular/common/http';
import { BamboHttpService } from 'src/app/shared/services/bambo-http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GRHServiceService {
  public grhUrl = 'https://grh-ws.uidt.sn/index.php/api/';
  public grhPassword = 'AsjfV4*QdGmZ12Z';
  constructor(public httpSrv: HttpClient) { }

  findWithMemberFamily(matricule: any, password: any) {
    return this.httpSrv.post(this.grhUrl + 'employe/public/with-family-members', {'matricule':matricule, 'password':password});
  }
  
}
