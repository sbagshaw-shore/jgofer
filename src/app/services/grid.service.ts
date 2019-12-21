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

      // if (!dStart) {
      //   if (nullReplacement && !params.data.isSubCategoryRow) { eDiv.innerHTML = nullReplacement; }
      //   return eDiv;
      // }

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

  // getZeroFixedLineCellRenderer(rangeEnd: number, isIncludeValueText?: boolean) {
  //   return params => {

  //     const eDiv = document.createElement('div');
  //     eDiv.className = 'centredCell fullHeightCell';

  //     if (params.data.isFakeHeader) {
  //       eDiv.innerHTML = '<div class="squeeze">' +
  //         `<div class="segmentLabel floatDown">${ rangeEnd / 2 }</div><div class="segmentLabel floatUp float-left">0</div><div class="segmentLabel float-right floatUp">${ rangeEnd }</div>` +
  //       '</div>';
  //     } else {
  //       const dEnd = +params.value;
  //       const percentPerIncrement = 100 / rangeEnd;
  //       const width = dEnd * percentPerIncrement;
  //       const suffix = rangeEnd === 100 ? '%' : '';
  //       const valueText = isIncludeValueText && !params.data.isFakeHeader ? `<div>${ dEnd }${ suffix }</div>` : '';

  //       const markerLines =
  //       '<div class="row squeeze">' +
  //        '<span class="col-3 qtr">&nbsp;</span><span class="col-3 qtr">&nbsp;</span>' +
  //        '<span class="col-3 qtr">&nbsp;</span><span class="col-3 qtr4">&nbsp;</span>' +
  //       '</div>';

  //       const line = params.data.isSubCategoryRow ? '' :
  //         `<div style="width: ${ width }%; border-bottom: 3px solid goldenrod; margin:-22px 0 0 1px;"></div>${ valueText }`;

  //       eDiv.innerHTML = `${ markerLines }${ line }`;
  //     }

  //     return eDiv;
  //   };
  // }


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
