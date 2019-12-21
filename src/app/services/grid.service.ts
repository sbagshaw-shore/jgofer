import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  constructor() { }

  getNationalFlagCellRenderer() {
    return params => {
      const eDiv = document.createElement('div');
      eDiv.className = 'centredCell';
      eDiv.innerHTML = params.value ? `<div class="flag-icon flag-icon-${ params.value.toLowerCase() } jgofer-flag"></div>` : '';
      return eDiv;
    };
  }

  getRangedLineCellRenderer(rangeStart: number, rangeEnd: number, startProperty: string, endProperty: string, isIncludeValueText?: boolean, nullReplacement?: string) {
    return params => {
      const d = params.data;
      const isFakeHeader = d.isFakeHeader;
      const dStart = +d[startProperty];

      const eDiv = document.createElement('div');
      eDiv.className = 'centredCell fullHeightCell';

      if (isFakeHeader) {
        eDiv.innerHTML = '<div class="squeeze">' +
          `<div class="segmentLabel floatDown">${ Math.round((rangeEnd - rangeStart) / 2) + rangeStart }</div><div class="segmentLabel floatUp float-left">${ rangeStart }</div><div class="segmentLabel float-right floatUp">${ rangeEnd }</div>` +
        '</div>';
      } else {
        const dEnd = +d[endProperty];
        const percentPerIncrement = 100 / (rangeEnd - rangeStart);
        const marginLeft = +(dStart - rangeStart) * percentPerIncrement;
        const width = (dEnd - dStart) * percentPerIncrement;
        let valueText = '';

        if (isIncludeValueText) {
          valueText = !dStart && nullReplacement ? `<div>${ nullReplacement }</div>` : `<div>${ dStart } - ${ dEnd }</div>`;
        }

        const markerLines =
        '<div class="row squeeze">' +
         '<span class="col-3 qtr">&nbsp;</span><span class="col-3 qtr">&nbsp;</span>' +
         '<span class="col-3 qtr">&nbsp;</span><span class="col-3 qtr4">&nbsp;</span>' +
        '</div>';

        const line = params.data.isSubCategoryRow ? '' :
          `<div style="margin-left: 1px;"><div style="margin-left: ${ marginLeft }%; margin-top: -22px; width: ${ width }%; border-bottom: 4px solid goldenrod;"></div></div>${ valueText }`;

        eDiv.innerHTML = `${ markerLines }${ line }`;
      }

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
        `<div class="float-left floatDown">${ headerLabels[0] }</div><div class="float-right floatDown">${ headerLabels[1] }</div>` +
      '</div>';
      } else if (!params.data.isSubCategoryRow) {
        const first = `<div class="float-left" style="background-color: mediumvioletred; width: ${ params.value }%">&nbsp;</div>`;
        const second = `<div class="float-right" style="background-color: orchid; width: ${ 100 - params.value }%">&nbsp;</div>`;

        eDiv.innerHTML = `<div style="margin-top: 14px;">${ first }${ second }</div>`;
      }

      return eDiv;
    };
  }


  // fancier boolean cell renderer (green tick, red cross)
  getBooleanCellRenderer() {
    return params => {
      const eDiv = document.createElement('div');
      eDiv.className = 'centredCell';
      eDiv.innerHTML = params.value === true || params.value === 1
      ? '<button class="btn btn-success"><span class="fa fa-check"></span></button>'
      : params.value === undefined || params.value === null
        ? ''
        : '<button class="btn btn-secondary"><span class="fa fa-times"></span></button>';
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

  getCellClass() {
    return params => {
      let classes = '';

      if (params.data.isFakeHeader) { classes = 'fakeHeader '; }
      if (params.colDef.isDataCentred) { classes += 'centredCell '; }
      if (params.colDef.isDataMultiline) { classes += 'multilineCell '; }
      if (params.colDef.isSubHeadingInColumn && !params.data.isFakeHeader && typeof params.value !== 'number') { classes += 'subHeadingInRow '; }

      return classes;
    };
  }
}
