import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { finalize } from 'rxjs/operators';
import { IAppState } from 'src/app/interfaces/app-state';
import { BasePageComponent } from '../../base-page';
import { ConsultationService } from '../../gestionmedicale/consultation/consultation.service';
import { ConsJourStats } from '../cons-jour-stats';

@Component({
  selector: 'app-consultation-mensuelle',
  templateUrl: './consultation-mensuelle.component.html',
  styleUrls: ['./consultation-mensuelle.component.scss']
})
export class ConsultationMensuelleComponent extends BasePageComponent<any> implements OnInit, OnDestroy {
  @Input() canSwitchDiagramType: boolean = true;
  typeDiagrams: { value: string, title: string }[] = [
    { value: 'bar', title: 'Barre verticale' },
    { value: 'line', title: 'Courbe' },
  ];
  isLoad = false;
  data: any;
  selectedAnnee: number;
  annees = [];

  //chart  
  rawChartData: ConsJourStats[];
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
    public consultationSrv: ConsultationService
  ) {
    super(store, consultationSrv);

    this.pageData = {
      title: 'Statistique consultation mensuelle',
      loaded: true,
      breadcrumbs: [
        {
          title: 'Statistique',
          route: 'default-dashboard'
        },
        {
          title: 'Statistique consultation mensuelle'
        }
      ]
    };
    this.selectedAnnee = new Date().getFullYear();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getData();
    this.rangeAnnee();
    this.buildDiagram();
  }

  getData() {
    this.consultationSrv.getMensualStatistic(this.selectedAnnee)
      .subscribe((data: any) => {
        this.data = data;
      }, err => this.consultationSrv.httpSrv.catchError(err));
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
      responsive: true
    };
    this.chartLabels = this.rawChartData.map(r => r.month);
    this.chartType = 'bar';
    this.chartLegend = true;
    this.chartPlugins = [];

    this.chartData = [
      { data: this.rawChartData.map(r => +r.pats), label: 'Pats' },
      { data: this.rawChartData.map(r => +r.per), label: 'Per' },
      { data: this.rawChartData.map(r => +r.famille), label: 'Famille' },
      { data: this.rawChartData.map(r => +r.etudiant), label: 'Etudiant' }
    ];
  }


  buildDiagram() {
    this.loading = true;
    this.consultationSrv.getMensualStatistic(this.selectedAnnee)
      .pipe(finalize(() => this.loading = false))
      .subscribe((data: any) => {
        this.isLoad = true;
        this.handlePostFetch(data as []);
      }, err => {
        this.consultationSrv.httpSrv.handleError(err);
      });
  }

  handlePostFetch(data: []) {
    this.rawChartData = data;
    this.setDataChart();
  }

}