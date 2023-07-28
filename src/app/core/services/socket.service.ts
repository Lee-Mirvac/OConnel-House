import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public socket: any | undefined;
  clientID: string = '11213123';
  private data = new Subject<any>();
  constructor() { }

  connect() {
    // this.socket = new WebSocket(
    //   `${environment.socketUrl}?clientID=${this.clientID}&isIntuiface=false`
    // );

    // this.socket.onmessage = function (event: any) {
    //   let message = JSON.parse(event.data);
    // };

    // this.socket.onopen = function (e: any) {
    //   // console.log('Socket connected!!');
    // };
  }

  /**
   *
   * @param eventName Function for emit any event
   * @param data
   */
  emitSocket(data: any) {
    if (this.socket) this.socket?.send(JSON.stringify({ data: data }));
  }

  getSocketEventData() {
    return this.data.asObservable();
  }

}
