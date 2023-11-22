import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IframeService {
  constructor() {}

  emitEvent = (name: string, data: any) => {
    let event = new CustomEvent(name, { detail: data });
    document.dispatchEvent(event);
  };

  sendDataToMap = (data: any) => {};
}
