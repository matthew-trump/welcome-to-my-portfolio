import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyledCircleWipeComponent } from './styled-circle-wipe.component';

describe('StyledCircleWipeComponent', () => {
  let component: StyledCircleWipeComponent;
  let fixture: ComponentFixture<StyledCircleWipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyledCircleWipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyledCircleWipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
