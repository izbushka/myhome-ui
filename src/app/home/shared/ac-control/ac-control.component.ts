import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AcFan, AcMode, AcState, AcSwing, Sensor, SwOnOff} from '../../../shared/interfaces/sensor';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSliderChange} from '@angular/material/slider';
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
    // do not check changes - it ok to turn on/off twice
    // if (!UtilsService.compareObjects(this.acForm.value, this.state)) {
    this.sensorsService.saveState(this.sensor.id, this.acForm.value);
    this.dialogRef.close(this.sensor);
  }


  ngOnInit(): void {
    // console.debug(this.sensor-card.extraState);
    this.state = this.sensor.extraState;

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
    const newState = prevState === SwOnOff.off ? SwOnOff.on : SwOnOff.off;
    this.acForm.patchValue({state: newState});
  }

  toggleTurbo() {
    const prevState = this.acForm.get('turbo').value;
    const newState = prevState === SwOnOff.off ? SwOnOff.on : SwOnOff.off;
    this.acForm.patchValue({turbo: newState});
  }
}
