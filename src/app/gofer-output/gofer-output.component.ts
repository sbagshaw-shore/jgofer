import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GridOptions, ColDef, Module } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { GridService } from '../services/grid.service';
import { DataService } from '../services/data.service';
import { ColumnService } from '../services/column.service';

@Component({
  selector: 'app-gofer-output',
  templateUrl: './gofer-output.component.html',
  styleUrls: ['./gofer-output.component.scss'],

  encapsulation: ViewEncapsulation.None
})
export class GoferOutputComponent implements OnInit {
  id$: number;
  gridOptions: GridOptions;
  columnDefs: ColDef[];
  rowData: any[];
  modules: Module[] = [ClientSideRowModelModule];
  public frameworkComponents: any;
  rowHeight = 50;

  constructor(private route: ActivatedRoute, private grid: GridService, private data: DataService, private column: ColumnService) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        of([params.get('id')])
      )
    ).subscribe(p => {
      this.id$ = +p[0];
    });

    this.columnDefs = this.getColumnDefs();
    this.rowData = this.setupRowData();
    this.gridOptions = this.getGridOptions();
  }

  private getGridOptions(): GridOptions {
    const gridOptions: GridOptions = {
      onGridSizeChanged: ev => ev.api.sizeColumnsToFit(),
      headerHeight: this.rowHeight,
      suppressPropertyNamesCheck: true,

      defaultColDef: {
        resizable: true,
        cellClass: this.grid.getCellClass(),
        headerClass: 'header',
        cellStyle: (params) => this.getCellStyle(params),
        width: 80
      },
    };

    gridOptions.getRowHeight = (params) => this.getRowHeight(params.data);
    return gridOptions;
  }

  private getCellStyle(params): any {
    if (!params.colDef.isCategory || params.data.isFakeHeader) { return null; }

    const val = params.data[params.colDef.field];
    if (!val) {
      return {
        height: '0'
      };
    }

    return { height: `${ this.getRowHeightForCategory(val) }px` };
  }

  // calculates how many in the current category based on (correctly sorted) data
  private getRowHeightForCategory(val: string): number {
    let index = this.rowData.findIndex(x => x.category === val); // start here
    let height = 0;

    while (true && index < this.rowData.length) {
      const record = this.rowData[index];
      if ((record.category && record.category !== val) || record.isAverageRow || record.isFakeHeader) {
        break;
      }

      height += this.getRowHeight(record);
      index++;
    }

    return height;
  }

  private getRowHeight(record: any) {
    // return record.isFakeHeader || record.isSubcategoryRow ? 30 : this.rowHeight;
    return record.isFakeHeader ? 30 : this.rowHeight;
  }

  private getColumnDefs() {
    let columnDefs: any[] = [];

    switch (this.id$) {
      case 1:
        columnDefs = this.column.getContinuousColumns();
        break;

      case 2:
        columnDefs = this.column.getDichotomousColumns();
        break;

      case 3:
      case 4:
      case 5:
      case 6:
        columnDefs = this.column.getCategoricalColumns(this.id$);
        break;
    }

    return columnDefs;
  }

  private setupRowData() {
    const headerFooter = {
      isFakeHeader: true,
      period: [1982, 2013], // the entire range
      sampleAgeRecruited: [65, 100], // the entire range
    };

    let data: any[] = [];
    switch (this.id$) {
      case 1:
        data = this.data.getContinuousData();
        break;

      case 2:
        data = this.data.getDichotomousData();
        break;

      case 3:
        data = this.data.getCategoricalDataAlzheimers();
        break;

      case 4:
        data = this.data.getCategoricalDataAllDementia();
        break;

      case 5:
        data = this.data.getCategoricalDataVascularDementia();
        break;

        case 6:
          data = this.data.getCategoricalDataMCI();
          break;
    }

    data.push(headerFooter);
    data.splice(0, 0, headerFooter);

    return data;
  }

}
