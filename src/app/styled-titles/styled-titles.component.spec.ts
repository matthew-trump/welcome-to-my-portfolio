import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyledTitlesComponent } from './styled-titles.component';

describe('StyledTitlesComponent', () => {
  let component: StyledTitlesComponent;
  let fixture: ComponentFixture<StyledTitlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyledTitlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyledTitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
