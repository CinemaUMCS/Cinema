import {ReservedSeatModel} from './reservedSeat.model';

export interface ReservationModel {
  id: number;
  paid: boolean;
  reservedSeats: ReservedSeatModel[];
  numberOfConcessionaryTickets: number;
  numberOfNormalTickets: number;
  value: number;
  seanceId: number;
  userId: number;
}
