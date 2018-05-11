import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {SeanceRoomDataModel} from '../../model/seanceRoomData.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class BuyProcessService {

  step1FlagComplete = new BehaviorSubject(false);
  step1flag = this.step1FlagComplete.asObservable();

  setStep1Flag(flag: boolean){
    this.step1FlagComplete.next(flag);
  }


}
