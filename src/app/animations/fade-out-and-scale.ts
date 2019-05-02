import {
    animation,
    animate, style
} from '@angular/animations';

export const fadeOutAndScaleAnimation = animation([
    style({
        transform: 'scale(1)',
        opacity: 1
    }),
    animate('{{duration}} ease-in',
        style({
            transform: 'scale({{scaling}})',
            opacity: 0
        })
    )
]);