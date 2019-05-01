import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ApplicationRef } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { CircularWipe } from '../circular-wipe';


const INITIAL_COLOR: number = 0;
const FINAL_COLOR: number = 1;

const COVERING: number = 1;
const DELAY: number = 1


interface WipeStage {
  delay: number,
  background: number;
  color: number;
  duration: number;
  diameter: number;
  initiated: boolean;
}
interface WipeParameters {
  color: string;
  duration: number;
  cover: boolean;
}


@Component({
  selector: 'styled-circle-wipe',
  templateUrl: './styled-circle-wipe.component.html',
  styleUrls: ['./styled-circle-wipe.component.scss']
})
export class StyledCircleWipeComponent implements OnInit, OnDestroy {

  @Input() wipe$: Observable<CircularWipe>;
  @Output() initiated: EventEmitter<boolean> = new EventEmitter();
  @Output() color: EventEmitter<string> = new EventEmitter();

  currentWipe: CircularWipe;
  wipeIndex: number = 0;
  wipeTimer: number;
  wipeStage$: BehaviorSubject<WipeParameters> = new BehaviorSubject(null)

  wipeStages: WipeStage[] = [
    {
      delay: 0,
      background: INITIAL_COLOR,
      color: INITIAL_COLOR,
      diameter: 0,
      duration: DELAY,
      initiated: false
    },
    {
      delay: 0,
      background: INITIAL_COLOR,
      color: INITIAL_COLOR,
      diameter: 0,
      duration: 0,
      initiated: false,
    },
    {
      delay: 1,
      background: INITIAL_COLOR,
      color: FINAL_COLOR,
      diameter: COVERING,
      duration: DELAY,
      initiated: true,
    },
    {
      delay: -1,
      background: FINAL_COLOR,
      color: FINAL_COLOR,
      diameter: 0,
      duration: 0,
      initiated: true,
    },
  ]

  unsubscribe$: Subject<null> = new Subject();

  constructor(private applicationRef: ApplicationRef) { }

  ngOnInit() {
    this.wipe$
      .pipe(
        tap((wipe: CircularWipe) => {
          if (wipe) {
            console.log("WIPE", wipe);
            this.currentWipe = Object.assign({
              initialBackgroundColor: this.currentWipe ? this.currentWipe.finalBackgroundColor : '',
              durationInMilliseconds: this.currentWipe ? this.currentWipe.durationInMilliseconds : 0
            },
              wipe);
            /**
             * this timeout is necessary in iframe embedded version to trigger change detection
             */
            setTimeout(() => {
              this.resetWipeTimer();

            });
          }


        }),
        takeUntil(this.unsubscribe$)
      ).subscribe()
  }

  resetWipeTimer() {
    this.wipeIndex = 0;
    console.log("setting wipe timer with delay", this.wipeStages[0].delay);

    this.wipeTimer = <any>setTimeout(this.getWipeStepTimeoutFunction(0), this.wipeStages[0].delay)
  }
  getWipeStepTimeoutFunction(index: number) {
    return () => {
      clearTimeout(this.wipeTimer);
      if (index < this.wipeStages.length - 1) {

        const delay = this.wipeStep();
        this.wipeTimer = <any>setTimeout(this.getWipeStepTimeoutFunction(index + 1), delay);
      }

    }
  }

  wipeStep(): number {
    this.wipeIndex += 1;
    const wipeStage = this.wipeStages[this.wipeIndex];

    this.color.emit(wipeStage.background ? this.currentWipe.finalBackgroundColor : this.currentWipe.initialBackgroundColor);
    this.initiated.emit(wipeStage.initiated);


    const wipeParameters: WipeParameters = {
      color: (wipeStage.color ? this.currentWipe.finalBackgroundColor : this.currentWipe.initialBackgroundColor),
      duration: (wipeStage.duration ? this.currentWipe.durationInMilliseconds : 0),
      cover: wipeStage.diameter > 0
    };
    this.wipeStage$.next(wipeParameters);
    this.applicationRef.tick();
    return wipeStage.delay ? this.currentWipe.durationInMilliseconds : 0;
  }
  getDiameter(cover: boolean): number {
    return cover ? (this.currentWipe.diameterInPixels ?
      this.currentWipe.diameterInPixels
      : Math.ceil(Math.hypot(window.outerWidth, window.outerHeight)) + 100)
      : 0;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
