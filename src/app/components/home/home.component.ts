import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
  ) { }

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    console.log('AFTER VIEW INIT');
  }

  ngOnDestroy(): void {
    console.log('ON DESTROY');
  }

}
