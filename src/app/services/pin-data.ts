import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import * as fromPins from '../reducers/pins';
import { Pin } from '../models/pin';
import { Comment } from '../models/comment';
import { environment } from '../../environments/environment';
import { ApiUrl } from '../app.api-url';
import { HttpService } from './http';

@Injectable()
export class PinDataService {
  PinState: Observable<fromPins.State>;
  pinsCount: number = 0;

  constructor(
    public db: AngularFireDatabase,
    public http: HttpService
  ) {
  };

  getPins() {
    return this
      .http.get("pins")
      .map(res => res.json().data)
      .map(pins => pins.map(pin => new Pin(pin)))

    // this.pinsCount += 20
    // return this.db
    //   .list('pins/', {
    //     query: {
    //       limitToFirst: this.pinsCount,
    //     }
    //   })
    //   .map(pins => pins.map(pin => new Pin(pin)));
  }

  getComments(pinId: string) {
    return this
      .http.get(`pins/${pinId}`)
      .map(res => res.json().data.comments)
      .map(comments => comments)
  }

  addComment(comment: Comment) {
    this.db.list('comments').push(new Comment(comment));
  }

  deleteComment(id) {
    this.db.list('comments').remove(id)
  }
}