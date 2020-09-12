import { BamboAbstractService } from 'src/app/shared/services/bambo-abstract.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { throwError as observableThrowError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { BamboHttpService } from 'src/app/shared/services/bambo-http.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService extends BamboAbstractService {
  constructor(public httpSrv: BamboHttpService, public toastrSrv: ToastrService) {
    super(httpSrv,toastrSrv)
  }

  getData(source: string) {
    return this.httpSrv.getData(source).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    return observableThrowError(error.error || 'Server error');
  }
}
