import {Time} from '@angular/common';

export interface SeanceModel {
  id: number;
  seanceStart: string;
  duration: string;
  concessionaryTicketPrice: string;
  normalTicketPrice: string;
  movieId: string;
  roomId: string;
}
