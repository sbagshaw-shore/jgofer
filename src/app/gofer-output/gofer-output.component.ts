import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GridOptions, ColDef, Module } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { GridService } from '../services/grid.service';
import { LowMedHigh } from '../services/enums';

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
      headerHeight: this.rowHeight,
      suppressPropertyNamesCheck: true,

      defaultColDef: {
        resizable: true,
        cellClass: this.grid.getCellClass(),
        headerClass: 'header',
        cellStyle: (params) => this.getCellStyle(params)
      },
    };

    gridOptions.getRowHeight = (params) => params.data.isFakeHeader || params.data.isAverageRow ? 30 : this.rowHeight;
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

    // background-color: white; border-top: 1px solid #D6D6D6 !important;  border-bottom: 0px solid #fff !important;

    return { height: `${ this.getRowSpanForCategory(val) * this.rowHeight }px` };
  }

  // JANET: enter numbers of rows for each category within the type
  private getRowSpanForCategory(val: string): number {
    if (this.id$ === 1) { // continuous
      if (val === 'AD') {
        return 3;
      }
      if (val === 'All dementia') {
        return 6;
      }
    }

    return 1;
  }

  private getColumnDefs() {
    return [
      {
         // specify 'category' in the data for ONLY the first row of each category
        headerName: '', field: 'category', isCategory: true, width: 100
      },
      // use isSubHeadingInColumn if having category headers on their own rows -
      // { headerName: 'Publication year', field: 'publicationYear', isSubHeadingInColumn: true  }, --
      { headerName: 'Publication year', field: 'publicationYear', isSubHeadingInColumn: true  },
      { headerName: 'First author', field: 'firstAuthor' },
      { headerName: 'Study name', field: 'studyName' },
      { headerName: 'Country', field: 'country', cellRenderer: this.grid.getNationalFlagCellRenderer() },
      { headerName: 'Context', field: 'context', isDataCentred: true },
      { headerName: 'Period', field: 'period', cellRenderer: this.grid.getRangedLineCellRenderer(1982, 2013, true, 'Unclear'), width: 400 },
      { headerName: 'Study type', field: 'studyType', isDataCentred: true },
      { headerName: 'Sampling', field: 'sampling', isDataCentred: true },
      { headerName: 'Population recruited', field: 'populationRecruited', isDataCentred: true },
      { headerName: 'Sample age recruited', field: 'sampleAgeRecruited', cellRenderer: this.grid.getRangedLineCellRenderer(60, 100, true, 'Unclear'), width: 400 },
      { headerName: 'Contributing #', field: 'contributingNumber', isDataCentred: true },
      { headerName: 'Baseline female %', field: 'baselineFemalePercentage', cellRenderer: this.grid.getBinaryCategoryCellRenderer(['F', 'M']) },
      { headerName: 'Sample age mean (SD)', field: 'sampleAgeMean', cellRenderer: this.grid.getMultilineTextCellRenderer(), isDataMultiline: true, width: 270 },
      { headerName: 'Baseline education of sample', field: 'baselineEducation', cellRenderer: this.grid.getMultilineTextCellRenderer(), isDataMultiline: true, width: 270 },
      { headerName: 'Used diagnostic criteria?', field: 'usedDiagnosticCriteria', cellRenderer: this.grid.getBooleanCellRenderer() },
      { headerName: 'Screened?', field: 'screenedBeforeClinicalEvaluation', cellRenderer: this.grid.getBooleanCellRenderer() },
      { headerName: '# of follow-ups', field: 'numFollowUps', cellRenderer: this.grid.getNumberByDotsCellRenderer()  },
      { headerName: 'Follow-up years', field: 'followUpYears', isDataMultiline: true, width: 230 },
      { headerName: 'Risk of bias', field: 'riskOfBias', cellRenderer: this.grid.getLowMediumHighCellRenderer() },
      { headerName: '# incident cases', field: 'numberIncidentCases', isDataCentred: true },
      { headerName: 'Measure of effect', field: 'measureOfEffect' },
      { headerName: 'Adjusted for', field: 'adjustedFor', cellRenderer: this.grid.getMultilineTextCellRenderer(), isDataMultiline: true, width: 350 },
      { headerName: 'Effect size', field: 'effectSize', cellRenderer: this.grid.getConfidenceCellRenderer(0.5, 1.5), width: 600 },
      { headerName: 'Weight', field: 'weight' }
    ];
  }

  private setupRowData() {
    const headerFooter = {
      isFakeHeader: true,
      period: [1982, 2013], // the entire range
      sampleAgeRecruited: [65, 100], // the entire range
    };

    const data: any[] = [
      // below is to create a line that displays only the cols specified and others are blank
      // {
      //   publicationYear: 'AD',
      //   isSubCategoryRow: true
      // },
      {
        category: 'AD',
        publicationYear: 1997, firstAuthor: 'Evans', studyName: 'Unknown', country: 'US', context: 'HIC',
        period: [1982, 1987],
        studyType: 'PC',
        sampling: 'Random',
        populationRecruited: 'Health-related',
        sampleAgeRecruited: [65, 100],
        contributingNumber: 642,
        baselineFemalePercentage: 56.4,
        sampleAgeMean: 'Not reported',
        baselineEducation: 'Not reported',
        usedDiagnosticCriteria: true, screenedBeforeClinicalEvaluation: false,
        numFollowUpsMin: 1, numFollowUpsMax: 2,
        followUpYears: 'Average 4.3',
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 151,
        measureOfEffect: 'OR',
        adjustedFor: 'Follow-up interval, age, sex, occupation, income',
        effectSize: [0.85, 0.754, 0.95],
        weight: ''
      },
      {
        publicationYear: 2001, firstAuthor: 'Tyas', studyName: 'MSHA', country: 'CA', context: 'HIC',
        period: [1991, 1997],
        studyType: 'PC',
        sampling: 'Random',
        populationRecruited: 'Non-specific',
        sampleAgeRecruited: [65, 100],
        contributingNumber: 694,
        baselineFemalePercentage: 62.4,
        sampleAgeMean: '74.0 (5.8)',
        baselineEducation: '10.6 (3.2)',
        usedDiagnosticCriteria: true, screenedBeforeClinicalEvaluation: true,
        numFollowUpsMin: 1, numFollowUpsMax: 1,
        followUpYears: '5',
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 194,
        measureOfEffect: 'RR',
        adjustedFor: 'Age, sex',
        effectSize: [0.86, 0.76, 0.96],
        weight: ''
      },
      {
        publicationYear: 2002, firstAuthor: 'Kukull', studyName: 'ACT', country: 'US', context: 'HIC',
        period: [1994, 2000],
        studyType: 'PC',
        sampling: 'Random',
        populationRecruited: 'Non-specific',
        sampleAgeRecruited: [65, 100],
        contributingNumber: 2356,
        baselineFemalePercentage: 59,
        sampleAgeMean: '79.4 w/ dementia<br/>74.0 w/o dementia',
        baselineEducation: '12.8 w/ dementia<br/>13.9 w/o dementia',
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: true,
        numFollowUpsMin: 1, numFollowUpsMax: 2,
        followUpYears: 'Presume 4',
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 74,
        measureOfEffect: 'RaR',
        adjustedFor: 'Age, sex, APOE',
        effectSize: [0.91, 0.86, 0.97],
        weight: ''
      },
      {
        isAverageRow: true,
        // JANET: these are fake numbers
        effectSize: [0.96, 0.75, 1.17, true], // true indicates this is an average of other values
      },
      // {
      //   publicationYear: 'All dementia',
      //   isSubCategoryRow: true
      // },
      {
        category: 'All dementia',
        publicationYear: 1994, firstAuthor: 'Stern', studyName: 'Unknown', country: 'US', context: 'HIC',
        period: [null, null],
        studyType: 'PC',
        sampling: 'Volunteer',
        populationRecruited: 'Non-specific',
        sampleAgeRecruited: [60, 99],
        contributingNumber: 583,
        baselineFemalePercentage: 72.9,
        sampleAgeMean: '74.0 (7.6)',
        baselineEducation: '9.6 (4.7)',
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: false,
        numFollowUpsMin: 1, numFollowUpsMax: 4,
        followUpYears: '1 to 4',
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 106,
        measureOfEffect: 'HR',
        adjustedFor: 'Age, gender',
        effectSize: [0.92, 0.88, 0.95],
        weight: ''
      },
      {
        publicationYear: 1997, firstAuthor: 'Schmand', studyName: 'AMSTEL', country: 'NL', context: 'HIC',
        period: [null, null],
        studyType: 'PC',
        sampling: 'Unclear',
        populationRecruited: 'Health-related',
        sampleAgeRecruited: [65, 84],
        contributingNumber: 2063,
        baselineFemalePercentage: 62.6,
        sampleAgeMean: 'Normal: 74.1 (5.5)<br/>Cases: 77.5 (5.0)',
        baselineEducation: 'Normal: 9.1 (3.0)<br/>Cases: 8.0 (1.8)',
        usedDiagnosticCriteria: false,  screenedBeforeClinicalEvaluation: false,
        numFollowUpsMin: 1, numFollowUpsMax: 1,
        followUpYears: '1',
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 152,
        measureOfEffect: 'OR',
        adjustedFor: 'Age, gender, pre-morbid intelligence, occupation, comorbidity, family history',
        effectSize: [0.86, 0.57, 1.31],
        weight: ''
      },
      {
        publicationYear: 2002, firstAuthor: 'Kukull', studyName: 'ACT', country: 'US', context: 'HIC',
        period: [1994, 2000],
        studyType: 'PC',
        sampling: 'Random',
        populationRecruited: 'Health-related',
        sampleAgeRecruited: [65, 100],
        contributingNumber: 2356,
        baselineFemalePercentage: 59,
        sampleAgeMean: '79.4 w/ dementia<br/>74.0 w/o dementia',
        baselineEducation: '12.8 w/ dementia<br/>13.9 w/o dementia',
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: true,
        numFollowUpsMin: 1, numFollowUpsMax: 2,
        followUpYears: '1 to 2',
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 215,
        measureOfEffect: 'RaR',
        adjustedFor: 'Age, sex, APOE',
        effectSize: [0.94, 0.9, 0.99],
        weight: ''
      }


      ,
      {
        publicationYear: 2002, firstAuthor: 'Kukull', studyName: 'ACT', country: 'US', context: 'HIC',
        period: [1994, 2000],
        studyType: 'PC',
        sampling: 'Random',
        populationRecruited: 'Health-related',
        sampleAgeRecruited: [65, 100],
        contributingNumber: 2356,
        baselineFemalePercentage: 59,
        sampleAgeMean: '79.4 w/ dementia<br/>74.0 w/o dementia',
        baselineEducation: '12.8 w/ dementia<br/>13.9 w/o dementia',
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: true,
        numFollowUpsMin: 1, numFollowUpsMax: 2,
        followUpYears: '1 to 2',
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 215,
        measureOfEffect: 'RaR',
        adjustedFor: 'Age, sex, APOE',
        effectSize: [0.94, 0.9, 0.99],
        weight: ''
      },
      {
        publicationYear: 2002, firstAuthor: 'Kukull', studyName: 'ACT', country: 'US', context: 'HIC',
        period: [1994, 2000],
        studyType: 'PC',
        sampling: 'Random',
        populationRecruited: 'Health-related',
        sampleAgeRecruited: [65, 100],
        contributingNumber: 2356,
        baselineFemalePercentage: 59,
        sampleAgeMean: '79.4 w/ dementia<br/>74.0 w/o dementia',
        baselineEducation: '12.8 w/ dementia<br/>13.9 w/o dementia',
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: true,
        numFollowUpsMin: 1, numFollowUpsMax: 2,
        followUpYears: '1 to 2',
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 215,
        measureOfEffect: 'RaR',
        adjustedFor: 'Age, sex, APOE',
        effectSize: [0.94, 0.9, 0.99],
        weight: ''
      },
      {
        publicationYear: 2002, firstAuthor: 'Kukull', studyName: 'ACT', country: 'US', context: 'HIC',
        period: [1994, 2000],
        studyType: 'PC',
        sampling: 'Random',
        populationRecruited: 'Health-related',
        sampleAgeRecruited: [65, 100],
        contributingNumber: 2356,
        baselineFemalePercentage: 59,
        sampleAgeMean: '79.4 w/ dementia<br/>74.0 w/o dementia',
        baselineEducation: '12.8 w/ dementia<br/>13.9 w/o dementia',
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: true,
        numFollowUpsMin: 1, numFollowUpsMax: 2,
        followUpYears: '1 to 2',
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 215,
        measureOfEffect: 'RaR',
        adjustedFor: 'Age, sex, APOE',
        effectSize: [0.94, 0.9, 0.99],
        weight: ''
      },
      {
        isAverageRow: true,
        // JANET: these are fake numbers
        effectSize: [0.86, 0.71, 0.97, true], // true indicates this is an average of other values
      }

      // JANET - copy and paste EMPTY rows and enter the data
      // where there is '' it is a string; otherwise it's a number
      // [] indicates an array, so far just of numbers
      /*

      {
        publicationYear: , firstAuthor: '', studyName: '', country: '', context: '',
        period: [, ],
        studyType: '',
        sampling: '',
        populationRecruited: '',
        sampleAgeRecruited: [, ],
        contributingNumber: ,
        baselineFemalePercentage: ,
        sampleAgeMean: '',
        baselineEducation: '',
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: true,
        numFollowUpsMin: , numFollowUpsMax: ,
        followUpYears: '',
        riskOfBias: LowMedHigh.,
        numberIncidentCases: ,
        measureOfEffect: '',
        adjustedFor: '',
        effectSize: [, , ],
        weight: ''
      }

      */
    ];

    data.push(headerFooter);
    data.splice(0, 0, headerFooter);

    return data;
  }

}
