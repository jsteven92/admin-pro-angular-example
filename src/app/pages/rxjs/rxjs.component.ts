import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs!: Subscription;
  public intervalSubs2!: Subscription;

  constructor() {

    /**Pipe is a function that allow change or transform data */
    /**I subscribe to observable */
    this.intervalSubs2 = this.returnObservable().pipe(
      /**when obs return error this function retry call action */
      retry(50)
    ).subscribe(value => console.log('Subs:', value),
      (err) => console.warn(`wrong: ${err}`),
      () => console.info('obs finish')
    );

    /** this is the same of subscribe((value) => console.log(value))*/
    this.intervalSubs = this.returnIntervalObservable()
      .subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
    this.intervalSubs2.unsubscribe();
  }


  /**this is an implementation of interval with rxjs interval */
  returnIntervalObservable(): Observable<number> {
    return interval(100)
      .pipe(
        /**which do you like sometime execute */
       // take(20),
        /** return value and transform for each iteration */
        map(value => value + 1),
        /**establish when I whant emit value or not */
        filter(value => (value % 2 === 0) ? true : false),

      );

  }

  returnObservable(): Observable<number> {
    let i = 0;
    /** create object observable */
    return new Observable<number>(observer => {
      const interval = setInterval(() => {
        i++;
        /** I want report subscribe my */
        observer.next(i);
        if (i == 50) {
          /** this is of javascript and it make cancel interval*/
          clearInterval(interval);
          /**report that observable is finished */
          observer.complete();
        }

        if (i == 100) {
          /**report that observable throw execption and finish observable*/
          observer.error(' i arrive 2')
        }
      }, 1000)
    });
  }

}
