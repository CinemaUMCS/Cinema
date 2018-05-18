import {Pipe, PipeTransform} from '@angular/core';
import {RatingMovieModel} from '../../../model/rating-movie.model';

@Pipe({
  name: 'filterRatingPipe'
})
export class FilterRatingPipePipe implements PipeTransform {

  transform(value: RatingMovieModel[], args?: any): any {
    if (args == null) {
      return value;
    } else if (args === false) {
      return value.filter(value2 => value2.rating == null);
    }else {
      return value.filter(value2 => value2.rating !== null);
    }

  }

}
