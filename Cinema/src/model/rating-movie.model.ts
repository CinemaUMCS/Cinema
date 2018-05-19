import {MovieModel} from './movie.model';

export interface RatingMovieModel {
  id: number;
  movie: MovieModel;
  rating?: number;
}
