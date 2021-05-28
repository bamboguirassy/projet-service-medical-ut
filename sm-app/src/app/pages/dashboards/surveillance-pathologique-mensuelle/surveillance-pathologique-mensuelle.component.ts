import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { BasePageComponent } from '../../base-page';
import { PathologieService } from '../../parametrage/pathologie/pathologie.service';

@Component({
  selector: 'app-surveillance-pathologique-mensuelle',
  templateUrl: './surveillance-pathologique-mensuelle.component.html',
  styleUrls: ['./surveillance-pathologique-mensuelle.component.scss']
})
export class SurveillancePathologiqueMensuelleComponent extends BasePageComponent<any> implements OnInit, OnDestroy {

  data: any;
  selectedAnnee: number;
  annees = [];

  constructor(
    store: Store<IAppState>,
    public pathologieSrv: PathologieService
  ) {
    super(store, pathologieSrv);

    this.pageData = {
      title: 'Surveillance pathologique journalière',
      loaded: true,
      breadcrumbs: [
        {
          title: 'Statistique',
          route: 'default-dashboard'
        },
        {
          title: 'Surveillance Pathologique Journalière'
        }
      ]
    };
    this.selectedAnnee = new Date().getFullYear();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getData();
    this.rangeAnnee();
  }

  getData() {
    this.pathologieSrv.getMensualTravailleurStatistic(this.selectedAnnee)
      .subscribe((data: any) => {
        this.data = data;
      }, err => this.pathologieSrv.httpSrv.catchError(err));
  }

  handlePostLoad() { }

  rangeAnnee() {
    const anneeCourante = new Date().getFullYear();
    const anneeStart = 2020;
     for (let i = anneeCourante; i >= anneeStart; i--) {
      this.annees.push(i);
     }
     return this.annees;
  }

}