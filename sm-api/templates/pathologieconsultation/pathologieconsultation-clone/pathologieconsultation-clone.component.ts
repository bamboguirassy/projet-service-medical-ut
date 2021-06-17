import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { PathologieConsultationService } from '../pathologieconsultation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PathologieConsultation } from '../pathologieconsultation';

@Component({
  selector: 'app-pathologieconsultation-clone',
  templateUrl: './pathologieconsultation-clone.component.html',
  styleUrls: ['./pathologieconsultation-clone.component.scss']
})
export class PathologieConsultationCloneComponent extends BasePageComponent<PathologieConsultation> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public pathologieConsultationSrv: PathologieConsultationService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, pathologieConsultationSrv);
    this.pageData = {
      title: 'Clonage - PathologieConsultation',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'PathologieConsultations',
          route: '/'+this.orientation+'/pathologieconsultation'
        },
        {
          title: 'Clonage'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getData(this.pathologieConsultationSrv.getRoutePrefix() + this.activatedRoute.snapshot.params.id, 'original', 'setLoaded');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
    this.entity = Object.assign({}, this.original);
    this.entity.id = null;
  }

  handlePostClone(data: PathologieConsultation) {
    this.pathologieConsultationSrv.httpSrv.router.navigate([this.orientation,this.pathologieConsultationSrv.getRoutePrefixWithoutSlash(),data.id]);
  }

  prepareClone() {}

}

