import { Component, OnInit, Input } from '@angular/core';
import {Sensor} from '../../interfaces/sensor';
import {SensorsService} from '../../services/sensors.service';
import {MatDialog} from '@angular/material/dialog';
import {AcControlComponent} from '../popups/ac-control/ac-control.component';

@Component({
  selector: 'app-sensors-list-item',
  templateUrl: './sensors-list-item.component.html',
  styleUrls: ['./sensors-list-item.component.scss']
})
export class SensorsListItemComponent implements OnInit {
  @Input() sensor: Sensor;

  constructor(
    public sensorService: SensorsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  toggle() {
    // this.sensor.state = this.sensor.isOn() ? 'OFF' : 'ON';
    this.sensorService.switch(this.sensor.id, this.sensor.isOn());
  }

  openAcControl(): void {
    const dialogRef = this.dialog.open(AcControlComponent, {
      width: '500px',
      height: 'fit',
      data: this.sensor
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed', result);
      if (result) {
        this.sensor = result;
      }
    });
  }

}
