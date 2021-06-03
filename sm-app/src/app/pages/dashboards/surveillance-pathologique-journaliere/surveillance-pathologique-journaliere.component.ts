import { Pathologie } from './../../parametrage/pathologie/pathologie';
import { SurvPathJournStats } from './../surv-path-journ-stats';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { IAppState } from 'src/app/interfaces/app-state';
import { BasePageComponent } from '../../base-page';
import { PathologieService } from '../../parametrage/pathologie/pathologie.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-surveillance-pathologique-journaliere',
  templateUrl: './surveillance-pathologique-journaliere.component.html',
  styleUrls: ['./surveillance-pathologique-journaliere.component.scss']
})
export class SurveillancePathologiqueJournaliereComponent extends BasePageComponent<any> implements OnInit, OnDestroy {
  @Input() canSwitchDiagramType: boolean = true;
  typeDiagrams: { value: string, title: string }[] = [
    { value: 'bar', title: 'Barre verticale' },
    { value: 'line', title: 'Courbe' },
  ];
  isLoad = false;
  data: any;
  selectedAnnee: number;
  annees = [];
  selectedMois: any;
  listOfMonths = {'01':'Janvier', '02':'Février', '03':'Mars', '04':'Avril', '05':'Mai', '06':'Juin', '07':'Juillet', '08':'Aout', '09':'Septembre', '10':'Octobre', '11':'Novembre', '12':'Décembre'};

  //chart  
  rawChartData: SurvPathJournStats[];
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
  dataDiagram: any;
  selectedPathologie: Pathologie;
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
    if(this.selectedMois && this.selectedAnnee){
      this.pathologieSrv.getDaylyTravailleurStatistic(this.selectedMois,this.selectedAnnee)
        .subscribe((data: any) => {
          this.data = data;
        }, err => this.pathologieSrv.httpSrv.catchError(err));
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
            text: 'Surveillance pathologique journalière'
          }
        }
       
    };
    this.chartLabels = this.rawChartData.map(r => r.day);
    this.chartType = 'bar';
    this.chartLegend = true;
    this.chartPlugins = [];

    this.chartData = [
      { data: this.rawChartData.map(r => +r.nbrTravailleurJr), label: 'Travailleur' },
      { data: this.rawChartData.map(r => +r.nbrNTJr), label: 'Non Travailleur' },
    ];
  }


  buildDiagram() {
    if(this.selectedPathologie && this.selectedMois && this.selectedAnnee){
      this.loading = true;
      this.pathologieSrv.getDaylyTravailleurStatisticByPathologie(this.selectedPathologie?.id,this.selectedMois,this.selectedAnnee)
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