import { Component, OnInit } from '@angular/core';
import {AdministrationService} from '../../administration.service';
import {DbSensors} from '../../db-sensors';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {delay} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-administration-sensors',
  templateUrl: './administration-tables.component.html',
  styleUrls: ['./administration-tables.component.scss']
})
export class AdministrationTablesComponent implements OnInit {
  data: Subject<any> = new Subject<any>();
  tables = ['sensors', 'actions', 'sensors_actions', 'commands'];

  constructor(
    private serverConfig: AdministrationService
  ) { }

  ngOnInit(): void {
    this.data.next(null);
    this.getTableData('sensors');
  }

  getTableData(table: string): void {
    this.data.next(null);
    this.serverConfig.getTable(table).subscribe(data => this.data.next(data));
  }

  onLinkClick(event: MatTabChangeEvent) {
    // console.log('event => ', event);
    console.log('index => ', event.index);
    // console.log('tab => ', event.tab);
    this.getTableData(this.tables[event.index]);

  }
}
