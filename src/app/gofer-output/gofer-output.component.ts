import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GridOptions, ColDef, Module } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { GridService } from '../services/grid.service';

@Component({
  selector: 'app-gofer-output',
  templateUrl: './gofer-output.component.html',
  styleUrls: ['./gofer-output.component.scss']
})
export class GoferOutputComponent implements OnInit {
  id$: number;
  gridOptions: GridOptions;
  columnDefs: ColDef[];
  rowData: any[];
  modules: Module[] = [ClientSideRowModelModule];

  constructor(private route: ActivatedRoute, private grid: GridService) { }


  ngOnInit() {
    console.log('jgjg1', this.id$)
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        of([params.get('id')])
      )
    ).subscribe(p => {
      this.id$ = +p[0];
    });

    this.gridOptions = this.getGridOptions();
    this.rowData = this.setupRowData();
    this.columnDefs = this.getColumnDefs();
    console.log('jgjg2', this.id$)
  }

  private getGridOptions(): GridOptions {
    return {
      // onGridReady: ev => this.gridReady(ev, g),
      onGridSizeChanged: ev => ev.api.sizeColumnsToFit(),
      rowHeight: 50,

      defaultColDef: {
        resizable: true
      }
    };
  }

  private getColumnDefs() {
    return [
      { field: 'typeOfDisorder', headerName: 'Type of disorder'  },
      { field: 'publicationYear', headerName: 'Publication year'  },
      { field: 'firstAuthor', headerName: 'First author'  },
      { field: 'studyName', headerName: 'Study name'  },
      { field: 'country', headerName: 'Country', cellRenderer: this.grid.getNationalFlagCellRenderer() },
      { field: 'context', headerName: 'Context', cellClass: 'centredCell'  },
      { field: '_period', headerName: 'Period', cellRenderer: this.grid.getRangedLineCellRenderer(1982, 2013, 'periodStart', 'periodEnd') },
      { field: 'studyType', headerName: 'Study type', cellClass: 'centredCell' },
      // { field: '', headerName: ''  },
      // { field: '', headerName: ''  },
      // { field: '', headerName: ''  },
      // { field: '', headerName: ''  },
      // { field: '', headerName: ''  },
      // { field: '', headerName: ''  },
      // { field: '', headerName: ''  },
    ];
  }

  private setupRowData() {
    return [
      {
        typeOfDisorder: 'AD', publicationYear: 1997, firstAuthor: 'Evans', studyName: 'Unknown', country: 'US', context: 'HIC',
        periodStart: 1982, periodEnd: 1987,
        studyType: 'PC'
      },
      {
        typeOfDisorder: 'AD', publicationYear: 2001, firstAuthor: 'Tyas', studyName: 'MSHA', country: 'CA', context: 'HIC',
        periodStart: 1991, periodEnd: 1997,
        studyType: 'PC'
      },
      {
        typeOfDisorder: 'AD', publicationYear: 2002, firstAuthor: 'Kukull', studyName: 'ACT', country: 'US', context: 'HIC',
        periodStart: 1994, periodEnd: 2000,
        studyType: 'PC'
      },
    ];
  }

}
