import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AcState, Sensor, AcMode} from '../../../interfaces/sensor';


@Component({
  selector: 'app-ac-control',
  templateUrl: './ac-control.component.html',
  styleUrls: ['./ac-control.component.scss']
})
export class AcControlComponent implements OnInit {
  state: AcState;
  modes: any;
  constructor(
    public dialogRef: MatDialogRef<AcControlComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sensor
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit(): void {
    this.state = JSON.parse(this.data.state);
    // for(const i of Object.keys(AcMode)) {
    //   console.log(i);
    // }
    this.modes = Object.keys(AcMode);
    this.modes = this.modes.filter(i => isNaN(i));
    for(let i of this.modes) {
      if( i === this.state.mode )console.log(i + ' SELSCTED');
    }
  }

}
