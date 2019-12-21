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
      headerHeight: 50,

      defaultColDef: {
        resizable: true,
        cellClass: this.grid.getCellClass(),
        headerClass: 'header'
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
      { headerName: 'Context', field: 'context', isDataCentred: true },
      { headerName: 'Period', field: '_period', cellRenderer: this.grid.getRangedLineCellRenderer(1982, 2013, 'periodStart', 'periodEnd', false, 'Unclear') },
      { headerName: 'Study type', field: 'studyType', isDataCentred: true },
      { headerName: 'Sampling', field: 'sampling', isDataCentred: true },
      { headerName: 'Population recruited', field: 'populationRecruited', isDataCentred: true },
      { headerName: 'Sample age recruited', field: '_sampleAgeRecruited', cellRenderer: this.grid.getRangedLineCellRenderer(60, 100, 'sampleAgeRecruitedStart', 'sampleAgeRecruitedEnd', false, 'Unclear') },
      { headerName: 'Contributing #', field: 'contributingNumber', cellRenderer: this.grid.getZeroFixedLineCellRenderer(4400, false) },
      { headerName: 'Baseline female %', field: 'baselineFemalePercentage', cellRenderer: this.grid.getZeroFixedLineCellRenderer(100, false) },
      { headerName: 'Sample age mean (SD)', field: 'sampleAgeMean',  },
      { headerName: 'Used diagnostic criteria', field: 'usedDiagnosticCriteria', cellRenderer: this.grid.getBooleanCellRenderer() },
      { headerName: 'Screened before clinical evaluation', field: 'screenedBeforeClinicalEvaluation', cellRenderer: this.grid.getBooleanCellRenderer() },
      { headerName: '# of follow-ups', field: 'numFollowUps',  cellRenderer: this.grid.getNumberByDotsCellRenderer()  }
    ];
  }

  private setupRowData() {
    const headerFooter = {
      isFakeHeader: true,
      periodStart: 1982, periodEnd: 2013, // the entire range
      sampleAgeRecruitedStart: 60, sampleAgeRecruitedEnd: 100, // the entire range
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
        sampling: 'Random',
        populationRecruited: 'Health-related',
        sampleAgeRecruitedStart: 65, sampleAgeRecruitedEnd: 100,
        contributingNumber: 642,
        baselineFemalePercentage: 56.4,
        sampleAgeMean: 'Not reported',
        usedDiagnosticCriteria: true, screenedBeforeClinicalEvaluation: false,
        numFollowUpsMin: 1, numFollowUpsMax: 2,
      },
      {
        publicationYear: 2001, firstAuthor: 'Tyas', studyName: 'MSHA', country: 'CA', context: 'HIC',
        periodStart: 1991, periodEnd: 1997,
        studyType: 'PC',
        sampling: 'Random',
        populationRecruited: 'Non-specific',
        sampleAgeRecruitedStart: 65, sampleAgeRecruitedEnd: 100,
        contributingNumber: 694,
        baselineFemalePercentage: 62.4,
        sampleAgeMean: '74.0 (5.8)',
        usedDiagnosticCriteria: true, screenedBeforeClinicalEvaluation: true,
        numFollowUpsMin: 1, numFollowUpsMax: 1,
      },
      {
        publicationYear: 2002, firstAuthor: 'Kukull', studyName: 'ACT', country: 'US', context: 'HIC',
        periodStart: 1994, periodEnd: 2000,
        studyType: 'PC',
        sampling: 'Random',
        populationRecruited: 'Non-specific',
        sampleAgeRecruitedStart: 65, sampleAgeRecruitedEnd: 100,
        contributingNumber: 2356,
        baselineFemalePercentage: 59,
        sampleAgeMean: '79.4 with dementia<br/> 74.0 without dementia',
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
        sampling: 'Volunteer',
        populationRecruited: 'Non-specific',
        sampleAgeRecruitedStart: 60, sampleAgeRecruitedEnd: 99,
        contributingNumber: 583,
        baselineFemalePercentage: 72.9,
        sampleAgeMean: '74.0 (7.6)',
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: false,
        numFollowUpsMin: 1, numFollowUpsMax: 4,
      },
      {
        publicationYear: 1997, firstAuthor: 'Schmand', studyName: 'AMSTEL', country: 'NL', context: 'HIC',
        periodStart: null, periodEnd: null,
        studyType: 'PC',
        sampling: 'Unclear',
        populationRecruited: 'Health-related',
        sampleAgeRecruitedStart: 65, sampleAgeRecruitedEnd: 84,
        contributingNumber: 2063,
        baselineFemalePercentage: 62.6,
        sampleAgeMean: 'Normal: 74.1 (5.5); Cases: 77.5 (5.0)',
        usedDiagnosticCriteria: false,  screenedBeforeClinicalEvaluation: false,
        numFollowUpsMin: 1, numFollowUpsMax: 1,
      },
      {
        publicationYear: 2002, firstAuthor: 'Kukull', studyName: 'ACT', country: 'US', context: 'HIC',
        periodStart: 1994, periodEnd: 2000,
        studyType: 'PC',
        sampling: 'Random',
        populationRecruited: 'Health-related',
        sampleAgeRecruitedStart: 65, sampleAgeRecruitedEnd: 100,
        contributingNumber: 2356,
        baselineFemalePercentage: 59,
        sampleAgeMean: '79.4 with dementia, 74.0 without dementia',
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: true,
        numFollowUpsMin: 1, numFollowUpsMax: 2,
      }
    ];

    data.push(headerFooter);
    data.splice(0, 0, headerFooter);

    return data;
  }

}
