import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GridOptions, ColDef, Module } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { GridService } from '../services/grid.service';

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

  constructor(private route: ActivatedRoute, private grid: GridService) {

    this.columnDefs = this.getColumnDefs();
    // this.frameworkComponents = {
    //   rangedLineHeaderComponent: RangedLineHeaderComponent
    // };
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        of([params.get('id')])
      )
    ).subscribe(p => {
      this.id$ = +p[0];
    });

    this.gridOptions = this.getGridOptions();
    this.rowData = this.setupRowData();
  }

  private getGridOptions(): GridOptions {
    const gridOptions: GridOptions = {
      onGridSizeChanged: ev => ev.api.sizeColumnsToFit(),

      defaultColDef: {
        resizable: true,
        cellClass: this.grid.getCellClass()
      },
    };

    gridOptions.getRowHeight = (params) => params.data.isFakeHeader ? 30 : 50;
    return gridOptions;
  }

  private getColumnDefs() {
    return [
      { headerName: 'Publication year', field: 'publicationYear', isSubHeadingInColumn: true  },
      { headerName: 'First author', field: 'firstAuthor' },
      { headerName: 'Study name', field: 'studyName' },
      { headerName: 'Country', field: 'country', cellRenderer: this.grid.getNationalFlagCellRenderer() },
      { headerName: 'Context', field: 'context' },
      { headerName: 'Period', field: '_period', cellRenderer: this.grid.getRangedLineCellRenderer(1982, 2013, 'periodStart', 'periodEnd', false) },
      /*
      headerComponent: 'rangedLineHeaderComponent', headerComponentParams: {
            start: 1982, end: 2013
          }
      */
      { headerName: 'Baseline female %', field: 'baselineFemalePercentage', cellRenderer: this.grid.getZeroFixedLineCellRenderer(100, true) },
      { headerName: 'Study type', field: 'studyType', isDataCentred: true },
      { headerName: 'Used diagnostic criteria', field: 'usedDiagnosticCriteria', cellRenderer: this.grid.getBooleanCellRenderer() },
      { headerName: 'Screened before clinical evaluation', field: 'screenedBeforeClinicalEvaluation', cellRenderer: this.grid.getBooleanCellRenderer() },
      { headerName: '# of follow-ups', field: 'numFollowUps',  cellRenderer: this.grid.getNumberByDotsCellRenderer()  }
    ];
  }

  private setupRowData() {
    const headerFooter = {
      isFakeHeader: true,
      periodStart: 1982, periodEnd: 2013, // the entire range
    };

    const data: any[] = [
      {
        publicationYear: 'AD',
        isSubCategoryRow: true
      },
      {
        publicationYear: 1997, firstAuthor: 'Evans', studyName: 'Unknown', country: 'US', context: 'HIC',
        periodStart: 1982, periodEnd: 1987,
        studyType: 'PC',
        baselineFemalePercentage: 56.4,
        usedDiagnosticCriteria: true, screenedBeforeClinicalEvaluation: false,
        numFollowUpsMin: 1, numFollowUpsMax: 2,
      },
      {
        publicationYear: 2001, firstAuthor: 'Tyas', studyName: 'MSHA', country: 'CA', context: 'HIC',
        periodStart: 1991, periodEnd: 1997,
        studyType: 'PC',
        baselineFemalePercentage: 62.4,
        usedDiagnosticCriteria: true, screenedBeforeClinicalEvaluation: true,
        numFollowUpsMin: 1, numFollowUpsMax: 1,
      },
      {
        publicationYear: 2002, firstAuthor: 'Kukull', studyName: 'ACT', country: 'US', context: 'HIC',
        periodStart: 1994, periodEnd: 2000,
        studyType: 'PC',
        baselineFemalePercentage: 59,
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: true,
        numFollowUpsMin: 1, numFollowUpsMax: 2,
      },
      {
        publicationYear: 'All dementia',
        isSubCategoryRow: true
      },
      {
        publicationYear: 1994, firstAuthor: 'Stern', studyName: 'Unknown', country: 'US', context: 'HIC',
        periodStart: null, periodEnd: null,
        studyType: 'PC',
        baselineFemalePercentage: 72.9,
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: false,
        numFollowUpsMin: 1, numFollowUpsMax: 4,
      }
    ];

    data.push(headerFooter);
    data.splice(0, 0, headerFooter);

    return data;
  }

}
