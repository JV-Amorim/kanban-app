import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent {

  @Input() iconUrl = '';
  @Input() iconAltText = '';
  @Input() iconSize = 16;

  constructor() { }

}
