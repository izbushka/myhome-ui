import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AcState, Sensor, AcMode, AcSwing, AcFan} from '../../../interfaces/sensor';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSliderChange} from '@angular/material/slider';
import {UtilsService} from '../../../modules/utils.service';
import {SensorsService} from '../../../services/sensors.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
