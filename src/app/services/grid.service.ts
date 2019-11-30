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
    }
  }
}
