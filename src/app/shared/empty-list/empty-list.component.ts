import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-empty-list',
  templateUrl: './empty-list.component.html',
  styleUrls: ['./empty-list.component.scss']
})
export class EmptyListComponent implements OnInit {

  @Input('item') item: string;
  constructor() { }

  ngOnInit() {
  }

}
