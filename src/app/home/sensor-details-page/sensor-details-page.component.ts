import {Component, OnDestroy, OnInit} from '@angular/core';
import {Sensor, SensorGraphPoint} from '../../shared/interfaces/sensor';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {SensorsService} from '../../shared/services/sensors.service';
import {PagePropertiesService} from '../../shared/services/page-properties.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-sensor-details-page',
  templateUrl: './sensor-details-page.component.html',
  styleUrls: ['./sensor-details-page.component.scss']
})
export class SensorDetailsPageComponent implements OnInit, OnDestroy {
  id: number;
  sensor: Sensor;
  graphData: SensorGraphPoint[];
  curGraph = 'day';
  hasGraph = false;
  displayedColumns: string[] = ['change_time', 'state'];

  lineChartData: ChartDataSets[] = [
    {data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices'},
  ];
  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];


  lineChartOptions = { // https://www.chartjs.org/docs/latest/configuration/elements.html#point-styles
    responsive: true,
    elements: {
      point: {
        pointStyle: 'dash',
        borderWidth: 0
      },
      line: {
        borderWidth: 1,
      }
    }
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#7b1fa2',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  prepareGraph(data: SensorGraphPoint[]): void {
    this.hasGraph = this.hasGraph || data.length > 0;
    this.graphData = data;
    this.lineChartData = [
      {
        data: data.map(item => item.value),
        label: this.sensor.name
      }
    ];
    this.lineChartLabels = data.map(item => item.date + ' ' + item.time.substr(0, 5));

  }

  getGraph(period: string): void {
    this.curGraph = period;
    this.sensorsService.graph(this.id, period)
      .subscribe(graph => this.prepareGraph(graph));
  }

  toggle() {
    this.sensor.state = this.sensor.isOn() ? 'OFF' : 'ON';
    this.sensorsService.switch(this.sensor.id, this.sensor.isOn());
    setTimeout(() => this.update(), 1000);
  }

  update() {
    this.sensorsService.details(this.id)
      .subscribe(sensor => {
        this.sensor = sensor;
        this.pagePropertyService.set('title', sensor.name);
      });
    this.getGraph('day');
  }

  constructor(
    private sensorsService: SensorsService,
    private pagePropertyService: PagePropertiesService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id');
      this.update();
    });
  }

  ngOnDestroy(): void {
  }
}
