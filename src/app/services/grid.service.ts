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
      eDiv.innerHTML = `<div class="flag-icon flag-icon-${ params.value.toLowerCase() } jgofer-flag"></div>`;
      return eDiv;
    };
  }

  getRangedLineCellRenderer(rangeStart: number, rangeEnd: number, startProperty: string, endProperty: string) {
    return params => {
      const d = params.data;
      const dStart = +d[startProperty];
      const dEnd = +d[endProperty];

      const eDiv = document.createElement('div');
      eDiv.className = 'centredCell';

      const percentPerIncrement = 100 / (rangeEnd - rangeStart);
      const marginLeft = (dStart - rangeStart) * percentPerIncrement;
      const width = (dEnd - dStart) * percentPerIncrement;

      // console.log('pppi percentPerIncrement', percentPerIncrement)
      // console.log('pppi marginLeft', marginLeft)
      // console.log('pppi width', width)
      // console.log('pppi xx d', dStart, dEnd)
      // console.log('pppi xx range', rangeStart, rangeEnd)

      eDiv.innerHTML = `<div style="margin-left: ${ marginLeft }%; width: ${ width }%; border-bottom: 3px solid darkgreen;"></div>
                        <div>${ d[startProperty] } - ${ d[endProperty] }</div>`;

      return eDiv;
    };
  }
}
