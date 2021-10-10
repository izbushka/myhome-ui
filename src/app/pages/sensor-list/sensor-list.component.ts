import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MappedSensors, Sensor, SensorGroup} from '@entities/sensors.interfaces';
import {LoadingStatus} from '@entities/store.interfaces';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {debounceTime} from 'rxjs/operators';

@UntilDestroy()
@Component({
	selector: 'rpi-sensor-list-component',
	templateUrl: './sensor-list.component.html',
	styleUrls: ['./sensor-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorListComponent implements OnInit {
	@Input() sensorGroups: SensorGroup[];
	@Input() sensors: MappedSensors;
	@Input() loadingStatus: LoadingStatus;

	@Output() doSearch = new EventEmitter<string>();
	ctrl = new FormControl();

	public ngOnInit(): void {
		this.ctrl.valueChanges.pipe(debounceTime(200), untilDestroyed(this)).subscribe((val: string) => {
			this.doSearch.emit(val.toLowerCase());
		});
	}

	public trackSensorId(i: number, sensorId: Sensor['id']): Sensor['id'] {
		return sensorId;
	}

	public trackGroup(i: number, group: SensorGroup): Sensor['group'] {
		return group.name;
	}
}
