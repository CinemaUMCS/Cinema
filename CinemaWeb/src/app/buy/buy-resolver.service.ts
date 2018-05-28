import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {SeanceService} from '../shared/seance.service';

@Injectable()
export class BuyResolverService implements Resolve<any> {

  private seanceId: number;

  constructor(private seance_service: SeanceService) {
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    this.seanceId = route.params['seanceId'];
    return this.seance_service.getSeanceById(this.seanceId);
  }

  // getSeance(seanceId: number) {
  //   this.seance_service.getSeanceById(seanceId).subscribe(
  //     value => {
  //       this.seance = value.json();
  //     },
  //     error2 => {
  //       console.log(error2);
  //     }
  //   );
  //
  // }
}
