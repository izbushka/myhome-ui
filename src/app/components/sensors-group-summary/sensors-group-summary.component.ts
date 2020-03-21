import { Component, OnInit, Input } from '@angular/core';
import {Sensor} from '../../interfaces/sensor';
import {SensorsService} from '../../services/sensors.service';


interface SensorStatistic {
  num: number;
  on: number;
  off: number;
  ok: number;
}

@Component({
  selector: 'app-sensors-group-summary',
  templateUrl: './sensors-group-summary.component.html',
  styleUrls: ['./sensors-group-summary.component.scss']
})
export class SensorsGroupSummaryComponent implements OnInit {
  @Input() group: {key: string, value: Sensor[]};
  stat: SensorStatistic = {num: 0, on: 0, off: 0, ok: 0};

  constructor(public sensorsService: SensorsService) { }

  ngOnInit(): void {
    this.getStatistic();
  }

  getStatistic() {
    this.stat.num = this.group.value.length;
    this.stat.on = this.group.value.filter(i => i.state === 'ON').length;
    this.stat.off = this.stat.num - this.stat.on;
    this.stat.ok = this.group.value.filter(i => i.state === i.normal_state || !i.normal_state).length;
  }

}
