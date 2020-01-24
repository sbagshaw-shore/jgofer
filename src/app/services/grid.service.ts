import { Injectable } from '@angular/core';
import { LowMedHigh } from './enums';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  constructor() { }

  getCellClass() {
    return params => {
      let classes = '';

      if (params.data.isFakeHeader) { classes = 'fakeHeader '; }
      if (params.colDef.isCategory && !params.data.isFakeHeader && !!params.value) { classes = 'categoryCell '; }
      if (!params.colDef.isCategory && !params.data.isFakeHeader) { classes = 'nonCategoryCell '; }
      if (params.colDef.isDataCentred) { classes += 'centredCell '; }
      if (params.colDef.isDataMultiline) { classes += 'multilineCell '; }
      if (params.colDef.isSubHeadingInColumn && !params.data.isFakeHeader && typeof params.value !== 'number') { classes += 'subHeadingInRow '; }

      return classes;
    };
  }

  getNationalFlagCellRenderer() {
    return params => {
      const eDiv = document.createElement('div');
      eDiv.className = 'centredCell';
      eDiv.innerHTML = params.value ? `<div class="flag-icon flag-icon-${ params.value.toLowerCase() } jgofer-flag"></div>` : '';
      return eDiv;
    };
  }

  getRangedLineCellRenderer(rangeStart: number, rangeEnd: number, isIncludeValueText?: boolean, nullReplacement?: string, isSoftRangeLine?: boolean) {
    return params => {
      const isFakeHeader = params.data.isFakeHeader;
      const eDiv = document.createElement('div');

      eDiv.className = 'centredCell fullHeightCell';

      const markerLines =
      '<div class="row squeeze">' +
       '<span class="col-3 qtr">&nbsp;</span><span class="col-3 qtr">&nbsp;</span>' +
       '<span class="col-3 qtr">&nbsp;</span><span class="col-3 qtr4">&nbsp;</span>' +
      '</div>';

      if (isFakeHeader) {
        eDiv.innerHTML = '<div class="squeeze">' +
          `<div class="segmentLabel floatDown">${ Math.round((rangeEnd - rangeStart) / 2) + rangeStart }</div><div class="segmentLabel floatUp float-left">${ rangeStart }</div><div class="segmentLabel float-right floatUp">${ rangeEnd }</div>` +
        '</div>';
      } else if (params.data.isAverageRow || params.data.isSubcategoryRow) {
        eDiv.innerHTML = markerLines;
      } else {
        const dStart = +params.value[0];
        const dEnd =  +params.value[1];
        const dataText =  params.value[2];
        const percentPerIncrement = 100 / (rangeEnd - rangeStart);
        const marginLeft = +(dStart - rangeStart) * percentPerIncrement;
        const width = (dEnd - dStart) * percentPerIncrement;
        const rangeLineBorder = isSoftRangeLine ? 'double' : 'solid';
        let valueText = '';

        if (dataText) { // specific text for this record to be displayed
          valueText = `<div>${ dataText }</div>`;
        } else if (isIncludeValueText) {
          valueText = !dStart && nullReplacement ? `<div>${ nullReplacement }</div>` : `<div>${ dStart } ${ dEnd ? ' - ' + dEnd : '' }</div>`;
        }

        // display a circle on the start point if no end value
        const line = !!dEnd ?
          `<div style="margin-left: 1px;"><div style="margin-left: ${ marginLeft }%; margin-top: -22px; width: ${ width }%; border-bottom: 4px ${ rangeLineBorder } goldenrod;"></div></div>` :
          `<div style="margin-left: 1px;"><div style="margin-left: ${ marginLeft }%; margin-top: -34px; width: 100%; text-align: left"><span class="rangeDot"></span></div></div>`;

        eDiv.innerHTML = `${ markerLines }${ line }${ valueText }`;
      }

      return eDiv;
    };
  }

  // return letters in the array in a format resembling icons
  getLetteredCellRenderer() {
    return params => {
      const eDiv = document.createElement('div');
      eDiv.className = 'centredCell';
      if (!params.value || params.value.length === 0 || params.data.isAverageRow || params.data.isSubcategoryRow) { return eDiv; }

      let html = '';
      params.value.forEach(val => {
        if (val.length > 1) {
          html += val;
        } else {
          const icon = '';
          html += `<button class="btn btn-xs letteredButton">${ val }</button>`;
        }
      });

      eDiv.innerHTML = html; // `<button class="btn btn-${ cls } btn-xs"><span class="fa fa-${ icon }"></span></button>`;
      return eDiv;
    };
  }

  // fat line with two background colours, adding up to total width (assumes percentage value passed in for now)
  getBinaryCategoryCellRenderer(headerLabels: string[]) {
    return params => {
      const isFakeHeader = params.data.isFakeHeader;
      const eDiv = document.createElement('div');

      eDiv.className = 'centredCell fullHeightCell';

      if (isFakeHeader) {
        eDiv.innerHTML = '<div class="squeeze">' +
          `<div class="segmentLabel floatDown">&nbsp;</div><div class="segmentLabel floatUp float-left">${ headerLabels[0] }</div><div class="segmentLabel float-right floatUp">${ headerLabels[1] }</div>` +
        '</div>';
      } else if (!params.data.isAverageRow && !params.data.isSubcategoryRow) {
        const first = `<div class="float-left binaryCategoryLeft" style="width: ${ params.value }%">&nbsp;</div>`;
        const second = `<div class="float-right binaryCategoryRight" style="width: ${ 100 - params.value }%">&nbsp;</div>`;
        const text = `<div class="float-left binaryCategoryText">${ params.value }%</div>`;

        eDiv.innerHTML = `<div class="binaryCategoryCell">${ first }${ second }</div>${ text }`;
      }

      return eDiv;
    };
  }

  getArrowCellRenderer(rangeStart: number, rangeEnd: number) {
    return params => {
      const isFakeHeader = params.data.isFakeHeader;
      const eDiv = document.createElement('div');
      eDiv.className = 'centredCell fullHeightCell';

      const markerLines =
      '<div class="row squeeze">' +
       '<span class="col-3 qtr">&nbsp;</span><span class="col-3 qtr">&nbsp;</span>' +
       '<span class="col-3 qtr">&nbsp;</span><span class="col-3 qtr4">&nbsp;</span>' +
      '</div>';

      if (isFakeHeader) {
        eDiv.innerHTML = '<div class="squeeze">' +
        `<div class="segmentLabel floatDown">${ Math.round((rangeEnd - rangeStart) / 2) + rangeStart }</div><div class="segmentLabel floatUp float-left">${ rangeStart }</div><div class="segmentLabel float-right floatUp">${ rangeEnd }</div>` +
      '</div>';
    } else if (params.data.isAverageRow || params.data.isSubcategoryRow) {
      eDiv.innerHTML = markerLines;
    } else {
        const dEnd =  +params.value[0];
        const dataText =  params.value[1];
        const percentPerIncrement = 100 / (rangeEnd - rangeStart);
        const rangeWidth = dEnd * percentPerIncrement;

        const arrow = dEnd ? `<div style="margin-left: 1px;"><div style="width: ${ rangeWidth }%; margin-top: -28px;" class="arrow"></div></div>` : '';
        const valueText = dataText ? `<div style="text-align: center; margin-top: 3px;">${ dataText }</div>` : '';

        eDiv.innerHTML = `${ markerLines }${ arrow }${ valueText }`;
      }

      return eDiv;
    };
  }

  // fat line with two background colours, adding up to total width (assumes percentage value passed in for now)
  getConfidenceCellRenderer(rangeStart: number, rangeEnd: number) {
    return params => {
      const isFakeHeader = params.data.isFakeHeader;
      const eDiv = document.createElement('div');
      eDiv.className = 'centredCell fullHeightCell';

      if (isFakeHeader) {
        eDiv.innerHTML = '<div class="squeeze">' +
        `<div class="segmentLabel floatDown">1</div><div class="segmentLabel floatUp float-left">${ rangeStart }</div><div class="segmentLabel float-right floatUp">${ rangeEnd }</div>` +
      '</div>';
      } else {
        const dEffect = +params.value[0];
        const dStart = +params.value[1];
        const dEnd =  +params.value[2];
        const isAverage = params.value[3];
        const percentPerIncrement = 100 / (rangeEnd - rangeStart);
        const rangeMarginLeft = +(dStart - rangeStart) * percentPerIncrement;
        const rangeWidth = (dEnd - dStart) * percentPerIncrement;
        const pointMarginLeft = +(dEffect - rangeStart) * percentPerIncrement;

        // just a 1 marker
        const markerLines =
        '<div class="row squeeze">' +
          '<span class="col-6">&nbsp;</span><span class="col-6 qtr">&nbsp;</span>' +
        '</div>';

        const colour = isAverage ? '#888888' : 'skyblue';
        const diamondId = isAverage ? 'averageDiamond' : 'diamond';
        const marginTop = isAverage ? -38 : -24;

        const rangeLine = `<div style="margin-left: 1px;"><div style="margin-left: ${ rangeMarginLeft }%; margin-top: ${ marginTop }px; width: ${ rangeWidth }%; border-bottom: 4px solid ${ colour };"></div></div>`;
        const point = `<div style="margin-left: 1px;"><div style="margin-left: ${ pointMarginLeft }%; margin-top: -8px" id="${ diamondId }"></div></div>`;
        const valueText = isAverage ? `<div class="averageRowText">Summ OR: ${ dEffect } (${ dStart } - ${ dEnd })</div>` : '';

        eDiv.innerHTML = `${ markerLines }${ rangeLine }${ point }${ valueText }`;
      }

      return eDiv;
    };
  }

  getMultilineTextCellRenderer() {
    return params => {
      const eDiv = document.createElement('div');
      eDiv.className = 'centredCell';
      eDiv.innerHTML = params.value ? params.value : '';
      return eDiv;
    };
  }

  // fancier boolean cell renderer (green tick, grey cross)
  getBooleanCellRenderer() {
    return params => {
      const eDiv = document.createElement('div');
      eDiv.className = 'centredCell';
      let contents = '';
      if (params.value === true || params.value === 1) {
        contents = '<button class="btn btn-secondary btn-xs"><span class="fa fa-check-circle"></span></button>';
      } else if (params.value === null) { // not undefined - that is blank
        contents = '<button class="btn btn-secondary btn-xs"><span class="fa fa-question-circle"></span></button>';
      } else if (params.value === false) {
        contents = '<button class="btn btn-secondary btn-xs"><span class="fa fa-times"></span></button>';
      }

      eDiv.innerHTML = contents;
      return eDiv;
    };
  }

  getLowMediumHighCellRenderer() {
    return params => {
      const eDiv = document.createElement('div');
      eDiv.className = 'centredCell';
      if (!params.value && params.value !== 0) { return eDiv; }

      let cls = '';
      const icon = 'exclamation-circle';

      switch (params.value) {
        case LowMedHigh.Low:
          cls = 'success';
          break;

        case LowMedHigh.Medium:
          cls = 'warning';
          break;

        case LowMedHigh.High:
          cls = 'danger';
          break;

        default:
          break;
      }
      eDiv.innerHTML = `<button class="btn btn-${ cls } btn-xs"><span class="fa fa-${ icon }"></span></button>`;
      return eDiv;
    };
  }

  getNumberByDotsCellRenderer() {
    return params => {
      const eDiv = document.createElement('div');
      let html = '';
      const propertyPrefix = params.colDef.field;
      const min = params.data[propertyPrefix + 'Min'];
      const max = params.data[propertyPrefix + 'Max'];

      for (let i = 1; i <= max; i++) {
        html += `<span class="${ i <= min ? 'dotOn' : 'dot' }"></span>`;
      }

      eDiv.innerHTML = html;
      return eDiv;
    };
  }
}
