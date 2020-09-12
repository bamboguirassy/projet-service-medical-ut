import { Pipe, PipeTransform } from '@angular/core';
import { BamboAuthService } from '../services/bambo-auth.service';

@Pipe({
  name: 'deletable'
})
export class DeletablePipe implements PipeTransform {

  constructor(public authSrv: BamboAuthService) { }

  transform(value: any, ...args: any[]): any {
    return this.authSrv.checkDeleteAccess(value);
  }

}