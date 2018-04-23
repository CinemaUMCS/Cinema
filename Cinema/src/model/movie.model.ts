import {CategoryModel} from './category.model';

export interface MovieModel {
  id: number;
  title: string;
  category: CategoryModel;
  description: string;
  productionDate?: Date;
}
