import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  // TODO: add types generic to data
  @Input() columns: string[] = [];
  @Input() data: any[] = [];

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.dataSource.data = this.data;
    this.displayedColumns = this.columns;
  }
}
