import { BamboHttpService } from '../services/bambo-http.service';
import { ToastrService } from 'ngx-toastr';
import { BamboAbstractObject } from '../classes/bambo-abstract-object';
import { first } from 'rxjs/operators';

export abstract class BamboAbstractService {

  protected routePrefix: string;
  public resourceName: string;

  constructor(public httpSrv: BamboHttpService, public toastr: ToastrService) { }

  findAll() {
    return this.httpSrv.get(this.routePrefix);
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.routePrefix + id);
  }

  create(item: BamboAbstractObject) {
    return this.httpSrv.post(this.routePrefix + 'create', item);
  }

  update(item: BamboAbstractObject) {
    return this.httpSrv.put(this.routePrefix + item.id + '/edit', item);
  }

  clone(originalId: number, clone: BamboAbstractObject) {
    return this.httpSrv.put(this.routePrefix + originalId + '/clone', clone);
  }

  remove(item: BamboAbstractObject) {
    return this.httpSrv.delete(this.routePrefix + item.id);
  }

  getData(url) {
    return this.httpSrv.get(url)
    .pipe(first());
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  public getRoutePrefixWithoutSlash(): string {
    return this.routePrefix.slice(0,-1);
  }
}