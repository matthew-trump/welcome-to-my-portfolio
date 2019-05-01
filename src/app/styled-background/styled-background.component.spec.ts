import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyledBackgroundComponent } from './styled-background.component';

describe('StyledBackgroundComponent', () => {
  let component: StyledBackgroundComponent;
  let fixture: ComponentFixture<StyledBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyledBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyledBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
