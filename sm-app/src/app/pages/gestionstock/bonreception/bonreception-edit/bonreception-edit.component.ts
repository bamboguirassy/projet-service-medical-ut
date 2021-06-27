import { Component, OnInit, OnDestroy } from '@angular/core';
import { BonReception } from '../bonreception';
import { BonReceptionService } from '../bonreception.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { BasePageComponent } from 'src/app/pages/base-page';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-bonreception-edit',
  templateUrl: './bonreception-edit.component.html',
  styleUrls: ['./bonreception-edit.component.scss']
})
export class BonReceptionEditComponent extends BasePageComponent<BonReception> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
    public bonReceptionSrv: BonReceptionService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public location: Location, public datePipe: DatePipe) {
    super(store, bonReceptionSrv);
    this.pageData = {
      title: 'Modification - Bon de réception',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des bons de réception',
          route: '/' + this.orientation + '/bonreception'
        },
        {
          title: 'Modification'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.findEntity(this.activatedRoute.snapshot.params.id);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
  }

  prepareUpdate() {
    this.entity.date = this.datePipe.transform(this.entity.date, 'yyyy-MM-dd');
  }
  
  handlePostUpdate() {
    this.location.back();
  }

}
