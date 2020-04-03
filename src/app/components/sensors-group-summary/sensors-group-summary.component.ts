import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Sensor} from '../../interfaces/sensor';
import {SensorsService} from '../../services/sensors.service';
import {mergeAll, takeWhile} from 'rxjs/operators';
import {BehaviorSubject, merge} from 'rxjs';


// interface SensorStatistic {
//   num: number;
//   on: number;
//   off: number;
//   ok: number;
// }

@Component({
  selector: 'app-sensors-group-summary',
  templateUrl: './sensors-group-summary.component.html',
  styleUrls: ['./sensors-group-summary.component.scss']
})
export class SensorsGroupSummaryComponent implements OnInit, OnDestroy {
  @Input() name: string;
  @Input() sensors: number[];
  stat = { num: 0, off: 0, on: new Map(), ok: new Map() };
  alive = true;

  constructor(public sensorsService: SensorsService) { }

  ngOnInit(): void {
    this.getStatistic();
  }
  ngOnDestroy(): void {
    this.alive = false;
  }

  getStatistic() {
    const sensorSubjects: BehaviorSubject<Sensor>[] = [];
    for (const sensorId of this.sensors) {
      sensorSubjects.push(this.sensorsService.getSensor(sensorId));
    }
    this.stat.num = this.sensors.length;

    merge(...sensorSubjects)
      .pipe(takeWhile(() => this.alive))
      .subscribe(sensor => {
        if (sensor.isOn()) {
          this.stat.on.set(sensor.id, sensor.state);
        } else {
          this.stat.on.delete(sensor.id);
        }
        if (sensor.isWarn()) {
          this.stat.ok.delete(sensor.id);
        } else {
          this.stat.ok.set(sensor.id, sensor.state);
        }
        this.stat.off = this.stat.num - this.stat.on.size;
      });
  }

}
