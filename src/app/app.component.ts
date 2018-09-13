import {Component, OnInit, Injectable } from '@angular/core';
import { KittensService } from './Services/kittens.service';
import { KittenService } from './Services/kitten.service';
import { Observable } from 'rxjs/Observable';
import {observable} from 'rxjs/symbol/observable';
import {Observer} from 'rxjs/Observer';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [KittensService, KittenService]
})
@Injectable()
export class AppComponent implements OnInit {
    constructor(private Kittens: KittensService, private Kitten: KittenService) {
    }
    title = 'app';
    MessageLabel = ''; // Messages
    items: any[]; // List items
    isMatch = 0; // Like indicator
    isDisLike = 0; // Dislike indicator
    isSuperMatch = 0; // Super like indicator
    additionalClasses = '';
    id = 0;
    ngOnInit() {
        this.getItems(); // get records @ application init.
    }

    /**
     * Modern delay function with promise
     * @param {number} ms
     * @returns {Promise<any>}
     */
    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    /**
     * Get Items function
     */
    getItems() {
        this.MessageLabel = 'Loading Please wait...'; // loading msg
        this.Kittens.getHttpKittens().subscribe(items => { // subscribe to api to get records
                this.items = items; // save the records to local array
                this.MessageLabel = '';
            });
    }

    /**
     * Super Like function
     */
    superLike() {
      this.isMatch = 1;
      this.isSuperMatch = 1;
    }

    /**
     * Like function
     */
    like() {
        if ( this.items.length > 0 ) { // if there is any records remaining in the array
            if ( 'id' in this.items[0] ) {
                this.id = this.items[0].id; // take id of first record
                this.Kitten.kittenDetails(this.id).subscribe(item => { // subscribe to api
                    if (item.likesYou === true) { // if there is a match
                        this.isMatch = 1; // indicates there is a match in the application (used for front + ts)
                    } else { // If there is no match go to next record only
                        this.nextKitten();
                    }
                });
            }
        }
    }

    /**
     * Dislike function
     */
    disLike() {
      this.isDisLike = 1;
      this.nextKitten();
    }

    /**
     * Next Kitten item.
     */
    nextKitten() {
      if ( this.items.length === 0 )
        this.MessageLabel = 'No Data'; // if no data or marking data finished.
        this.additionalClasses = ''; // reset animations
      if (this.items.length > 0 && this.isMatch === 1 && this.isSuperMatch === 1 ) { // if super like
        this.additionalClasses = ' super-like-stamp fadeOutUp'; // stamp+animate
      } else if ( this.items.length > 0 &&
          (this.isMatch === 1 || ( this.isMatch === 0 && this.isDisLike === 0 )) && this.isSuperMatch === 0 ) { // if like only
          this.additionalClasses = ' like-stamp rollOutRight'; // stamp+animate
      } else if ( this.isDisLike === 1 ) {// if dislike
          this.additionalClasses = ' oops-stamp rollOutLeft'; // stamp+animate
      }
        // rest choices
        this.isMatch = 0;
        this.isSuperMatch = 0;
        this.isDisLike = 0;
        // remove first element after 1.4 seconds
        this.delay(800).then(any => {
            this.items.splice(0, 1);
            this.additionalClasses = '';
        });
    }

}

