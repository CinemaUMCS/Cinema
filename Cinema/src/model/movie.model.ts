import {CategoryModel} from './category.model';

export interface MovieModel {
  id: number;
  title: string;
  category: string;
  description: string;
  productionDate: Date;
  trailerPath: string;
  posterPath: string;
  duration: string;
  MinimalAge: number;
}
