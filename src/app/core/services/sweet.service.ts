import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetService {

  constructor() { }

  async logoutSwal() {
    return await Swal.fire({
      title: 'Logout',
      text: "Are you sure you want to logout?",
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#A68A5F',
      cancelButtonColor: '#727272',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      focusCancel: true
    })
  }

  async deleteSwal() {
    return await Swal.fire({
      title: 'Delete',
      text: "Are you sure you want to delete?",
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: "#5985a7",
      cancelButtonColor: '#727272',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      focusCancel: true
    })
  }
}
