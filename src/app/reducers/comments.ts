import { User } from '../models/user';
import * as comment from '../actions/comment';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { createSelector } from 'reselect';
import { Pin } from '../models/pin';
import { Comment } from '../models/comment';

export interface State {
  ids: string[];
  entities: { [id: string]: Comment };
}

const initialState: State = {
  ids: [],
  entities: {}
};

export function reducer(state = initialState, action: comment.Actions): State {
  switch(action.type) {
    case comment.ActionTypes.LOAD_COMMENTS_SUCCESS: {
      const comments = action.payload;
      const newComments = comments.filter(comment => !state.entities[comment.id])

      const newCommentIds = newComments.map(comment => comment.id);
      const newEntities = newComments.reduce((entities: { [id: string]: Comment }, comment: Comment) => {
        return Object.assign(entities, {
          [comment.id]: comment
        });
      }, {});
      
      return Object.assign({}, state, {
        ids: [ ...state.ids, ...newCommentIds ],
        entities: Object.assign({}, state.entities, newEntities)
      })
    }
    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */


export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;