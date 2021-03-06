import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundEffectComponent } from './background-effect/background-effect.component';
import { StyledCircleWipeComponent } from './styled-circle-wipe/styled-circle-wipe.component';
import { StyledBackgroundComponent } from './styled-background/styled-background.component';

import { BackgroundReducer } from './reducers';
import { WelcomeViewComponent } from './welcome-view/welcome-view.component';
import { StyledTitlesComponent } from './styled-titles/styled-titles.component';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundEffectComponent,
    StyledCircleWipeComponent,
    StyledBackgroundComponent,
    WelcomeViewComponent,
    StyledTitlesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({
      background: BackgroundReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
