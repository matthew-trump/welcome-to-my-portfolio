import {
    animation, trigger, animateChild, group,
    transition, animate, style, query
} from '@angular/animations';

export const fadeInSlideInVerticalAnimation = animation([
    style({
        transform: 'translateY({{initialVerticalOffset}})',
        opacity: 0.1
    }),
    animate('{{duration}} {{delay}} ease-in',
        style({
            transform: 'translateY(0px)',
            opacity: 1
        })
    )
]);