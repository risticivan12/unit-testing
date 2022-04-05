import { BookingModel, AreaModel, UserModel, BookingEvent, UserListEntry } from '../model/interfaces';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MemoizedSelector,
  MetaReducer
} from '@ngrx/store';

export interface State {
    smartSpacesBookingState: SmartSpacesBookingState;
}

export interface SmartSpacesBookingState {
  bookingsCreatedByMe: BookingModel[];
  bookingsCreatedForMe: BookingModel[];
  areas: AreaModel[];
  sessionUser: UserModel | null;
  firstAiders: UserModel[];
  usersBySearchString: UserModel[];
  bookingEvent?: BookingEvent;
  meta: SmartSpacesBookingStateMeta;
}

export interface SmartSpacesBookingStateMeta {
  loadingBookingCreatedByMe: boolean;
  loadingBookingCreatedForMe: boolean;
  loadingAreas: boolean;
  areasLoaded: boolean;
  isAuthenticated: boolean;
  loadingSpinnerActive: boolean;
  loadingBookingsSpinnerActive: boolean;
  isBookingSelectionMode: boolean;
}

export const initialStateMeta: SmartSpacesBookingStateMeta = {
  loadingBookingCreatedByMe: false,
  loadingBookingCreatedForMe: false,
  loadingAreas: false,
  areasLoaded: false,
  isAuthenticated: false,
  loadingSpinnerActive: false,
  loadingBookingsSpinnerActive: false,
  isBookingSelectionMode: false
};


export const initialState: SmartSpacesBookingState = {
  bookingsCreatedByMe: [],
  bookingsCreatedForMe: [],
  areas: [],
  firstAiders: [],
  usersBySearchString: [],
  sessionUser: null,
  meta: initialStateMeta
};

export const stateReducer = createReducer<SmartSpacesBookingState>(
  initialState
);

export const reducers: ActionReducerMap<State> = {
  smartSpacesBookingState : stateReducer
}

export const selectState =  createFeatureSelector<SmartSpacesBookingState>("smartSpacesBookingState");

export const getAllAreas = createSelector(
  selectState,
  (state) => state.areas
);

export const checkMetaData = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return(state, action) => {
    if(state !== undefined && !state.meta.areasLoaded) {
      return reducer({} as SmartSpacesBookingState, action)
    }
    return reducer(state, action)
  }
}

export const metaReducers : MetaReducer<State>[] = [checkMetaData];

export const getUserListEntriesFromBookingEvent : MemoizedSelector<
SmartSpacesBookingState,
UserListEntry[]
> =createSelector(
  selectState,
  getAllAreas,
  (state: SmartSpacesBookingState, areas: AreaModel[]) =>
    state.bookingEvent?.users?.map((user) => {
      const areaName: string = state.bookingEvent?.bookings
        .filter((booking) => booking.userId === user.id)
        .map((booking) => {
          return areas.find((area) => area.id === booking.areaId)?.name;
        })[0] || '';
      return { user, areaName};
    }) as UserListEntry[] ?? []
);

