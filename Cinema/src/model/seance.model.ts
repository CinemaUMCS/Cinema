import {Time} from '@angular/common';

export interface SeanceModel {
  id: number;
  seanceStart: Date;
  duration: Time;
  concessionaryTicketPrice: number;
  normalTicketPrice: number;
  movieId: number;
  roomId: number;
}
