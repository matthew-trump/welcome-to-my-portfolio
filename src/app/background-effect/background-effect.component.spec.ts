import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundEffectComponent } from './background-effect.component';

describe('BackgroundEffectComponent', () => {
  let component: BackgroundEffectComponent;
  let fixture: ComponentFixture<BackgroundEffectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundEffectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
