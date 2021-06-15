import { Label } from 'ng2-charts';
import { DashboardBaseComponent } from './../../../shared/components/dashboard-base/dashboard-base.component';
import { ConsJourStats } from './../cons-jour-stats';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { BasePageComponent } from '../../base-page';
import { ConsultationService } from '../../gestionmedicale/consultation/consultation.service';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-consultation-journaliere',
  templateUrl: './consultation-journaliere.component.html',
  styleUrls: ['./consultation-journaliere.component.scss']
})
export class ConsultationJournaliereComponent extends BasePageComponent<any> implements OnInit, OnDestroy {
  @Input() canSwitchDiagramType: boolean = true;
  typeDiagrams: { value: string, title: string }[] = [
    { value: 'bar', title: 'Barre verticale' },
    { value: 'line', title: 'Courbe' },
  ];
  isLoad = false;
  data: any;
  selectedAnnee: number;
  selectedMois: any;
  annees = [];
  listOfMonths = { '01': 'Janvier', '02': 'Février', '03': 'Mars', '04': 'Avril', '05': 'Mai', '06': 'Juin', '07': 'Juillet', '08': 'Aout', '09': 'Septembre', '10': 'Octobre', '11': 'Novembre', '12': 'Décembre' };

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
      title: 'Statistique consultation journalière',
      loaded: true,
      breadcrumbs: [
        {
          title: 'Statistique',
          route: 'default-dashboard'
        },
        {
          title: 'Statistique consultation journalière'
        }
      ]
    };
    this.selectedAnnee = new Date().getFullYear();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.rangeAnnee();
  }

  getData() {
    if (this.selectedMois && this.selectedAnnee) {
      this.consultationSrv.getDaylyStatistic(this.selectedMois, this.selectedAnnee)
        .subscribe((data: any) => {
          this.data = data;
        }, err => this.consultationSrv.httpSrv.catchError(err));
    }
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
    this.chartLabels = this.rawChartData.map(r => "J" + r.day);
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
    if (this.selectedMois && this.selectedAnnee) {
      this.loading = true;
      this.consultationSrv.getDaylyStatistic(this.selectedMois, this.selectedAnnee)
        .pipe(finalize(() => this.loading = false))
        .subscribe((data: any) => {
          this.isLoad = true;
          this.handlePostFetch(data as []);
        }, err => {
          this.consultationSrv.httpSrv.handleError(err);
        });
    }
  }

  handlePostFetch(data: []) {
    this.rawChartData = data;
    this.setDataChart();
  }


}
