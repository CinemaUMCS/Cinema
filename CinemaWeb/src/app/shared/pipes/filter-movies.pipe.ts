import {Pipe, PipeTransform} from '@angular/core';
import {MovieModel} from '../../../model/movie.model';

@Pipe({
  name: 'filterMovies'
})
export class FilterMoviesPipe implements PipeTransform {

  transform(allMovies: MovieModel[], movie: MovieModel): any {
    if (movie == null) {
      return allMovies;
    }
    return allMovies.filter(value => value.id === movie.id);
  }

}
