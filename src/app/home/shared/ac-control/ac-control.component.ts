import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AcState, Sensor, AcMode, AcSwing, AcFan} from '../../../shared/interfaces/sensor';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSliderChange} from '@angular/material/slider';
import {UtilsService} from '../../../shared/services/utils.service';
import {SensorsService} from '../../../shared/services/sensors.service';

@Component({
  selector: 'app-ac-control',
  templateUrl: './ac-control.component.html',
  styleUrls: ['./ac-control.component.scss']
})
export class AcControlComponent implements OnInit {
  acForm = new FormGroup({
    state: new FormControl(''),
    temperature: new FormControl(''),
    mode: new FormControl(''),
    fan: new FormControl(''),
    swing: new FormControl(''),
    turbo: new FormControl(''),
  });

  state: AcState;
  modes: any;
  swing: any;
  fan: any;

  constructor(
    public dialogRef: MatDialogRef<AcControlComponent>,
    private sensorsService: SensorsService,
    @Inject(MAT_DIALOG_DATA) public sensor: Sensor
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    if (!UtilsService.compareObjects(this.acForm.value, this.state)) {
      // alert('chandeg');
      this.sensorsService.saveState(this.sensor.id, this.acForm.value);
    }
    this.dialogRef.close(this.sensor);
  }


  ngOnInit(): void {
    // console.debug(this.sensor-card.extraState);
    this.state = this.sensor.extraState;
    // console.debug(this.sensor-card.extraState, this.state);

    this.swing = this.createList(AcSwing);
    this.modes = this.createList(AcMode);
    this.fan = this.createList(AcFan);


    this.acForm.patchValue(this.state);

  }

  createList(tpl: object): string[] {
    const names: any = Object.keys(tpl);
    return names.filter(i => isNaN(i));
  }

  onTemperatureChange(event: MatSliderChange): void {
    this.acForm.patchValue({temperature: event.value});
  }

  acTemperatureFormat(v: number): string {
    return v + '°C';
  }

  toggle() {
    const prevState = this.acForm.get('state').value;
    const newState = prevState === 'off' ? 'on' : 'off';
    this.acForm.patchValue({state: newState});
  }
}
