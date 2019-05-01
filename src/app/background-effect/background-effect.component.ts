import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { CircularWipe } from '../circular-wipe';
import { BackgroundState } from '../background-state';

import { environment } from 'src/environments/environment';

const BACKGROUND: any = environment.config.background;

@Component({
  selector: 'background-effect',
  templateUrl: './background-effect.component.html',
  styleUrls: ['./background-effect.component.scss']
})
export class BackgroundEffectComponent implements OnInit {


  state: BackgroundState;
  wipe$: BehaviorSubject<CircularWipe> = new BehaviorSubject(null);
  backgroundColor: string = BACKGROUND.color;
  showOverlay: boolean = false;

  unsubscribe$: Subject<null> = new Subject();

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.select("background")
      .pipe(
        tap((state: any) => {
          this.state = state.background;
          if (state.background) {
            this.wipe$.next(BACKGROUND.circularWipe[this.state.wipeId]);
          }
        }),
        takeUntil(this.unsubscribe$)
      ).subscribe();
  }
  setBackgroundColor(color: string) {
    this.backgroundColor = color;
  }
  setOverlay(show: boolean) {
    this.showOverlay = show;
  }
  wipeInitiated() {
    this.setOverlay(this.state && this.state.showOverlayAfterWipe ? true : false);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
