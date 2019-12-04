import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GridOptions, ColDef, Module } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { GridService } from '../services/grid.service';
import { RangedLineHeaderComponent } from '../elements/ranged-line-header/ranged-line-header.component';

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
    this.frameworkComponents = {
      rangedLineHeaderComponent: RangedLineHeaderComponent
    };
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
    return {
      onGridSizeChanged: ev => ev.api.sizeColumnsToFit(),
      rowHeight: 50,

      defaultColDef: {
        resizable: true
      },
    };
  }

  private getColumnDefs() {
    return [
      { headerName: 'Publication year', headerClass: 'centredCell', children: [
        { field: 'publicationYear', headerName: '', cellClass: this.grid.getSubHeadingRowCellClass('subHeadingInRow')  }
      ]},
      { headerName: 'First author', children: [
        { field: 'firstAuthor', headerName: ''  }
      ]},
      { headerName: 'Study name', children: [
        { field: 'studyName', headerName: ''  }
      ]},
      { headerName: 'Country', children: [
        { field: 'country', headerName: '', cellRenderer: this.grid.getNationalFlagCellRenderer()  }
      ]},
      { headerName: 'Context', children: [
        { field: 'context', headerName: '', cellClass: 'centredCell' } // todo icon
      ]},
      { headerName: 'Period', children: [
        {
          // todo width needs to be matched in the headerComponent - might not be possible to make this dynamic
          field: '_period',  width: 150, cellRenderer: this.grid.getRangedLineCellRenderer(1982, 2013, 'periodStart', 'periodEnd', false),
          headerComponent: 'rangedLineHeaderComponent', headerComponentParams: {
            start: 1982, end: 2013
          }
        },
      ]},
      { headerName: 'Baseline female %', children: [
        { field: 'baselineFemalePercentage', headerName: '', cellRenderer: this.grid.getZeroFixedLineCellRenderer(100, true) }
      ]},
      { headerName: 'Study type', children: [
        { field: 'studyType', headerName: '', cellClass: 'centredCell'  }
      ]},
      { headerName: 'Used diagnostic criteria', children: [
        { field: 'usedDiagnosticCriteria', headerName: '', cellRenderer: this.grid.getBooleanCellRenderer()  }
      ]},
      { headerName: 'Screened before clinical evaluation', children: [
        { field: 'screenedBeforeClinicalEvaluation', headerName: '', cellRenderer: this.grid.getBooleanCellRenderer()  }
      ]},
      { headerName: '# of follow-ups', children: [
        { field: 'numFollowUps', headerName: '', cellRenderer: this.grid.getNumberByDotsCellRenderer()  }
      ]},
    ];
  }

  private setupRowData() {
    return [
      {
        publicationYear: 'AD'
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
        publicationYear: 'All dementia'
      },
      {
        publicationYear: 1994, firstAuthor: 'Stern', studyName: 'Unknown', country: 'US', context: 'HIC',
        periodStart: null, periodEnd: null,
        studyType: 'PC',
        baselineFemalePercentage: 72.9,
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: false,
        numFollowUpsMin: 1, numFollowUpsMax: 4,
      },
    ];
  }

}
