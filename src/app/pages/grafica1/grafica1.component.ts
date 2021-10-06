import { Component } from '@angular/core';
import { Data } from '@angular/router';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {
  labelSale: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  labelProduction: string[] = ['Download Production', 'In-Store Production', 'Mail-Order Production'];
  labelCost: string[] = ['Download Cost', 'In-Store Cost', 'Mail-Order Cost'];
  labelShipping: string[] = ['Download Shipping', 'In-Store Shipping', 'Mail-Order Shipping'];

  public dataSale =  [[350, 450, 100]];
  dataProduction =  [[200, 120, 50]];
  dataCost =  [[180, 210, 420]];
  dataShipping =  [[60, 20, 90]];
}
