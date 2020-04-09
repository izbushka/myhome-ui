import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AcControlComponent} from '../../shared/ac-control/ac-control.component';
import {takeWhile} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {SensorsService} from '../../../shared/services/sensors.service';
import {Sensor} from '../../../shared/interfaces/sensor';

@Component({
  selector: 'app-sensor-card',
  templateUrl: './sensor-card.component.html',
  styleUrls: ['./sensor-card.component.scss']
})
export class SensorCardComponent implements OnInit, OnDestroy {
  @Input() id: number;
  sensor: Sensor;
  isAlive = true;
  constructor(
    private sensorService: SensorsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.sensorService.getSensor(this.id)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(sensor => this.sensor = sensor);
  }
  ngOnDestroy(): void {
    this.isAlive = false;
  }

  toggle() {
    // this.sensor-card.state = this.sensor-card.isOn() ? 'OFF' : 'ON';
    this.sensorService.switch(this.sensor.id, !this.sensor.isOn());
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
