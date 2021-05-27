import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BamboTokenService } from './bambo-token.service';
import { Router } from '@angular/router';
import { tap, catchError, first } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BamboHttpService {

  // public baseUrl = 'http://127.0.1:8001/api/';
  public baseUrl = 'https://medic-ws.uidt.sn/index.php/api/';
  private httpOptions: any = null;

  constructor(public http: HttpClient, public tokenSrv: BamboTokenService,
    public router: Router, private injector: Injector) { }

  public get toastr(): ToastrService {
    return this.injector.get(ToastrService);
  }


  private createAuthorizationHeader(): any {
    const headers = new HttpHeaders({
      Authorization: this.tokenSrv.getTokenName() + ' ' + this.tokenSrv.getToken(),
    });
    this.httpOptions = {
      headers
    };
    return this.httpOptions;
  }

  get(url: string) {
    return this.http.get(this.baseUrl + url, this.createAuthorizationHeader())
      .pipe(first());
  }

  post(url: string, data: any) {
    return this.http.post(this.baseUrl + url, data, this.createAuthorizationHeader())
    .pipe(first());
  }

  put(url: string, data: any) {
    return this.http.put(this.baseUrl + url, data, this.createAuthorizationHeader())
    .pipe(first());
  }

  delete(url: string) {
    return this.http.delete(this.baseUrl + url, this.createAuthorizationHeader())
    .pipe(first());
  }

  handleError(error: any) {
    return observableThrowError(error || 'Server error');
  }

  catchError(error: any) {
    this.toastr.error(error.error.message);
    if (error.error.code === 401) {
      this.router.navigate(['public', 'sign-in']);
    }
  }

  // for json and opened resources
  getData(source: string) {
    return this.http.get(source)
    .pipe(first())
    .pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  }
}