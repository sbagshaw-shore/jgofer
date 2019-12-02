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
      // onGridReady: ev => this.gridReady(ev, g),
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
        { field: '_period', headerName: '', cellRenderer: this.grid.getRangedLineCellRenderer(1982, 2013, 'periodStart', 'periodEnd', false),
          headerComponent: 'rangedLineHeaderComponent', headerComponentParams: {
            start: 1982, end: 2013
          }
        },
      ]},
      { headerName: 'Study type', children: [
        { field: 'studyType', headerName: '', cellClass: 'centredCell'  }
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
        studyType: 'PC'
      },
      {
        publicationYear: 2001, firstAuthor: 'Tyas', studyName: 'MSHA', country: 'CA', context: 'HIC',
        periodStart: 1991, periodEnd: 1997,
        studyType: 'PC'
      },
      {
        publicationYear: 2002, firstAuthor: 'Kukull', studyName: 'ACT', country: 'US', context: 'HIC',
        periodStart: 1994, periodEnd: 2000,
        studyType: 'PC'
      },
      {
        publicationYear: 'All dementia'
      },
      {
        publicationYear: 1994, firstAuthor: 'Stern', studyName: 'Unknown', country: 'US', context: 'HIC',
        periodStart: null, periodEnd: null,
        studyType: 'PC'
      },
    ];
  }

}
