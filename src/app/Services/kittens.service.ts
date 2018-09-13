import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import {Http} from '@angular/http';

@Injectable()
export class KittensService {
 private kittensAPI_URL = 'http://my-json-server.typicode.com/airtame/kittens/kittens/';
  constructor(private http: Http) { }
    /**
     * @method getHttpKittens, used to call REST API directly to get list of kittens
     * @returns {Observable<any>}
     */
    getHttpKittens() {
        return this.http.get(this.kittensAPI_URL)
            .map((res: any) => res.json());
    }
}
