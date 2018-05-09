import {SeatModel} from './seat.model';

export interface MyBookingModel {
  seanceId: number;
  bookingSeats: SeatModel[];
  numberOfConcessionaryTickets: number;
  numberOfNormalTickets: number;
}
