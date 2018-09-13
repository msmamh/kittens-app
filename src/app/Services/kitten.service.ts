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
export class KittenService {
    private kittenAPI_URL = 'http://my-json-server.typicode.com/airtame/kittens/kittens/';
    constructor(private http: Http) { }
    /**
     * @method kittenDetails, used to get kitten details via id
     * @param {number} id
     * @returns {Observable<any>}
     */
    kittenDetails(id) {
        return this.getHttpKitten(id);
    }
    /**
     * @method getHttpKitten, used to call REST API via get directly from provided api
     * @param id
     * @returns {Observable<any>}
     */
    getHttpKitten(id) {
        return this.http.get(this.kittenAPI_URL + id)
            .map((res: any) => res.json());
    }
}
