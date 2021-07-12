import { Inputation } from './../../gestionmedicale/inputation/inputation';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { finalize } from 'rxjs/operators';
import { BasePageComponent } from '../../base-page';
import { IAppState } from 'src/app/interfaces/app-state';
import { InputationService } from '../../gestionmedicale/inputation/inputation.service';
import { ImpuStructureJourStats } from '../impu-structure-jour-stats';

@Component({
  selector: 'app-imputation-structure-journaliere',
  templateUrl: './imputation-structure-journaliere.component.html',
  styleUrls: ['./imputation-structure-journaliere.component.scss']
})
export class ImputationStructureJournaliereComponent extends BasePageComponent<any> implements OnInit, OnDestroy {
  @Input() canSwitchDiagramType: boolean = true;
  typeDiagrams: { value: string, title: string }[] = [
    { value: 'bar', title: 'Barre verticale' },
    { value: 'line', title: 'Courbe' },
  ];
  isLoad = false;
  data: any;
  fileName: string = "Statistique_consultation_journalière_"
  selectedAnnee: number;
  selectedMois: any;
  annees = [];
  disableExportButton: boolean = false;
  listOfMonths = { '01': 'Janvier', '02': 'Février', '03': 'Mars', '04': 'Avril', '05': 'Mai', '06': 'Juin', '07': 'Juillet', '08': 'Aout', '09': 'Septembre', '10': 'Octobre', '11': 'Novembre', '12': 'Décembre' };
  //chart  
  rawChartData: ImpuStructureJourStats[];
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
  selectedImputation: Inputation;

  constructor(
    store: Store<IAppState>,
    public inputationSrv: InputationService
  ) {
    super(store, inputationSrv);

    this.pageData = {
      title: 'Statistique imputation journalière par structure',
      loaded: true,
      breadcrumbs: [
        {
          title: 'Statistique',
          route: 'default-dashboard'
        },
        {
          title: 'Statistique imputation journalière par structure'
        }
      ]
    };
    this.selectedAnnee = new Date().getFullYear();    
    
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.rangeAnnee();
    this.getData();
    this.findAll();
  }

  getData() {
    if (this.selectedMois && this.selectedAnnee) {
      this.inputationSrv.getDaylyByStrucrureStatistic(this.selectedMois, this.selectedAnnee)
        .subscribe((data: any) => {
          this.data = data;          
console.log(this.data);
        }, err => this.inputationSrv.httpSrv.catchError(err));
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
      responsive: true,
      plugins: {
        title: {
           display: true,
           text: 'Imputation journaliére par structure'
         }
       }
    };
    this.chartLabels = this.rawChartData.map(r =>  r.day);
    this.chartType = 'bar';
    this.chartLegend = true;
    this.chartPlugins = [];

    this.chartData = [
      { data: this.rawChartData.map(r => +r.nbrTravailleurJr), label: 'Travailleur' },
      { data: this.rawChartData.map(r => +r.nbrNonTravailleurJr), label: 'Non Travailleur' }
    ];
  }


  buildDiagram(data) {
    this.isLoad = true;
    this.handlePostFetch(data as []);
  }

  handlePostFetch(data: []) {
    this.rawChartData = data;
    this.setDataChart();
  }


}
