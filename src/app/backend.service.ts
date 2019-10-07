import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { mergeMap, reduce } from 'rxjs/operators';

@Injectable()
export class BackendService {
  rootUrl = 'https://swapi.co/api';

  constructor(
    private http: HttpClient
  ) {}

  fetchStarships() {
    console.log('here');
    return this.http.get(`${this.rootUrl}/starships`);
  }

  getPerson(id: number) {
    return this.http.get(`${this.rootUrl}/people/${id}`);
  }

  getItem(url: string) {
    return this.http.get(url);
  }

  fetchPeople(peopleUrls: any[]) {
    console.log(peopleUrls);
    const people$ = from(peopleUrls)
      .pipe(
        mergeMap(item => this.getItem(item)),
        reduce((acc, current) => {
          acc.push(current);
          return acc;
        }, [])

      );
    return people$;
  }
}
