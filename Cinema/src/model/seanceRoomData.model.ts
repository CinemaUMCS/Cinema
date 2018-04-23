import {SeatModel} from './seat.model';

export interface SeanceRoomDataModel {
  roomId: number;
  seanceId: number;
  seatsInRoom: SeatModel[];
  reservedSeats: SeatModel[];
}
