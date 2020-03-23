import { Component, OnInit, Input } from '@angular/core';
import {Sensor} from '../../interfaces/sensor';
import {SensorsService} from '../../services/sensors.service';

@Component({
  selector: 'app-sensors-list-item',
  templateUrl: './sensors-list-item.component.html',
  styleUrls: ['./sensors-list-item.component.scss']
})
export class SensorsListItemComponent implements OnInit {
  @Input() sensor: Sensor;

  constructor(
    public sensorService: SensorsService
  ) { }

  ngOnInit(): void {
  }

  toggle() {
    this.sensor.state = this.sensor.isOn() ? 'OFF' : 'ON';
    this.sensorService.switch(this.sensor.id, this.sensor.isOn());
  }

}
