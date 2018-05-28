import {SeatModel} from './seat.model';

export interface ReservedSeatModel {
  id: number;
  reservationId: number;
  seat: SeatModel;
}
