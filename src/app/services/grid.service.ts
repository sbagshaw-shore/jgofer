import { Injectable } from '@angular/core';
import { LowMedHigh } from './enums';
import { prepareEventListenerParameters, parseTemplate } from '@angular/compiler/src/render3/view/template';
import { PreloadAllModules } from '@angular/router';

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
      if (params.colDef.isTinyFont) { classes += 'tinyText '; }
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
        const extraClass = val && val.length > 3 ? ' letteredButtonSmall' : '';
        html += `<button class="btn btn-xs letteredButton ${ extraClass }">${ val }</button>`;
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
        if (!!params.value) {
          const first = `<div class="float-left binaryCategoryLeft" style="width: ${ params.value }%">&nbsp;</div>`;
          const second = `<div class="float-right binaryCategoryRight" style="width: ${ 100 - params.value }%">&nbsp;</div>`;
          const text = `<div class="float-left binaryCategoryText">${ params.value }%</div>`;

          eDiv.innerHTML = `<div class="binaryCategoryCell">${ first }${ second }</div>${ text }`;
        } else {
          eDiv.innerHTML = '<div style="margin-top: 15px">?</div>';
        }
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
    } else if (!params.value[0] && !params.value[1]) {
      const unknown = '<div style="text-align: center; margin-top: -20px;">?</div>';
      eDiv.innerHTML = `${ markerLines }${ unknown }`;
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

  logPosition(options, value): number {
    const minpos = options.minpos || 0;
    const maxpos = options.maxpos || 100;
    const minlval = Math.log(options.minval || 1);
    const maxlval = Math.log(options.maxval || 100000);
    const scale = (maxlval - minlval) / (maxpos - minpos);

    return minpos + (Math.log(value) - minlval) / scale;
 }

  // fat line with two background colours, adding up to total width (assumes percentage value passed in for now)
  getConfidenceCellRenderer(rangeEnd: number) {
    return params => {
      const isFakeHeader = params.data.isFakeHeader;
      const eDiv = document.createElement('div');
      eDiv.className = 'centredCell fullHeightCell';
      const rangeStart = 1 / rangeEnd;

      if (isFakeHeader) {
        eDiv.innerHTML = '<div class="squeeze">' +
        `<div class="segmentLabel floatDown">1</div><div class="segmentLabel floatUp float-left">${ rangeStart.toFixed(3) }</div><div class="segmentLabel float-right floatUp">${ rangeEnd }</div>` +
      '</div>';
      } else {
        const dEffect = +params.value[0];
        const dStart = +params.value[1];
        const dEnd =  +params.value[2];
        const isAverage = params.value[3];
        // const isSubCategory = params.data.isSubcategoryRow;

        const logOptions = { minval: 1 / rangeEnd, maxval: rangeEnd };
        const rangeMarginLeft = this.logPosition(logOptions, dStart);
        const rangeWidth = this.logPosition(logOptions, dEnd) - rangeMarginLeft;
        const pointMarginLeft = this.logPosition(logOptions, dEffect);

        // console.log(dStart, rangeMarginLeft);

        // just a 1 marker - no lines for ends at the moment
        const markerLines =
        '<div class="row squeeze">' +
          '<span class="col-6">&nbsp;</span><span class="col-6 qtr">&nbsp;</span>' +
        '</div>';

        const colour = isAverage ? '#888888' : 'skyblue';
        const diamondId = isAverage ? 'averageDiamond' : 'diamond';
        // const marginTop = isAverage ? -38 : isSubCategory ? -16 : -24; // subcat margin based on rowHeight of 30
        const marginTop = isAverage ? -38 : -24; // subcat margin based on rowHeight of 50

        const rangeLine = `<div style="margin-left: 1px;"><div style="margin-left: ${ rangeMarginLeft }%; margin-top: ${ marginTop }px; width: ${ rangeWidth }%; border-bottom: 4px solid ${ colour };"></div></div>`;
        const point = `<div style="margin-left: 1px;"><div style="margin-left: ${ pointMarginLeft }%; margin-top: -8px" id="${ diamondId }"></div></div>`;
        // const valueText = isAverage ? `<div class="averageRowText">Summ OR: ${ dEffect } (${ dStart } - ${ dEnd })</div>` : '';
        const valueText = isAverage ? `<div class="averageRowText">Summary OR: ${ dEffect } (${ dStart } - ${ dEnd })</div>` :
                                      `<div>${ dEffect } (${ dStart } - ${ dEnd })</div>`;

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

  getFixedIntCellRenderer() {
    return params => {
      const eDiv = document.createElement('div');
      eDiv.className = 'centredCell';
      eDiv.innerHTML = params.value ? parseFloat(params.value).toFixed(2) : '';
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

  getNumberByDotsCellRenderer(numDotsPerRow: number) {
    return params => {
      const eDiv = document.createElement('div');
      let html = '';
      const val = params.value;

      if (!val && !params.data.isSubcategoryRow && !params.data.isFakeHeader && !params.data.isAverageRow) {
        html = '?';
      } else if (!!val) {
        for (let i = 1; i <= val; i++) {
          if (i % numDotsPerRow === 1) {
            html += '<div class="dotRow">';
          }

          html += `<span class="dot"></span>`;

          if (i % numDotsPerRow === 0) {
            html += '</div>';
          }
        }

        if (!html.endsWith('</div>')) {
          html += '</div>';
        }
      }

      eDiv.innerHTML = html;
      return eDiv;
    };

  }
}
