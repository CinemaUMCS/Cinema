import {Injectable} from '@angular/core';
import {SeanceRoomDataModel} from '../../model/seanceRoomData.model';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class HeaderOpacityService {

  dashboardToolbarColor = new BehaviorSubject('#3F3250');
  dashboardToolbarColorMessage = this.dashboardToolbarColor.asObservable();

  isDashboardComponentLoad(flag: boolean) {
    if (flag) {
      this.dashboardToolbarColor.next('rgba(0, 0, 0, 0.5)');
      // this.dashboardToolbarColor.next('#fff123');
    } else {
      this.dashboardToolbarColor.next('#3F3250');
    }
  }
}
