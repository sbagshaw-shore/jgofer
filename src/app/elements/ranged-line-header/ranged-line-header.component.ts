import { Component, OnDestroy, ElementRef } from '@angular/core';
import { IHeaderAngularComp } from '@ag-grid-community/angular';
import { IHeaderParams } from '@ag-grid-community/core';

@Component({
  selector: 'app-ranged-line-header',
  templateUrl: './ranged-line-header.component.html',
  styleUrls: ['./ranged-line-header.component.scss']
})
export class RangedLineHeaderComponent implements OnDestroy, IHeaderAngularComp {
  public params: LineRangeParams;
  public sorted: string;
  private elementRef: ElementRef;

  constructor(elementRef: ElementRef) {
      this.elementRef = elementRef;
  }

  agInit(params: LineRangeParams): void {
    this.params = params;
  }

  ngOnDestroy() {
    console.log(`Destroying HeaderComponent`);
  }

  private querySelector(selector: string) {
      return this.elementRef.nativeElement.querySelector('.customHeaderMenuButton', selector) as HTMLElement;
  }
}

interface LineRangeParams extends IHeaderParams {
  start: number;
  end: number;
}
