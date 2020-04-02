import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Sensor} from '../../interfaces/sensor';
import {SensorsService} from '../../services/sensors.service';
import {MatDialog} from '@angular/material/dialog';
import {AcControlComponent} from '../popups/ac-control/ac-control.component';
import {BehaviorSubject} from 'rxjs';
import {takeUntil, takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-sensors-list-item',
  templateUrl: './sensors-list-item.component.html',
  styleUrls: ['./sensors-list-item.component.scss']
})
export class SensorsListItemComponent implements OnInit, OnDestroy {
  @Input() id: number;
  sensor: Sensor;
  alive = true;
  constructor(
    public sensorService: SensorsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.sensorService.getSensor(this.id)
      .pipe(takeWhile(() => this.alive))
      .subscribe(sensor => this.sensor = sensor);
  }
  ngOnDestroy(): void {
    this.alive = false;
  }

  toggle() {
    // this.sensor.state = this.sensor.isOn() ? 'OFF' : 'ON';
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
