import { Component } from '@angular/core';
import { Spinkit } from 'ng-http-loader'; 

@Component({
  selector: 'app-root',
  template: `
  <ng-http-loader 
    [backdrop]="false"
    [backgroundColor]="'#1A7D47'"
    [debounceDelay]="100"
    [extraDuration]="300"
    [minDuration]="300"
    [opacity]=".9"
    [spinner]="spinkit.skCubeGrid">
</ng-http-loader>
  <router-outlet></router-outlet>
  `
})
export class AppComponent {
  public spinkit = Spinkit;
}
