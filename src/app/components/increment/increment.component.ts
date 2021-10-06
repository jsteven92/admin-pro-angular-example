import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: [
  ]
})
export class IncrementComponent implements OnInit{

  ngOnInit(): void {
    this.btnClass = `btn ${ this.btnClass }`;
  }

  /**if the variable is diferent of parameter you would use 'name-param' */
  @Input('value') progress: number = 50;
  @Input() btnClass: string = 'btn-primary';

  @Output('value') valuerOut: EventEmitter<number> = new EventEmitter();

  changeValueButton(value: number): void {
    if (this.progress >= 100 && value >= 0) {
      this.valuerOut.emit(100);
      this.progress = 100;
    } else if (this.progress <= 0 && value <= 0) {
      this.valuerOut.emit(0);
      this.progress = 0;
    } else {
      this.progress += value;
      this.valuerOut.emit(this.progress);
    }
  }

  changeValueInput( value: number ): void {
    if(value >= 100){
      this.progress = 100
    }else if (value <= 0){
      this.progress = 0
    }else{
      this.progress = value;
    }
    this.valuerOut.emit(this.progress);
  }
}
