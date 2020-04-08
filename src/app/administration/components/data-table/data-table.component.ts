import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Subject} from 'rxjs';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnDestroy {
  isAlive = true;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() data: Subject<any>;
  table: Array<any>;
  columnPriority = ['sensor_id', 'action_id', 'name', 'group', 'type'];
  columns: Array<any>;
  columnOverflow = ['sensor'];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];

  constructor() { }

  ngOnInit(): void {
    this.data.pipe(
      takeWhile(() => this.isAlive)
    ).subscribe(data => {
      if (!data) {
        this.table = null;
      } else {
        this.columns = [...Object.keys(data[0])].map(row => {
          return {
            name: row,
            value: (element: any) => element[row]
          };
        }).sort(
          (a, b) => this.columnSorter(a.name, b.name)
        );
        this.table = data;
        this.displayedColumns = this.columns.map(c => c.name);
        this.dataSource = new MatTableDataSource(this.table);
        this.dataSource.sort = this.sort;
      }
    });
  }
  ngOnDestroy(): void {
    this.isAlive = false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  columnSorter(a, b): number {
    let aP = this.columnPriority.indexOf(a);
    let bP = this.columnPriority.indexOf(b);
    if (aP < 0 && bP < 0) {
      return b.localeCompare(a);
    }
    if (aP < 0) {
      aP = 100;
    }
    if (bP < 0) {
      bP = 100;
    }
    return aP - bP;
  }

}
