import { PathologieService } from 'src/app/pages/parametrage/pathologie/pathologie.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { BasePageComponent } from '../../base-page';

@Component({
  selector: 'app-surveillance-pathologique-generale',
  templateUrl: './surveillance-pathologique-generale.component.html',
  styleUrls: ['./surveillance-pathologique-generale.component.scss']
})
export class SurveillancePathologiqueGeneraleComponent extends BasePageComponent<any> implements OnInit, OnDestroy {

  data: any;
  selectedAnnee: number;
  annees = [];

  constructor(
    store: Store<IAppState>,
    public pathologieSrv: PathologieService
  ) {
    super(store, pathologieSrv);

    this.pageData = {
      title: 'Surveillance pathologique générale',
      loaded: true,
      breadcrumbs: [
        {
          title: 'Statistique',
          route: 'default-dashboard'
        },
        {
          title: 'Surveillance Pathologique Générale'
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
    this.pathologieSrv.getGenericStatistic(this.selectedAnnee)
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
