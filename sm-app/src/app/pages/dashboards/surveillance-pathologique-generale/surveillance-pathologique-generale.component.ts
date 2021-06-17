import {Color} from "ng2-charts/ng2-charts";
import {PathologieService} from "src/app/pages/parametrage/pathologie/pathologie.service";
import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {IAppState} from "src/app/interfaces/app-state";
import {BasePageComponent} from "../../base-page";
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {Label} from "ng2-charts";
import {finalize} from "rxjs/operators";
import {BamboAbstractChartModel} from "src/app/shared/classes/bambo-abstract-chart-model";
@Component({selector: "app-surveillance-pathologique-generale", templateUrl: "./surveillance-pathologique-generale.component.html", styleUrls: ["./surveillance-pathologique-generale.component.scss"]})
export class SurveillancePathologiqueGeneraleComponent
extends BasePageComponent<any>
implements OnInit,
OnDestroy {
  @Input()canSwitchDiagramType: boolean = true;
  typeDiagrams: {
    value: string;
    title: string;
  }[] = [
    {
      value: "bar",
      title: "Barre verticale"
    }, {
      value: "line",
      title: "Courbe"
    }
  ];
  isLoad = false;
  disableExportButton: boolean = false;
  fileName: string = "Surveillance_pathologique_générale_";
  data: any;
  selectedAnnee: number;
  annees = [];
  dataDiagram: any;
  //chart
  rawChartData: BamboAbstractChartModel[] | any;
  chartLabels: Label[] = [];
  chartType: ChartType = "bar";
  chartLegend = true;
  chartPlugins = [];
  chartData: ChartDataSets[] = [];
  methodName: string;
  loading = false;
  chartOptions: ChartOptions = {
    responsive: true
  };
  selectedTypeDiagram: ChartType = "line";
  public lineChartColors: Color[] = [
    {
      borderColor: "black",
      backgroundColor: "#fff"
    }
  ];

  constructor(store : Store<IAppState>, public pathologieSrv : PathologieService) {
    super(store, pathologieSrv);

    this.pageData = {
      title: "Surveillance pathologique générale",
      loaded: true,
      breadcrumbs: [
        {
          title: "Statistique",
          route: "default-dashboard"
        }, {
          title: "Surveillance Pathologique Générale"
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
    this.pathologieSrv.getGenericStatistic(this.selectedAnnee).subscribe((data : any) => {
      if (data.lenght == 0) 
        this.disableExportButton = true;
      this.data = data;
    }, (err) => this.pathologieSrv.httpSrv.catchError(err));
  }

  handlePostLoad() {}

  rangeAnnee() {
    const anneeCourante = new Date().getFullYear();
    const anneeStart = 2020;
    for (let i = anneeCourante; i >= anneeStart; i--) {
      this.annees.push(i);
    }
    return this.annees;
  }

  setDataChart() {
    const chartData: ChartDataSets[] = [];
    this.rawChartData.dataTab.forEach((chartDataItem) => {
      const arr: number[] = chartDataItem.pathTab;
      chartData.push({data: arr, label: chartDataItem.pathologie.nom});
    });
    this.chartOptions = {
      responsive: true
    };

    this.chartLabels = this.rawChartData.month;
    this.chartType = "line";
    this.chartLegend = true;
    this.chartPlugins = [];
    this.chartData = chartData;
  }

  buildDiagram() {
    if (this.selectedAnnee) {
      this.loading = true;
      this.pathologieSrv.getGenericStatisticDiagram(this.selectedAnnee).pipe(finalize(() => (this.loading = false))).subscribe((data : any) => {
        this.dataDiagram = data;
        this.isLoad = true;

        this.handlePostFetch(this.dataDiagram as[]);
      }, (err) => {
        this.pathologieSrv.httpSrv.handleError(err);
      });
    }
  }

  handlePostFetch(data : any[]) {
    this.rawChartData = data;
    this.setDataChart();
  }

}
