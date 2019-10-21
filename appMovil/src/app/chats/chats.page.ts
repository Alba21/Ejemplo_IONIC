import { Component, OnInit } from '@angular/core';
import { MensajeService } from '../servicios/Mensajeria/mensaje.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  datos: any;
  loading: any;
  constructor(private servicio: MensajeService, public loader: LoadingController) { }

  async ngOnInit() {
    this.loading = await this.loader.create({
      spinner: "lines",
      message: "Espere por favor...",
      duration: 0
    });
    await this.loading.present();
    this.servicio.getConversaciones().subscribe(m => {
      this.loading.dismiss(this.loader);
      this.datos = m;
    })
  }

  doRefresh(event) {
    setTimeout(() => {
      this.servicio.getConversaciones().subscribe(m => {
        this.datos = m;
        event.target.complete();
      })
    }, 2000);
  }

}
