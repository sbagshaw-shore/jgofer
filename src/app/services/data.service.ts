import { Injectable } from '@angular/core';
import { LowMedHigh } from './enums';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  // CONTINUOUS
  public getContinuousData(): any[] {
    return [
      {
        category: 'Alzheimer\'s disease',
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
        // followUpYears: 'Average 4.3',
        followUpYears: [4.3, 'average 4.3'],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 151,
        measureOfEffect: 'OR',
        adjustedFor: 'Follow-up interval, age, sex, occupation, income',
        effectSize: [0.85, 0.754, 0.95],
        weight: 8.01
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
        followUpYears: [5, null],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 194,
        measureOfEffect: 'RR',
        adjustedFor: 'Age, sex',
        effectSize: [0.86, 0.76, 0.96],
        weight: 8.14
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
        followUpYears: [4, 'presume 4'],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 74,
        measureOfEffect: 'RaR',
        adjustedFor: 'Age, sex, APOE',
        effectSize: [0.91, 0.86, 0.97],
        weight: 16.1
      },
      {
        isAverageRow: true,
        // JANET: these are fake numbers
        effectSize: [0.96, 0.75, 1.17, true], // true indicates this is an average of other values
      },
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
        followUpYears: [4, null],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 106,
        measureOfEffect: 'HR',
        adjustedFor: 'Age, gender',
        effectSize: [0.92, 0.88, 0.95],
        weight: 15.06
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
        followUpYears: [1, null],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 152,
        measureOfEffect: 'OR',
        adjustedFor: 'Age, gender, pre-morbid intelligence, occupation, comorbidity, family history',
        effectSize: [0.86, 0.57, 1.31],
        weight: 0.2
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
        followUpYears: [2, null],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 215,
        measureOfEffect: 'RaR',
        adjustedFor: 'Age, sex, APOE',
        effectSize: [0.94, 0.9, 0.99],
        weight: 11.23
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
        followUpYears: [, ''],
        riskOfBias: LowMedHigh.,
        numberIncidentCases: ,
        measureOfEffect: '',
        adjustedFor: '',
        effectSize: [, , ],
        weight: ''
      }

      */
    ];
  }

  // DICHOTOMOUS
  public getDichotomousData(): any[] {
    return [
      {
        category: 'Alzheimer\'s disease',
        publicationYear: 1992, firstAuthor: 'Beard', studyName: 'REP', country: 'US', context: 'HIC',
        period: [1975, 1979],
        studyType: 'CC',
        sampling: 'Age and sex-matched',
        populationRecruited: 'Health-related',
        sampleAgeRecruited: [null, null, 'unclear'], // unclear
        contributingNumber: 482,
        baselineFemalePercentage: 73.9,
        sampleAgeMean: 'Unclear',
        baselineEducation: 'Unclear',
        usedDiagnosticCriteria: true, screenedBeforeClinicalEvaluation: null, // latter is N/A
        numFollowUpsMin: null, numFollowUpsMax: null,
        followUpYears: [null, 'N/A'],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 241,
        measureOfEffect: 'OR',
        adjustedFor: 'Unadjusted',
        effectSize: [1.13, 0.69, 1.5],
        cutoff: '9 years' // additional to continuous
      },
      {
        publicationYear: 1995, firstAuthor: 'Yoshitake', studyName: 'Hisayama', country: 'JP', context: 'HIC',
        period: [1985, 1992],
        studyType: 'PC',
        sampling: 'All',
        populationRecruited: 'Health-related',
        sampleAgeRecruited: [65, 100],
        contributingNumber: 828,
        baselineFemalePercentage: 59.7,
        sampleAgeMean: 'Approx. 74',
        baselineEducation: 'Approx. 25% low ed',
        usedDiagnosticCriteria: true, screenedBeforeClinicalEvaluation: false,
        numFollowUpsMin: 1, numFollowUpsMax: 1,
        followUpYears: [7, null],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 103,
        measureOfEffect: 'RR',
        adjustedFor: 'Age',
        effectSize: [1.18, 0.61, 2.27],
        cutoff: '6 years'
      },
      {
        isAverageRow: true,
        // JANET: these are fake numbers
        effectSize: [0.86, 0.51, 1.03, true], // true indicates this is an average of other values
      },
      {
        category: 'All dementia',
        publicationYear: 1994, firstAuthor: 'Bickel', studyName: 'Unknown', country: 'DE', context: 'HIC',
        period: [1982, 1989], // was marked with ?1982-?1989 need it???
        studyType: 'PC',
        sampling: 'Random',
        populationRecruited: 'Non-specific',
        sampleAgeRecruited: [65, 100],
        contributingNumber: 422,
        baselineFemalePercentage: 69, // marked as approx
        sampleAgeMean: 'Approx. 75',
        baselineEducation: 'Unclear',
        usedDiagnosticCriteria: null, screenedBeforeClinicalEvaluation: false, // former is unclear
        numFollowUpsMin: 1, numFollowUpsMax: 1,
        followUpYears: [8, null],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 50,
        measureOfEffect: 'RR',
        adjustedFor: 'Age',
        effectSize: [1.48, 0.6, 3.4],
        cutoff: 'Elementary only'
      },
      {
        isAverageRow: true,
        // JANET: these are fake numbers
        effectSize: [1.86, 0.71, 2.97, true], // true indicates this is an average of other values
      }
    ];
  }

  // CATEGORICAL
  public getCategoricalData(): any[] {
    return [
      {
        category: 'Alzheimer\'s disease',
        publicationYear: 2008, firstAuthor: 'Bermejo-Pareja', studyName: 'NEDICES', country: 'ES', context: 'HIC',
        period: [1994, 1998],
        studyType: 'PC',
        sampling: 'All',
        populationRecruited: 'Non-specific',
        sampleAgeRecruited: [65, 100],
        contributingNumber: 3891,
        baselineFemalePercentage: 57, // approx
        sampleAgeMean: '79.5 (6.8)',
        baselineEducation: 'Cases 30.4% illiterate<br/>controls 11.3% illiterate',
        usedDiagnosticCriteria: true, screenedBeforeClinicalEvaluation: false,
        numFollowUpsMin: 1, numFollowUpsMax: 1,
        followUpYears: [3.2, 'Mean (0.03 - 6.6)'],
        riskOfBias: LowMedHigh.Low,
        numberIncidentCases: 161,
        measureOfEffect: 'HR',
        adjustedFor: 'Age, sex, current smoker, current ethanol consumption, stroke, diabetes mellitus, hypertension, heart disease, depressive symptoms',
        effectSize: [4.8, 1.98, 11.61],
        educationSubcategory: 'Illiterate', // additional to others
        referenceSubcategory: 'Secondary or higher studies' // additional to others
      },
      {
        isSubcategoryRow: true,
        effectSize: [2.11, 0.88, 5],
        educationSubcategory: 'Can read and write',
        referenceSubcategory: 'Secondary or higher studies'
      },
      {
        isSubcategoryRow: true,
        effectSize: [1.73, 0.7, 4.29],
        educationSubcategory: 'Primary studies',
        referenceSubcategory: 'Secondary or higher studies'
      },
      {
        publicationYear: 2002, firstAuthor: 'Di Carlo', studyName: 'ILSA', country: 'IT', context: 'HIC',
        period: [1992, 1995],
        studyType: 'PC',
        sampling: 'Random',
        populationRecruited: 'Non-specific',
        sampleAgeRecruited: [65, 84],
        contributingNumber: 2498,
        baselineFemalePercentage: 47,
        sampleAgeMean: '74 (5.6)',
        baselineEducation: '6.1 mean (4.6)',
        usedDiagnosticCriteria: true, screenedBeforeClinicalEvaluation: true,
        numFollowUpsMin: 1, numFollowUpsMax: 1,
        followUpYears: [3.8, 'Mean (1.09)'],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 127,
        measureOfEffect: 'HR',
        adjustedFor: 'Multivariate model, covariates not specified but age and "demographic variables"',
        effectSize: [0.32, 0.12, 0.89],
        educationSubcategory: '6-10 years',
        referenceSubcategory: '0-5 years'
      },
      {
        isSubcategoryRow: true,
        effectSize: [0.34, 0.12, 0.96],
        educationSubcategory: '>= 11 years',
        referenceSubcategory: '0-5 years'
      },
    ];
  }
}
