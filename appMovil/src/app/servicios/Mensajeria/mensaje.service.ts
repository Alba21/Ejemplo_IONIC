import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(private http: HttpClient) { }

  getConversaciones(){
    return this.http.get('http://localhost:3000/conversaciones/1')
  }
}
