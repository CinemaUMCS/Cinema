// http://localhost:5000/room/availableRooms?seanceStart=2018-12-03T12:35&seanceEnd=2018-12-03T16:35
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';
import {RoomModel} from '../../../model/room.model';

const url = 'http://localhost:5000/';



@Injectable()
export class RoomService {
  rooms: RoomModel[];
  roomSubject = new Subject<RoomModel[]>();

  constructor(private http: HttpClient) {
    this.updateRoomsFromDb();
  }

  getRooms() {
    return this.rooms;
  }

  getRoom(id: number) {
    return this.http.get<RoomModel>(url + 'room/' + id, {responseType: 'json'});
  }

  updateRoom(id: number, model: RoomModel) {
    console.log(model);
    return this.http.put<RoomModel>(url + 'room/' + id, model);
  }

  addRoom(model: RoomModel) {
    console.log("posting model: ");
    console.log(model);
    return this.http.post<RoomModel>(url + 'room', model);
  }

  updateRoomsFromDb() {
    this.http.get<RoomModel[]>(url + 'room', {responseType: 'json'}).subscribe( (data) => {
      this.rooms = data;
      console.log(data);
      this.roomSubject.next(this.rooms);
    });
  }

  remove(id: number) {
    console.log(id);
    this.http.delete<RoomModel>(url + 'room/' + id).subscribe(
      data => {
        this.updateRoomsFromDb();
      }
    );
  }

  getGetAvailableRooms(startDate: string, endDate: string) {
    return this.http.get<RoomModel[]>(url + 'room/availableRooms?seanceStart='+startDate+'&seanceEnd=' + endDate);
  }


}
