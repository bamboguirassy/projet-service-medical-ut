import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { ConsultationService } from '../consultation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Consultation } from '../consultation';

@Component({
  selector: 'app-consultation-clone',
  templateUrl: './consultation-clone.component.html',
  styleUrls: ['./consultation-clone.component.scss']
})
export class ConsultationCloneComponent extends BasePageComponent<Consultation> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public consultationSrv: ConsultationService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, consultationSrv);
    this.pageData = {
      title: 'Clonage - Consultation',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Consultations',
          route: '/'+this.orientation+'/consultation'
        },
        {
          title: 'Clonage'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getData(this.consultationSrv.getRoutePrefix() + this.activatedRoute.snapshot.params.id, 'original', 'setLoaded');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
    this.entity = Object.assign({}, this.original);
    this.entity.id = null;
  }

  handlePostClone(data: Consultation) {
    this.consultationSrv.httpSrv.router.navigate([this.orientation,this.consultationSrv.getRoutePrefixWithoutSlash(),data.id]);
  }

  prepareClone() {}

}

