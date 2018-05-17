import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {HeaderOpacityService} from './header-opacity.service';

@Injectable()
export class ActualComponentResolverService implements Resolve<any> {
  constructor(private headerOpacityService: HeaderOpacityService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const url = route.url;
    this.headerOpacityService.isDashboardComponentLoad(false);
    console.log(url);
    return true;
  }

}
