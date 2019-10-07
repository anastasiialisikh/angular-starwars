import { Component, OnInit } from '@angular/core';
import { BackendService } from './backend.service';
import { filter, mergeMap, mergeAll, map, toArray } from 'rxjs/operators';
import { of } from 'rxjs';
// wft??
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  starships: any;
  constructor(
    private backendService: BackendService
  ) {}

  ngOnInit() {
    this.backendService.fetchStarships()
      .pipe(
        map((data: any) => data.results),
        filter(
          (starships: any) => {
            console.log(starships);

            return starships.filter(item => item.pilots.length);
          }
        ),
        // mergeMap(starship => this.getPilots(starship))
      )
      .subscribe(
        (starships: any) => {
          console.log(starships);
          this.starships = starships;
          of(starships)
            .pipe(
              mergeMap(starship => this.getPilots(starship)),
              toArray()
            )
            .subscribe(
            (res) => {
              console.log(res);

            }


          );
          // console.log(this.getPilots(data));
        }
      );
  }

  getPilots(starship: any) {
    return this.backendService.fetchPeople(starship.pilots);
  }
}
