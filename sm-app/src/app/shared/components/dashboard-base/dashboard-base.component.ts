import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { finalize } from 'rxjs/operators';
import { BamboAbstractChartModel } from '../../classes/bambo-abstract-chart-model';
import { BamboAbstractService } from '../../services/bambo-abstract.service';

@Component({
  selector: 'app-dashboard-base',
  templateUrl: './dashboard-base.component.html',
  styleUrls: ['./dashboard-base.component.scss']
})
export class DashboardBaseComponent <T extends BamboAbstractChartModel>  implements OnInit {
  rawChartData: T[]|any;
  chartLabels: Label[] = [];
  chartType: ChartType = 'bar';
  chartLegend = true;
  chartPlugins = [];
  typeDiagrams: Array<{ value: string, title: string }>;
  chartData: ChartDataSets[] = [];
  methodName: string;
  loading = false;
  chartOptions: ChartOptions = {
    responsive: true,
  };
  selectedTypeDiagram: ChartType = 'bar';
  tableData: any;

  constructor(public httpSrv: BamboAbstractService) { }

  ngOnInit(): void {
  }

  setDataChart() {
    throw new Error('Method not implemented');
  }

  buildDiagram() {
    this.loading = true;
    this
      .httpSrv
       [`${this.methodName}`]()
      .pipe(finalize(() => this.loading = false))
      .subscribe((data: any) => {
        this.handlePostFetch(data as T[]);
      }, err => {
        this.httpSrv.httpSrv.handleError(err);
      });
  }

  handlePostFetch(data: T[]) {
    this.rawChartData = data;
    this.setDataChart();
  }

}
