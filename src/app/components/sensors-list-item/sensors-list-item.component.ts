import { Component, OnInit, Input } from '@angular/core';
import {Sensor} from '../../interfaces/sensor';
import {SensorsService} from '../../services/sensors.service';
import { TimeAgo } from '../../modules/utils.pipe';

@Component({
  selector: 'app-sensors-list-item',
  templateUrl: './sensors-list-item.component.html',
  styleUrls: ['./sensors-list-item.component.scss']
})
export class SensorsListItemComponent implements OnInit {
  @Input() sensor: Sensor;
  isOn = false;
  lastUpdate: string;

  constructor(
    public sensorService: SensorsService
  ) { }

  ngOnInit(): void {
    // console.debug(sensor);
    this.isOn = this.sensor.state === 'ON';
  }

  toggle() {
    console.log(this.isOn);
  }

}
