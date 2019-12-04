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

  getZeroFixedLineCellRenderer(rangeEnd: number, isIncludeValueText?: boolean) {
    return params => {
      const dStart = 0.0;
      const dEnd = +params.value;

      const eDiv = document.createElement('div');
      eDiv.className = 'centredCell';
      if (!dEnd) { return ''; }

      const percentPerIncrement = 100 / rangeEnd;
      const width = dEnd * percentPerIncrement;
      const valueText = isIncludeValueText ? `<div>${ dEnd }</div>` : '';

      eDiv.innerHTML = `<div style="width: ${ width }%; border-bottom: 3px solid darkgreen;"></div>${ valueText }`;
      return eDiv;
    };
  }

  getRangedLineCellRenderer(rangeStart: number, rangeEnd: number, startProperty: string, endProperty: string, isIncludeValueText?: boolean) {
    return params => {
      const d = params.data;

      const dStart = +d[startProperty];
      const dEnd = +d[endProperty];

      const eDiv = document.createElement('div');
      eDiv.className = 'centredCell';

      if (!dStart) { return ''; }

      const percentPerIncrement = 100 / (rangeEnd - rangeStart);
      const marginLeft = (dStart - rangeStart) * percentPerIncrement;
      const width = (dEnd - dStart) * percentPerIncrement;
      const valueText = isIncludeValueText ? `<div>${ d[startProperty] } - ${ d[endProperty] }</div>` : '';

      // console.log('pppi percentPerIncrement', percentPerIncrement)
      // console.log('pppi marginLeft', marginLeft)
      // console.log('pppi width', width)
      // console.log('pppi xx d', dStart, dEnd)
      // console.log('pppi xx range', rangeStart, rangeEnd)

      eDiv.innerHTML = `<div style="margin-left: ${ marginLeft }%; width: ${ width }%; border-bottom: 3px solid darkgreen;"></div>${ valueText }`;
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

  // if data is an int, display as normal; otherwise assume it's a subheader
  getSubHeadingRowCellClass(subHeadingClass: string) {
    return params => {
      return (typeof params.value === 'number') ? '' : subHeadingClass;
    };
  }
}
