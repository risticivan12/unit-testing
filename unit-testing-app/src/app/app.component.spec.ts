import { AreaModel, BookingModel, UserModel, BookingEvent, UserListEntry } from './model/interfaces';
import { initialStateMeta, SmartSpacesBookingState, checkMetaData, getUserListEntriesFromBookingEvent } from './reducers/index';

describe('SmartSpacesBookingState', () => {
  it('When state is null - should return null point reference exception', () => {
    expect(() => { getUserListEntriesFromBookingEvent.projector(null, null); }).toThrow(TypeError);
  })
})

describe('SmartSpacesBookingState', () => {
  it('When bookingEvent is undefined - should return empty array', () => {

    var state = { meta: initialStateMeta } as SmartSpacesBookingState
    var areas = [{ id: 1, name: 'Area 1' }, { id: 2, name: 'Area 2' }, { id: 3, name: 'Area 3' }] as AreaModel[];

    expect(getUserListEntriesFromBookingEvent.projector(state, areas)).toEqual([]);
  })
})

describe('SmartSpacesBookingState', () => {
  it('When users are undefined - should return empty array', () => {

    var areas = [{ id: 1, name: 'Area 1' }, { id: 2, name: 'Area 2' }, { id: 3, name: 'Area 3' }] as AreaModel[];

    var bookings = [{ userId: 1, areaId: 1 }] as BookingModel[];

    var bookingEvent = { bookings: bookings } as BookingEvent;

    var state = { meta: initialStateMeta, bookingEvent: bookingEvent} as SmartSpacesBookingState

    expect(getUserListEntriesFromBookingEvent.projector(state, areas)).toEqual([]);
  })
})


describe('SmartSpacesBookingState', () => {
  it('When both arrays are empty - should return empty array', () => {
    expect(getUserListEntriesFromBookingEvent.projector([], [])).toEqual([]);
  })
})

describe('SmartSpacesBookingState', () => {
  it('When areas are null - should return empty array', () => {
    expect(getUserListEntriesFromBookingEvent.projector([], null)).toEqual([]);
  })
})

describe('SmartSpacesBookingState', () => {
  it('Should return array with all users and all area names', () => {
    var state = {} as SmartSpacesBookingState;
    var areas = [{ id: 1, name: 'Area 1' }, { id: 2, name: 'Area 2' }, { id: 3, name: 'Area 3' }] as AreaModel[];
    state.areas = areas;

    var bookings = [{ userId: 1, areaId: 1 } ,{ userId: 2, areaId: 2 }, { userId: 3, areaId: 3}] as BookingModel[];
    var users = [{ id: 1, username: 'user 1' }, { id: 2, username: 'user 2' }, { id: 3, username: 'user 3' }] as UserModel[];

    var bookingEvent = { bookings: bookings, users: users } as BookingEvent;

    state.bookingEvent = bookingEvent;

    var result = [{ user: users[0], areaName: 'Area 1' }, {user: users[1], areaName: 'Area 2'}, {user: users[2], areaName: 'Area 3'}] as UserListEntry[];

    expect(getUserListEntriesFromBookingEvent.projector(state, areas)).toEqual(result);
  })
})

describe('SmartSpacesBookingState', () => {
  it('Should return array where areaName will be populated only for first user with id=1', () => {
    var state = {} as SmartSpacesBookingState;
    var areas = [{ id: 1, name: 'Area 1' }, { id: 2, name: 'Area 2' }, { id: 3, name: 'Area 3' }] as AreaModel[];
    state.areas = areas;

    var bookings = [{ userId: 1, areaId: 1 }] as BookingModel[];
    var users = [{ id: 1, username: 'user 1' }, { id: 2, username: 'user 2' }, { id: 3, username: 'user 3' }] as UserModel[];

    var bookingEvent = { bookings: bookings, users: users } as BookingEvent;

    state.bookingEvent = bookingEvent;

    var result = [{ user: users[0], areaName: 'Area 1' }, {user: users[1], areaName: ''}, {user: users[2], areaName: ''}] as UserListEntry[];

    expect(getUserListEntriesFromBookingEvent.projector(state, areas)).toEqual(result);
  })
})


const invokeActionReducer = (initialState: any, action: any) => {
  return checkMetaData((state) => state)(initialState, action);
};

it('if areas are not loaded, should return empty array', () => {
    var state = {} as SmartSpacesBookingState;

    state.meta = initialStateMeta;

  expect(invokeActionReducer(state, {})).toEqual({});
});

