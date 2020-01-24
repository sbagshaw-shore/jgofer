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
        sampling: 'random',
        populationRecruited: 'non-specific',
        sampleAgeRecruited: [65, 100],
        contributingNumber: 642,
        baselineFemalePercentage: 56.4,
        sampleAgeMean: 'unclear',
        baselineEducation: 'unclear',
        usedDiagnosticCriteria: true, screenedBeforeClinicalEvaluation: false,
        numFollowUpsMin: 1, numFollowUpsMax: 1,
        followUpYears: [4.3, 'average 4.3'],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 95,
        measureOfEffect: 'OR',
        adjustedFor: 'follow-up interval, age, sex, occupation, income',
        effectSize: [0.85, 0.75, 0.95],
        weight: 8.01
      },
      {
        publicationYear: 2001, firstAuthor: 'Tyas', studyName: 'MSHA', country: 'CA', context: 'HIC',
        period: [1991, 1997],
        studyType: 'PC',
        sampling: 'random',
        populationRecruited: 'health-related',
        sampleAgeRecruited: [65, 100],
        contributingNumber: 694,
        baselineFemalePercentage: 62.4,
        sampleAgeMean: '74.0 (5.8)',
        baselineEducation: '10.6 (3.2)',
        usedDiagnosticCriteria: true, screenedBeforeClinicalEvaluation: true,
        numFollowUpsMin: 1, numFollowUpsMax: 1,
        followUpYears: [5, null],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 36,
        measureOfEffect: 'RR',
        adjustedFor: 'age, sex',
        effectSize: [0.86, 0.76, 0.96],
        weight: 8.14
      },
      {
        publicationYear: 2002, firstAuthor: 'Kukull', studyName: 'ACT', country: 'US', context: 'HIC',
        period: [1994, 2000],
        studyType: 'PC',
        sampling: 'random',
        populationRecruited: 'health-related',
        sampleAgeRecruited: [65, 100],
        contributingNumber: 2356,
        baselineFemalePercentage: 59.0,
        sampleAgeMean: '79.4 w/ dementia<br/>74.0 w/o dementia',
        baselineEducation: '12.8 w/ dementia<br/>13.9 w/o dementia',
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: true,
        numFollowUpsMin: 1, numFollowUpsMax: 2,
        followUpYears: [4, 'presume 4'],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 151,
        measureOfEffect: 'RaR',
        adjustedFor: 'age, sex, APOE',
        effectSize: [0.91, 0.86, 0.97],
        weight: 16.1
      },
      {
        publicationYear: 2002, firstAuthor: 'Lindsay', studyName: 'CSHA', country: 'CA', context: 'HIC',
        period: [1992, 1996],
        studyType: 'CC',
        sampling: 'random',
        populationRecruited: 'non-specific',
        sampleAgeRecruited: [65, 100],
        contributingNumber: 4088,
        baselineFemalePercentage: 58.0,
        sampleAgeMean: '81.0 cases<br/>72.9 controls',
        baselineEducation: '9.9 cases<br/>11.1 controls',
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: true,
        numFollowUpsMin: 1, numFollowUpsMax: 1,
        followUpYears: [5, null],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 194,
        measureOfEffect: 'OR',
        adjustedFor: 'age, sex, education',
        effectSize: [0.92, 0.88, 0.97],
        weight: 18.35
      },
      {
        publicationYear: 2008, firstAuthor: 'Lee', studyName: 'KYS', country: 'KR', context: 'HIC',
        period: [1996, 2003],
        studyType: 'PC',
        sampling: 'unclear',
        populationRecruited: 'non-specific',
        sampleAgeRecruited: [65, 100],
        contributingNumber: 658,
        baselineFemalePercentage: 57.7,
        sampleAgeMean: '72.2 (5.6)',
        baselineEducation: '2.5 (3.5)',
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: true,
        numFollowUpsMin: 1, numFollowUpsMax: 2,
        followUpYears: [5.4, '5.4 (1.6)'],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 74,
        measureOfEffect: 'HR',
        adjustedFor: 'age, sex, literacy',
        effectSize: [0.85, 0.74, 0.98],
        weight: 6.26
      },
      {
        publicationYear: 2014, firstAuthor: 'Borenstein', studyName: 'Kame', country: 'US', context: 'HIC',
        period: [1992, 2001],
        studyType: 'PC',
        sampling: 'all',
        populationRecruited: 'Japanese Americans',
        sampleAgeRecruited: [55, 100],
        contributingNumber: 1836,
        baselineFemalePercentage: 61.8,
        sampleAgeMean: '77.1 (7.4) cases<br/>71.4 (5.4) other',
        baselineEducation: '11.7 (2.9) cases<br/>13.0 (2.9) other',
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: true,
        numFollowUpsMin: 1, numFollowUpsMax: 4,
        followUpYears: [8, null],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 135,
        measureOfEffect: 'HR',
        adjustedFor: 'age',
        effectSize: [0.92, 0.84, 1.01],
        weight: 10.91
      },
      {
        publicationYear: 2017, firstAuthor: 'Yu', studyName: 'MAP', country: 'US', context: 'HIC',
        period: [1997, 2004],
        studyType: 'PC',
        sampling: 'volunteer',
        populationRecruited: 'non-specific',
        sampleAgeRecruited: [58.8, 100.2],
        contributingNumber: 805,
        baselineFemalePercentage: 76.7,
        sampleAgeMean: '81.5 (7.7)',
        baselineEducation: '15.3 (3.0)',
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: false,
        numFollowUpsMin: 1, numFollowUpsMax: 8,
        followUpYears: [8, null],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 102,
        measureOfEffect: 'HR',
        adjustedFor: 'age, sex, total literacy',
        effectSize: [1.04, 0.97, 1.12],
        weight: 13.99
      },
      {
        publicationYear: 2018, firstAuthor: 'Hendrie', studyName: 'IIDP', country: 'US', context: 'HIC',
        period: [1992, 2009],
        studyType: 'PC',
        sampling: 'random',
        populationRecruited: 'African Americans',
        sampleAgeRecruited: [70, 100],
        contributingNumber: 3276,
        baselineFemalePercentage: 65.5,
        sampleAgeMean: '77.7 (5.9) 1992 cohort<br/>77.2 (5.5) 2001 cohort',
        baselineEducation: '9.3 (3.1) 1992 cohort<br/>11.4(2.7) 2001 cohort',
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: true,
        numFollowUpsMin: 1, numFollowUpsMax: 7,
        followUpYears: [17, null],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 233,
        measureOfEffect: 'HR',
        adjustedFor: 'age, sex, rural vs urban residence, 2001 vs 1992 cohort',
        effectSize: [0.91, 0.87, 0.96],
        weight: 18.24
      },
      {
        isAverageRow: true,
        effectSize: [0.92, 0.88, 0.95, true], // true indicates this is an average of other values
      },
      {
        category: 'All dementia',
        publicationYear: 1994, firstAuthor: 'Stern', studyName: 'Unknown', country: 'US', context: 'HIC',
        period: [null, null],
        studyType: 'PC',
        sampling: 'mixed including volunteer',
        populationRecruited: 'non-specific',
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
        adjustedFor: 'age, gender',
        effectSize: [0.92, 0.88, 0.95],
        weight: 15.06
      },
      {
        publicationYear: 1997, firstAuthor: 'Schmand - A', studyName: 'AMSTEL', country: 'NL', context: 'HIC',
        period: [null, null],
        studyType: 'PC',
        sampling: 'unclear',
        populationRecruited: 'health-related',
        sampleAgeRecruited: [65, 84],
        contributingNumber: 2063,
        baselineFemalePercentage: 62.6,
        sampleAgeMean: '74.1 (5.5) normal <br/>77.5 cases (5.0)',
        baselineEducation: '9.1 (3.0) normal <br/>8.0 (1.8) cases',
        usedDiagnosticCriteria: false,  screenedBeforeClinicalEvaluation: false,
        numFollowUpsMin: 1, numFollowUpsMax: 1,
        followUpYears: [4, null],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 152,
        measureOfEffect: 'OR',
        adjustedFor: 'age, gender, pre-morbid intelligence, occupation, comorbidity, family history',
        effectSize: [0.86, 0.57, 1.31],
        weight: 0.20
      },
      {
        publicationYear: 2002, firstAuthor: 'Kukull', studyName: 'ACT', country: 'US', context: 'HIC',
        period: [1994, 2000],
        studyType: 'PC',
        sampling: 'random',
        populationRecruited: 'health-related',
        sampleAgeRecruited: [65, 100],
        contributingNumber: 2356,
        baselineFemalePercentage: 59.0,
        sampleAgeMean: '79.4 w/ dementia<br/>74.0 w/o dementia',
        baselineEducation: '12.8 w/ dementia<br/>13.9 w/o dementia',
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: true,
        numFollowUpsMin: 1, numFollowUpsMax: 2,
        followUpYears: [4, 'presume 4'],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 215,
        measureOfEffect: 'RaR',
        adjustedFor: 'age, sex, APOE',
        effectSize: [0.94, 0.90, 0.99],
        weight: 11.23
      },
      {
        publicationYear: 2010, firstAuthor: 'Kerola', studyName: 'Kuopio 75+', country: 'FI', context: 'HIC',
        period: [1998, 2003],
        studyType: 'PC',
        sampling: 'random',
        populationRecruited: 'non-specific',
        sampleAgeRecruited: [75, 100],
        contributingNumber: 303,
        baselineFemalePercentage: 72.0,
        sampleAgeMean: '80 (approx)',
        baselineEducation: '7 (approx)',
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: true,
        numFollowUpsMin: 1, numFollowUpsMax: 1,
        followUpYears: [5, null],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 59,
        measureOfEffect: 'OR',
        adjustedFor: 'age, hypertension, B-type natriuretic peptide',
        effectSize: [0.50, 0.33, 0.77],
        weight: 0.20
      },
      {
        publicationYear: 2010, firstAuthor: 'Brayne', studyName: 'EClipSE - CFAS, CC75C, Vantaa 85+', country: 'GB', context: 'HIC',
        period: [1985, 2005],
        studyType: 'PC',
        sampling: 'unclear',
        populationRecruited: 'non-specific',
        sampleAgeRecruited: [65, 100],
        contributingNumber: 872,
        baselineFemalePercentage: 68.0,
        sampleAgeMean: '90 (68-107)',
        baselineEducation: 'median 9 (range 0-24)',
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: false,
        numFollowUpsMin: 1, numFollowUpsMax: 7,
        followUpYears: [20, null],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 486,
        measureOfEffect: 'OR',
        adjustedFor: 'age at death, sex, study',
        effectSize: [0.89, 0.83, 0.94],
        weight: 7.46
      },
      {
        publicationYear: 2012, firstAuthor: 'Katz', studyName: 'EAS', country: 'US', context: 'HIC',
        period: [1993, 2009],
        studyType: 'PC',
        sampling: 'unclear',
        populationRecruited: 'health-related',
        sampleAgeRecruited: [70, 100],
        contributingNumber: 1168,
        baselineFemalePercentage: 60.7,
        sampleAgeMean: '78.8 (5.42)',
        baselineEducation: '13.5 (3.50)',
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: false,
        numFollowUpsMin: 1, numFollowUpsMax: 16,
        followUpYears: [16, null],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 130,
        measureOfEffect: 'HR',
        adjustedFor: 'sex, race, age',
        effectSize: [0.89, 0.61, 1.29],
        weight: 0.25
      },
      {
        publicationYear: 2012, firstAuthor: 'Unverzagt', studyName: 'ACTIVE', country: 'US', context: 'HIC',
        period: [null, null],
        studyType: 'RCT',
        sampling: 'unclear',
        populationRecruited: 'non-specific',
        sampleAgeRecruited: [65, 100],
        contributingNumber: 2786,
        baselineFemalePercentage: 76.0,
        sampleAgeMean: '74',
        baselineEducation: '13',
        usedDiagnosticCriteria: false,  screenedBeforeClinicalEvaluation: false,
        numFollowUpsMin: 1, numFollowUpsMax: 5,
        followUpYears: [5, null],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 189,
        measureOfEffect: 'HR',
        adjustedFor: 'intervention, age, sex, white, married, alcohol, MMSE, physical function, depression, diabetes, stroke or TIA',
        effectSize: [0.85, 0.72, 1.01],
        weight: 1.20
      },
      {
        publicationYear: 2013, firstAuthor: 'St John', studyName: 'MSHA', country: 'CA', context: 'HIC',
        period: [1991, 1996],
        studyType: 'PC',
        sampling: 'random',
        populationRecruited: 'health-related',
        sampleAgeRecruited: [65, 100],
        contributingNumber: 1468,
        baselineFemalePercentage: 58.5,
        sampleAgeMean: '76.2 (7.1)',
        baselineEducation: '9.3 (3.6)',
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: true,
        numFollowUpsMin: 1, numFollowUpsMax: 1,
        followUpYears: [5, null],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 96,
        measureOfEffect: 'OR',
        adjustedFor: 'age, sex, subjective memory loss, depression, functional status, MMSE, self-rated health',
        effectSize: [0.98, 0.91, 1.05],
        weight: 5.91
      },
      {
        publicationYear: 2014, firstAuthor: 'Borenstein', studyName: 'Kame', country: 'US', context: 'HIC',
        period: [1992, 2001],
        studyType: 'PC',
        sampling: 'all',
        populationRecruited: 'Japanese Americans',
        sampleAgeRecruited: [55, 100],
        contributingNumber: 1836,
        baselineFemalePercentage: 61.8,
        sampleAgeMean: '77.1 (7.4) cases<br/>71.4 (5.4) other',
        baselineEducation: '11.7 (2.9) cases<br/>12.0 (2.9) other',
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: true,
        numFollowUpsMin: 1, numFollowUpsMax: 4,
        followUpYears: [8, null],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 173,
        measureOfEffect: 'HR',
        adjustedFor: 'age',
        effectSize: [0.94, 0.87, 1.02],
        weight: 4.92
      },
      {
        publicationYear: 2015, firstAuthor: 'Contador', studyName: 'NEDICES', country: 'ES', context: 'HIC',
        period: [1994, 1998],
        studyType: 'PC',
        sampling: 'all or random',
        populationRecruited: 'non-specific',
        sampleAgeRecruited: [65, 100],
        contributingNumber: 2711,
        baselineFemalePercentage: 56.8,
        sampleAgeMean: '72.9 (6.1)',
        baselineEducation: '6.9 (5.2)',
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: true,
        numFollowUpsMin: 1, numFollowUpsMax: 1,
        followUpYears: [5, null],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 91,
        measureOfEffect: 'HR',
        adjustedFor: 'age, sex, comorbidities, smoking, alcohol consumption',
        effectSize: [0.90, 0.85, 0.94],
        weight: 10.37
      },
      {
        publicationYear: 2016, firstAuthor: 'Then', studyName: 'LEILA75+', country: 'DE', context: 'HIC',
        period: [1997, 2013],
        studyType: 'PC',
        sampling: 'random',
        populationRecruited: 'non-specific',
        sampleAgeRecruited: [75, 100],
        contributingNumber: 938,
        baselineFemalePercentage: 73.8,
        sampleAgeMean: '81.5 (4.8)',
        baselineEducation: '11.9 (1.8)',
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: false,
        numFollowUpsMin: 1, numFollowUpsMax: 6,
        followUpYears: [15, null],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 189,
        measureOfEffect: 'HR',
        adjustedFor: 'age, gender, marital status, living situation, diabetes, heart attack, stroke, history of depression',
        effectSize: [0.91, 0.83, 0.99],
        weight: 4.10
      },
      {
        publicationYear: 2016, firstAuthor: 'Zahodne', studyName: 'WHICAP', country: 'US', context: 'HIC',
        period: [1992, 2011],
        studyType: 'PC',
        sampling: 'random',
        populationRecruited: 'health-related',
        sampleAgeRecruited: [65, 100],
        contributingNumber: 2593,
        baselineFemalePercentage: 69.0,
        sampleAgeMean: '76 (approx)',
        baselineEducation: '10 (approx)',
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: false,
        numFollowUpsMin: 1, numFollowUpsMax: 16,
        followUpYears: [19, null],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 595,
        measureOfEffect: 'OR',
        adjustedFor: 'American, Hispanic, depression, hypertension, diabetes, stroke, APOE-e4, memory decline group',
        effectSize: [0.93, 0.91, 0.95],
        weight: 26.15
      },
      {
        publicationYear: 2018, firstAuthor: 'Hendrie', studyName: 'IIDP', country: 'US', context: 'HIC',
        period: [1992, 2009],
        studyType: 'PC',
        sampling: 'random',
        populationRecruited: 'African Americans',
        sampleAgeRecruited: [70, 100],
        contributingNumber: 3276,
        baselineFemalePercentage: 65.5,
        sampleAgeMean: '77.7 (5.9) 1992 cohort<br/>77.2 (5.5) 2001 cohort',
        baselineEducation: '9.3 (3.1) 1992 cohort<br/>11.4(2.7) 2001 cohort',
        usedDiagnosticCriteria: true,  screenedBeforeClinicalEvaluation: true,
        numFollowUpsMin: 1, numFollowUpsMax: 7,
        followUpYears: [17, null],
        riskOfBias: LowMedHigh.Medium,
        numberIncidentCases: 285,
        measureOfEffect: 'HR',
        adjustedFor: 'age, sex, rural vs urban residence, 2001 vs 1992 cohort',
        effectSize: [0.93, 0.89, 0.97],
        weight: 12.94
      },
      {
        isAverageRow: true,
        // JANET: these are fake numbers
        effectSize: [0.92, 0.91, 0.94, true], // true indicates this is an average of other values
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
