import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {BehaviorSubject, merge} from 'rxjs';
import {Sensor} from '../../../shared/interfaces/sensor';
import {SensorsService} from '../../../shared/services/sensors.service';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss'],
  // changeDetection: ChangeDetectionStrategy.Default,
})
export class GroupCardComponent implements OnInit, OnDestroy {
  @Input() name: string;
  @Input() sensors: number[];
  icon: string;

  stat = { num: 0, off: 0, on: new Map(), ok: new Map() };
  isAlive = true;

  constructor(
    private sensorsService: SensorsService,
  ) { }

  ngOnInit(): void {
    this.getStatistic();
    this.icon = this.sensorsService.getGroupIcon(this.name);
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

  getStatistic(): void {
    const sensorSubjects: BehaviorSubject<Sensor>[] = [];
    for (const sensorId of this.sensors) {
      sensorSubjects.push(this.sensorsService.getSensor(sensorId));
    }
    this.stat.num = this.sensors.length;

    merge(...sensorSubjects)
      .pipe(takeWhile(() => this.isAlive))
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
