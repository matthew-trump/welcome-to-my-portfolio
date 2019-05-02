import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  trigger,
  group,
  query,
  transition,
  useAnimation,
  AnimationEvent
} from '@angular/animations';
const ANIMATIONS: any = environment.config.animations.welcome.titles;

import { fadeInSlideInVerticalAnimation } from '../animations/fade-in-slide-in-vertical';
import { fadeOutAndScaleAnimation } from '../animations/fade-out-and-scale';
@Component({
  selector: 'styled-titles',
  templateUrl: './styled-titles.component.html',
  styleUrls: ['./styled-titles.component.scss'],
  animations: [
    trigger('showing', [

      transition(':enter', [
        group([
          query('.name', [
            useAnimation(fadeInSlideInVerticalAnimation, {
              params: ANIMATIONS.enter[0]
            })
          ]),

          query('.title', [
            useAnimation(fadeInSlideInVerticalAnimation, {
              params: ANIMATIONS.enter[1]
            })
          ]),
          /***
          query('.block-3', [
            useAnimation(fadeInSlideInVerticalAnimation, {
              params: ANIMATIONS.enter[2]
            })
          ]),
           */
        ])
      ],
      ),
      transition(':leave', [
        query('.block', [
          useAnimation(fadeOutAndScaleAnimation, {
            params: ANIMATIONS.leave
          })
        ])
      ],
      ),

    ])
  ]
})
export class StyledTitlesComponent implements OnInit {
  @Input() shown: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
