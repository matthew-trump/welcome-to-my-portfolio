import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'styled-background',
  templateUrl: './styled-background.component.html',
  styleUrls: ['./styled-background.component.scss']
})
export class StyledBackgroundComponent implements OnInit {

  @Input() background: string;

  constructor() { }

  ngOnInit() { }

}
