import {SeatModel} from './seat.model';

export interface MyBookingModel {
  seanceId: number;
  seatsToReserve: SeatModel[];
  numberOfConcessionaryTickets: number;
  numberOfNormalTickets: number;
}
