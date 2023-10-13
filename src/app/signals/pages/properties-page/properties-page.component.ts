import { Component, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})
export class PropertiesPageComponent {

  public user = signal<User>({
    "id": 1,
		"email": "george.bluth@reqres.in",
		"first_name": "George",
		"last_name": "Bluth",
		"avatar": "https://reqres.in/img/faces/1-image.jpg"
  })

  public fullName = computed(() => `${this.user().first_name} ${this.user().last_name}`);

  public userChangedEffect = effect(() => {
    console.log(this.user().first_name);
  });

  onFieldUpdated(field: keyof User, value: string) {

    // this.user.set({
    //   ...this.user(),
    //   [field]: value,
    // })

    //Al realizar una modificacion dispara automaticamente una actualizacion
    this.user.mutate(current => {
      switch (field) {
        case 'email':
          current.email = value;
          break;
        case 'first_name':
          current.first_name = value;
          break;
        case 'last_name':
          current.last_name = value;
          break;
        case 'id':
          current.id = Number(value);
          break;
      }
    });

    //El valor que yo retorne en el CallBack va a ser el nuevo valor de la señal
    // this.user.update(current => {
    //   return {
    //     ...current,
    //     [field]: value
    //   };
    // })

  }
}
