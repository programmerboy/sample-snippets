import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationModel } from './shared/models/navigation.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  
  title = 'sample-snippets';
  logo = '../../../assets/images/app-logo.png';
  navigation: NavigationModel[] = [];

  ngOnInit(): void {
    this.navigation = [
      // new NavigationModel("/samples", "Samples", false),
      new NavigationModel("/imagegrid", "Image Grid"),
    ];
  }
  ngAfterViewInit(): void {
    
  }
  


}
