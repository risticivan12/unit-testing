export interface BookingEvent {
  backgroundArea?: AreaModel;
  bookings: BookingModel[];
  users?: UserModel[];
  whileBookingCreation?: boolean;
}

export interface BookingModel {
  id?: number;
  description?: string | null;
  userId?: number;
  areaId?: number;
  startTime?: string;
  endTime?: string;
  isCheckedIn?: boolean;
  isCheckedOut?: boolean;
  creatorId?: number;
  bookingGroupId?: number | null;
  bookingGroupTypeId?: number | null;
}

export interface AreaModel {
  id?: number;
  name: string;
  parentAreaId?: number | null;
  mapId?: number | null;
  areaTypeId?: number;
  capacity?: number;
  maximumAllowedOccupancyPercent?: number;
  isBookable?: boolean;
  isOccupied?: boolean;
  areaPropertyIds?: Array<number> | null;
  rootAreaId?: number | null;
}
export interface UserListEntry {
  user: UserModel;
  areaName?: string;
  valid?: boolean;
  validTranslationKey?: string;
}

export interface UserModel {
  id?: number;
  username?: string | null;
  externalId?: string | null;
  favoriteWorkPlaceId?: number | null;
  orgUnitId?: number | null;
  orgUnitName?: string | null;
  role?: string | null;
  userSyncType?: string | null;
  userSyncSource?: string | null;
  nickName?: string | null;
  isFirstAider?: boolean;
  mobileNumber?: string | null;
  phoneNumber?: string | null;
  emailAddress?: string | null;
  bookingsAreHidden?: boolean;
  }
