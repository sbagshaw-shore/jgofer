import { Injectable } from '@angular/core';
import { GridService } from './grid.service';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  constructor(private grid: GridService) { }

  public getContinuousColumns(): any[] {
    const columnDefs = this.getColumnDefs();

    columnDefs.push({ headerName: 'Weight', field: 'weight', isDataCentred: true });

    return columnDefs;
  }

  public getDichotomousColumns(): any[] {
    const columnDefs = this.getColumnDefs();

    columnDefs.push({ headerName: 'Cutoff', field: 'cutoff' });

    const periodColumn = columnDefs.find(x => x.field === 'period');
    periodColumn.cellRenderer = this.grid.getRangedLineCellRenderer(1975, 2013, true, '?');

    const effectColumn = columnDefs.find(x => x.field === 'effectSize');
    effectColumn.cellRenderer = this.grid.getConfidenceCellRenderer(0.5, 4.2);

    return columnDefs;
  }

  public getCategoricalColumns(): any[] {
    const columnDefs = this.getColumnDefs();

    columnDefs.push({ headerName: 'Ed cat', field: 'educationSubcategory' });
    columnDefs.push({ headerName: 'Ref cat', field: 'referenceSubcategory' });

    const periodColumn = columnDefs.find(x => x.field === 'period');
    periodColumn.cellRenderer = this.grid.getRangedLineCellRenderer(1980, 2017, true, '?');

    const effectColumn = columnDefs.find(x => x.field === 'effectSize');
    effectColumn.cellRenderer = this.grid.getConfidenceCellRenderer(0, 17);

    return columnDefs;
  }

  private getColumnDefs(): any[] {
    return [
      {
         // specify 'category' in the data for ONLY the first row of each category
        headerName: '', field: 'category', isCategory: true, width: 60
      },
      // use isSubHeadingInColumn if having category headers on their own rows -
      // { headerName: 'Publication year', field: 'publicationYear', isSubHeadingInColumn: true  }, --
      { headerName: 'Publication year', field: 'publicationYear', isSubHeadingInColumn: true  },
      { headerName: 'First author', field: 'firstAuthor' },
      { headerName: 'Study name', field: 'studyName' },
      { headerName: 'Country', field: 'country', cellRenderer: this.grid.getNationalFlagCellRenderer() },
      { headerName: 'Context', field: 'context', isDataCentred: true },
      { headerName: 'Period', field: 'period', cellRenderer: this.grid.getRangedLineCellRenderer(1982, 2013, true, '?'), width: 200 },
      { headerName: 'Study type', field: 'studyType', isDataCentred: true },
      { headerName: 'Sampling', field: 'sampling', isDataCentred: true },
      { headerName: 'Population recruited', field: 'populationRecruited', isDataCentred: true },
      { headerName: 'Sample age recruited', field: 'sampleAgeRecruited', cellRenderer: this.grid.getRangedLineCellRenderer(55, 100, true, '?'), width: 200 },
      { headerName: 'Contributing #', field: 'contributingNumber', isDataCentred: true },
      { headerName: 'Baseline female %', field: 'baselineFemalePercentage', cellRenderer: this.grid.getBinaryCategoryCellRenderer(['F', 'M']) },
      { headerName: 'Sample age mean (SD)', field: 'sampleAgeMean', cellRenderer: this.grid.getMultilineTextCellRenderer(), isDataMultiline: true, width: 135 },
      { headerName: 'Baseline education of sample', field: 'baselineEducation', cellRenderer: this.grid.getMultilineTextCellRenderer(), isDataMultiline: true, width: 135 },
      { headerName: 'Used diagnostic criteria?', field: 'usedDiagnosticCriteria', cellRenderer: this.grid.getBooleanCellRenderer() },
      { headerName: 'Screened?', field: 'screenedBeforeClinicalEvaluation', cellRenderer: this.grid.getBooleanCellRenderer() },
      { headerName: '# of follow-ups', field: 'numFollowUps', cellRenderer: this.grid.getNumberByDotsCellRenderer()  },
      // { headerName: 'Follow-up years', field: 'followUpYears', isDataMultiline: true, width: 230 },
      { headerName: 'Follow-up years', field: 'followUpYears', cellRenderer: this.grid.getArrowCellRenderer(0, 20), width: 200 },
      { headerName: 'Risk of bias', field: 'riskOfBias', cellRenderer: this.grid.getLowMediumHighCellRenderer() },
      { headerName: '# incident cases', field: 'numberIncidentCases', isDataCentred: true },
      { headerName: 'Measure of effect', field: 'measureOfEffect', isDataCentred: true },
      { headerName: 'Adjusted for', field: 'adjustedFor', cellRenderer: this.grid.getMultilineTextCellRenderer(), isDataMultiline: true, width: 175 },
      { headerName: 'Effect size', field: 'effectSize', cellRenderer: this.grid.getConfidenceCellRenderer(0.5, 1.5), width: 250 }
    ];
  }
}
