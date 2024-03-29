import { Injectable } from '@angular/core';
import { GridService } from './grid.service';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  constructor(private grid: GridService) { }

  public getContinuousColumns(): any[] {
    const columnDefs = this.getColumnDefs();

    columnDefs.push({ headerName: 'Weight', field: 'weight', isDataCentred: true, cellRenderer: this.grid.getFixedIntCellRenderer() });

    return columnDefs;
  }

  public getDichotomousColumns(): any[] {
    const columnDefs = this.getColumnDefs();

    columnDefs.push({ headerName: 'Cutoff', field: 'cutoff', width: 150, cellRenderer: this.grid.getMultilineTextCellRenderer() });
    columnDefs.push({ headerName: 'Weight', field: 'weight', isDataCentred: true, cellRenderer: this.grid.getFixedIntCellRenderer() });

    const periodColumn = columnDefs.find(x => x.field === 'period');
    periodColumn.cellRenderer = this.grid.getRangedLineCellRenderer(1975, 2013, true, '?');

    const effectColumn = columnDefs.find(x => x.field === 'effectSize');
    effectColumn.cellRenderer = this.grid.getConfidenceCellRenderer(4.2);

    return columnDefs;
  }

  public getCategoricalColumns(id: number): any[] {
    const columnDefs = this.getColumnDefs();

    columnDefs.push({ headerName: 'Ed cat', field: 'educationSubcategory', isDataMultiline: true });
    columnDefs.push({ headerName: 'Ref cat', field: 'referenceSubcategory', isDataMultiline: true });

    const periodColumn = columnDefs.find(x => x.field === 'period');
    const effectColumn = columnDefs.find(x => x.field === 'effectSize');

    switch (id) {
      case 3: // Alzheimer's
        periodColumn.cellRenderer = this.grid.getRangedLineCellRenderer(1988, 2004, true, '?');
        effectColumn.cellRenderer = this.grid.getConfidenceCellRenderer(12);
        break;

      case 4: // Any demetia
        periodColumn.cellRenderer = this.grid.getRangedLineCellRenderer(1980, 2017, true, '?');
        effectColumn.cellRenderer = this.grid.getConfidenceCellRenderer(17);
        break;

      case 5: // Vascular demetia
        periodColumn.cellRenderer = this.grid.getRangedLineCellRenderer(1985, 2004, true, '?');
        effectColumn.cellRenderer = this.grid.getConfidenceCellRenderer(8);
        break;

        case 6: // MCI
          periodColumn.cellRenderer = this.grid.getRangedLineCellRenderer(1991, 2009, true, '?');
          effectColumn.cellRenderer = this.grid.getConfidenceCellRenderer(12); // todo actually highest is slightly over 8 - check how it looks
          break;

      default:
        break;
    }

    return columnDefs;
  }

  private getColumnDefs(): any[] {
    return [
      {
         // specify 'category' in the data for ONLY the first row of each category
        headerName: '', field: 'category', isCategory: true, width: 60
      },
      // use isSubHeadingInColumn if having category headers on their own rows -
      { headerName: 'Pub year', field: 'publicationYear', isSubHeadingInColumn: true  },
      { headerName: 'First author', field: 'firstAuthor' },
      { headerName: 'Study name', field: 'studyName', cellRenderer: this.grid.getMultilineTextCellRenderer() },
      { headerName: 'Country', field: 'country', cellRenderer: this.grid.getNationalFlagCellRenderer() },
      { headerName: 'Context', field: 'context', cellRenderer: this.grid.getLetteredCellRenderer() },
      { headerName: 'Period', field: 'period', cellRenderer: this.grid.getRangedLineCellRenderer(1982, 2013, true, '?'), width: 200 },
      { headerName: 'Study type', field: 'studyType', cellRenderer: this.grid.getLetteredCellRenderer() },
      { headerName: 'Sampling', field: 'sampling', cellRenderer: this.grid.getLetteredCellRenderer() },
      { headerName: 'Pop', field: 'populationRecruited', cellRenderer: this.grid.getLetteredCellRenderer() },
      { headerName: 'Age recruited', field: 'sampleAgeRecruited', cellRenderer: this.grid.getRangedLineCellRenderer(55, 100, true, '?'), width: 200 },
      { headerName: 'N', field: 'contributingNumber', isDataCentred: true },
      { headerName: '% female', field: 'baselineFemalePercentage', cellRenderer: this.grid.getBinaryCategoryCellRenderer(['F', 'M']) },
      { headerName: 'Mean age (SD/range)', field: 'sampleAgeMean', cellRenderer: this.grid.getMultilineTextCellRenderer(), isDataMultiline: true, width: 135 },
      { headerName: 'Education', field: 'baselineEducation', cellRenderer: this.grid.getMultilineTextCellRenderer(), isDataMultiline: true, width: 135 },
      { headerName: 'Used diagnostic criteria?', field: 'usedDiagnosticCriteria', cellRenderer: this.grid.getBooleanCellRenderer() },
      { headerName: 'Screened?', field: 'screenedBeforeClinicalEvaluation', cellRenderer: this.grid.getBooleanCellRenderer() },
      { headerName: 'Follow-ups', field: 'numFollowUps', cellRenderer: this.grid.getNumberByDotsCellRenderer(6)  },
      { headerName: 'Follow-up years', field: 'followUpYears', cellRenderer: this.grid.getArrowCellRenderer(0, 20), width: 200 },
      { headerName: 'Risk of bias', field: 'riskOfBias', cellRenderer: this.grid.getLowMediumHighCellRenderer() },
      { headerName: 'N incident cases', field: 'numberIncidentCases', isDataCentred: true },
      { headerName: 'Effect measure', field: 'measureOfEffect', cellRenderer: this.grid.getLetteredCellRenderer() },
      { headerName: 'Adjusted for', field: 'adjustedFor', cellRenderer: this.grid.getMultilineTextCellRenderer(), isDataMultiline: true, width: 175, isTinyFont: true },
      { headerName: 'Effect size', field: 'effectSize', cellRenderer: this.grid.getConfidenceCellRenderer(3), width: 250 }
    ];
  }
}
