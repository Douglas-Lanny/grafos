import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  sw = false;
  sw2 = false;

  vertices: any[] = [];

  matrizAdyacencia: any[] = [];

  matrizIncidencia: any[] = [];

  matrixVertices = this.fb.group({});

  numeroLados: any[] = [];

  clasificacion = {isEuler: false, isComplete: false, isRegular: false};



  constructor(private fb: FormBuilder, private modalService: NgbModal) {

  }

  ngOnInit() { }

  tets(variable: any) {

    this.setVertices(variable);

    this.vertices.forEach(
      v => this.matrixVertices.addControl(`${v}`, this.addVerticeForm(v))
    );

    this.sw = true;

    this.changeGrafo();

  }

  setVertices(variable: any) {
    let i: number;
    for (i = 0; i < variable; i++) {
      this.vertices.push(i + 1);
    }
  }

  addVerticeForm(verticeDisable: any) {
    const verticeForm = this.fb.group({});
    this.vertices.forEach(v => {
      verticeForm.addControl(`${v}`, new FormControl({ value: false, disabled: v === verticeDisable }));
    });
    return verticeForm;
  }



  changeGrafo() {
    this.vertices.forEach(
      (x) => {
        this.vertices.forEach(
          y => {
            this.matrixVertices.get(`${x}`)?.get(`${y}`)?.valueChanges.subscribe(
              value => {
                this.matrixVertices.get(`${y}`)?.get(`${x}`)?.setValue(value, {
                  emitEvent: false
                });
              }
            );
          }
        )
      }
    );
  }




  openModalMatrizAdyacencia(content: any) {

    let row: any[];
    this.vertices.forEach(x => {
      row = [];
      this.vertices.forEach(y => {
        let value = this.matrixVertices.get(`${x}`)?.get(`${y}`)?.value;
        row.push(value ? 1 : 0);
      });

      this.matrizAdyacencia.push(row);

    });

    this.openModalMatrizIncidencia();
    const modal = this.modalService.open(content, { fullscreen: true });
    modal.result.then(
      () => {
        this.matrizAdyacencia = [];
        this.matrizIncidencia = [];
        this.numeroLados = [];
      }
    );
  }

  openModalMatrizIncidencia() {
    let contadorLados = 0
    const lados: any[] = [];
    let row: any[] = [];

    this.vertices.forEach(x => {

      this.vertices.forEach(y => {
        if (y > x) {
          let value = this.matrixVertices.get(`${x}`)?.get(`${y}`)?.value;
          if (value) {
            lados.push([x, y]);
            contadorLados = contadorLados + 1;
            this.numeroLados.push(contadorLados);
          }
        }
      });
    });


    this.vertices.forEach(x => {
      row = [];
      lados.forEach((y: any[]) => {
        row.push(y.includes(x) ? 1 : 0);
      });


      this.matrizIncidencia.push(row);

    });



  }

  isEuler(grados: any[]) {
    let value = true
    let i = 0;
    const n = grados.length;
    do {

      value = grados[i] % 2 === 0;

      i++;

    } while (i < n && value)

    return value;
  }

  isComplete(grados: any[]) {
    let acumulador = 0;

    const n = grados.length;

    grados.forEach(x => { acumulador = acumulador + x });

    return n * (n - 1) === acumulador;
  }

  isRegular(grados: any[]) {
    let n = grados.length;

    let value = true;

    let i = 0;

    do {

      value = grados[i] === grados[i + 1];
      i++

    } while (i < n - 1 && value);

    return value;

  }

  setGradeGraf() {
    let grados: any[] = [];

    this.vertices.forEach(x => {
      let acumulador = 0;
      this.vertices.forEach(y => {
        let value = this.matrixVertices.get(`${x}`)?.get(`${y}`)?.value ? 1 : 0;

        acumulador = acumulador + value;
      });
      grados.push(acumulador);
    });

    return grados;
  }

  caracteristica(){

    const grados = this.setGradeGraf();

    const isEuler = this.isEuler(grados);
    const isComplete = this.isComplete(grados);
    const isRegular = this.isRegular(grados);

    this.clasificacion = {isEuler, isComplete, isRegular};
    this.sw2 = true;

  }




}
