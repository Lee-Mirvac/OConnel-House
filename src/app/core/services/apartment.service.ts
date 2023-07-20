import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SpinnerService } from 'src/app/components/shared/spinner/spinner.service';

@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  private floorplanImg = new Subject<any>();
  private receivedData = new Subject<any>();
  constructor(private spinner: SpinnerService) {
    window.document.addEventListener(
      'send_data_to_web',
      async (e: any) => {},
      false
    );

    window.document.addEventListener('loderIn3DModel', (event: any) => {
      if (event.detail.start) {
        this.spinner.showSpinner();
      } else {
        this.spinner.HideSpinner();
      }
    });
  }
  emitEvent = (name: any, data: any) => {
    let event = new CustomEvent(name, { detail: data });
    document.dispatchEvent(event);
  };

  sendImg(data: any) {
    this.floorplanImg.next(data);
  }

  getFloarPlainImage() {
    return this.floorplanImg.asObservable();
  }

  sendData(data: any) {
    this.receivedData.next(data);
  }
  getReceivedData() {
    return this.receivedData.asObservable();
  }
}
