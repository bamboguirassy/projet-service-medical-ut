import { SurvPathMensStats } from './../surv-path-mens-stats';
import { Pathologie } from './../../parametrage/pathologie/pathologie';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { BasePageComponent } from '../../base-page';
import { PathologieService } from '../../parametrage/pathologie/pathologie.service';
import { Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-surveillance-pathologique-mensuelle',
  templateUrl: './surveillance-pathologique-mensuelle.component.html',
  styleUrls: ['./surveillance-pathologique-mensuelle.component.scss']
})
export class SurveillancePathologiqueMensuelleComponent extends BasePageComponent<any> implements OnInit, OnDestroy {
  @Input() canSwitchDiagramType: boolean = true;
  typeDiagrams: { value: string, title: string }[] = [
    { value: 'bar', title: 'Barre verticale' },
    { value: 'line', title: 'Courbe' },
  ];
  isLoad = false;
  fileName:string = "Surveillance_pathologique_journalière_"
  data: any;
  selectedAnnee: number;
  annees = [];
  selectedPathologie: Pathologie;
  dataDiagram: any;

  //chart  
  rawChartData: SurvPathMensStats[];
  chartLabels: Label[] = [];
  chartType: ChartType = 'bar';
  chartLegend = true;
  chartPlugins = [];
  chartData: ChartDataSets[] = [];
  methodName: string;
  loading = false;
  chartOptions: ChartOptions = {
    responsive: true,
  };
  selectedTypeDiagram: ChartType = 'bar';
  tableData: any;

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
    this.findAll();
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


  setDataChart() {
    this.chartOptions = {
      responsive: true,         
        plugins: {
         title: {
            display: true,
            text: 'Surveillance pathologique journalière'
          }
        }
       
    };
    this.chartLabels = this.rawChartData.map(r => r.month);
    this.chartType = 'bar';
    this.chartLegend = true;
    this.chartPlugins = [];

    this.chartData = [
      { data: this.rawChartData.map(r => +r.travailleur), label: 'Travailleur' },
      { data: this.rawChartData.map(r => +r.ntravailleur), label: 'Non Travailleur' },
    ];
  }


  buildDiagram() {
    if(this.selectedPathologie && this.selectedAnnee){
      this.loading = true;
      this.pathologieSrv.getMensualTravailleurStatisticByPathologie(this.selectedPathologie?.id,this.selectedAnnee)
        .pipe(finalize(() => this.loading = false))
        .subscribe((data: any) => {
          this.dataDiagram = data;
          this.isLoad = true;
          this.handlePostFetch(this.dataDiagram as []);
        }, err => {
          this.pathologieSrv.httpSrv.handleError(err);
        });
    }
  }

  handlePostFetch(data: []) {
    this.rawChartData = data;
    this.setDataChart();
  }



}