import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  verticesForm = new FormGroup({});

  vertices=[1,2,3,4,5,6,7,8,9,10];
  title = 'Grafos';

  selectedCar: number = 0;

    cars = [
        { id: 0, name: 'no conecta' },
        { id: 1, name: 'conecta' },
    ];

    tets(variable: any) {
      let i;
      let vector = [];
      for(i=0 ;i<variable;i++) {
        vector[i] = i + 1;
      }

      this.vertices = vector;

      console.log(this.vertices);
      
    }

}
