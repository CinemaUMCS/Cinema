import { Time } from "ngx-bootstrap/timepicker/timepicker.models";

export interface Movie {
  id: number,
  title: string,
  description: string,
  category: string,
  productionDate: Date,
  posterPath: string,
  trailerPath: string
}

export interface Seance {
  id: number,
  seanceStart: Date,
  duration: Time,
  concessionaryTicketPrice: number,
  normalTicketPRice: number,
  movieId: number,
  roomId: number,
}
