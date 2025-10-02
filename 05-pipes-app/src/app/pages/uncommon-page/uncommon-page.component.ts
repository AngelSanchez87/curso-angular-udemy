import { Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, UpperCasePipe, TitleCasePipe, AsyncPipe } from '@angular/common';
import { interval, map, tap } from 'rxjs';

const client1 = {
  name: 'Angel',
  gender: 'male',
  age: 38,
  address: 'Alcobendas, Spain'
}

const client2 = {
  name: 'Athenea',
  gender: 'female',
  age: 35,
  address: 'Alcobendas, Spain'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [CardComponent, I18nSelectPipe, I18nPluralPipe, SlicePipe, JsonPipe, UpperCasePipe, KeyValuePipe, TitleCasePipe, AsyncPipe ],
  templateUrl: './uncommon-page.component.html',
  styleUrl: './uncommon-page.component.css'
})
export default class UncommonPageComponent {

  //i18n Select
  client = signal(client1)
  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla'
  }
  changeClient() {
    if (this.client() === client1) {
      this.client.set(client2)
      return
    }
    this.client.set(client1)
  }

  //i18n Plural
  clientsMap = signal({
    '=0': 'no tenemos ningun cliente esperando',
    '=1': 'tenemos un cliente esperando',
    '=2': 'tenemos 2 clientes esperando',
    other: 'tenemos # clientes esperando'
  })
  clients = signal([
    'Maria',
    'Pablo',
    'Fernando',
    'Lucía',
    'Antonio',
    'Natalia',
    'Juan'
  ])

  deleteClient() {
    this.clients.update(prev => prev.slice(1))
  }


  //keyvalue pipe
  profile = {
    name: 'Fernando',
    age: 35,
    address: 'Alcobendas'
  }


  //async pipe
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      //reject('Error en la promesa')

      resolve('Tenemos data en la promesa')
      console.log('promesa terminada')
    }, 3500)
  })


  //myobservable timer
  myObservableTimer = interval(2000).pipe(
    map(value => value + 1),
    tap(value => console.log(value))
  )
}
