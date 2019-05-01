import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { CircularWipe } from '../circular-wipe';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationEvent
} from '@angular/animations';
import { environment } from 'src/environments/environment';
import { BackgroundAction } from '../actions';
//import { QuizService } from '../quiz.service';
import { WelcomeStageAction } from '../actions';

const USE_WELCOME_STAGES: boolean = environment.config.useWelcomeStages;

enum WELCOME_STAGE {
  TITLES = "titles",
  INSTRUCTIONS = "instructions",
  CATEGORY = "category"
}
interface WelcomeStage {
  id: string;
  duration: number
}

@Component({
  selector: 'welcome-view',
  templateUrl: './welcome-view.component.html',
  styleUrls: ['./welcome-view.component.scss'],
  animations: [
    trigger('titles', []),
    trigger('instructions',
      [])
  ]
})
export class WelcomeViewComponent implements OnInit, OnDestroy {

  @Input() categoryTitle: string;
  @Input() quizzesTaken: number;

  public stage$: BehaviorSubject<WelcomeStage> = new BehaviorSubject(null);
  public currentStageIndex: number;
  public WELCOME_STAGE = WELCOME_STAGE;


  showingContent: any = {};
  timer: number[];
  stages: WelcomeStage[] = [
    {
      id: WELCOME_STAGE.TITLES,
      duration: 2000
    },
    {
      id: WELCOME_STAGE.INSTRUCTIONS,
      duration: 2500
    },
    {
      id: WELCOME_STAGE.CATEGORY,
      duration: 5000
    },
  ]
  //unsubscribe$ : Subject<null> = new Subject();
  constructor(private store: Store<any>
    //, private quizService: QuizService
  ) { }

  ngOnInit() {
    this.timer = Array(this.stages.length)
    this.initializeAtStage(0);
  }
  initializeAtStage(index: number) {
    this.store.dispatch(new BackgroundAction(
      {
        wipeId: "welcome",
        showOverlayAfterWipe: true
      }
    ))
    this.setCurrentStage(index);
  }
  setCurrentStage(index: number) {
    this.currentStageIndex = index;
    this.showingContent[this.stages[this.currentStageIndex].id] = true;
    this.stage$.next(this.stages[this.currentStageIndex]);
    this.store.dispatch(new WelcomeStageAction(this.currentStageIndex, "STARTED"));
    this.timer[index] = USE_WELCOME_STAGES ? <any>setTimeout(this.getTimeout(index), this.stages[index].duration) : 0;
  }

  onAnimationEvent(event: AnimationEvent) {
    const index = this.currentStageIndex;
    const showing = this.showingContent[this.stages[index].id];
    if (event.triggerName === 'titles' || event.triggerName === 'instructions') {
      if (event.phaseName === 'done') {
        if (!showing) {
          this.setCurrentStage(index + 1);
        }
      }
    }
  }
  getTimeout(index: number): Function {
    return () => {

      if (index < this.stages.length - 1) {
        this.showingContent[this.stages[index].id] = false;
      }
      if (index >= 0 && index < this.stages.length) {
        clearTimeout(this.timer[index]);
        this.store.dispatch(new WelcomeStageAction(index, "ENDED"));
      }
    }
  }




  updateStage(index: number, shown: true) {
    const id: string = this.stages[index].id;
    if (!shown) {
      this.setCurrentStage(index + 1);
    }
  }

  ngOnDestroy() {

  }
}
