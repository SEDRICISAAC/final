import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  table_header: any
  clienteForm: FormGroup

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.getDataCliente()
    this.formularioCliente()

    this.table_header = [
      {
        id: 'N°',
        identificacion: 'Identificacíon',
        nombre: 'Nombre',
        apellido: 'Apellido',
        direccion: 'Dirección'
      }
    ]
  }

  formularioCliente(){
    this.clienteForm = this.formBuilder.group({
      id: [''],
      identificacion: ['',[Validators.required,Validators.pattern('^[0-9]{1,10}')]],
      nombre: ['',[Validators.required,Validators.pattern('^[A-Z]+[a-z]*$')]],
      apellido: ['',[Validators.required,Validators.pattern('^[A-Z]+[a-z]*$')]],
      direccion: ['',[Validators.required,Validators.pattern('^[A-Z]+[a-z]*$')]]
    });
  }

  //PAGINA PRINCIPAL
  respuestaClientes: any[]

  getDataCliente = () => {
    let tabla = 'cliente'
    this.http.get<any>(environment.API_URL + `?tabla=${tabla}`)
    .subscribe(data => {
      this.respuestaClientes = data.datos
    })
  }

  deleteDataTable = (value) => {
    let tabla = 'cliente'
    this.http.delete(environment.API_URL + `?tabla=${tabla}&&id=${value}`)
    .subscribe( data => { })
    window.location.reload()
  }
  //PAGINA PRINCIPAL

  //MODAL NEW CLIENTE
  postDataCliente = () => {
    let id
    let identificacion = this.clienteForm.get('identificacion').value
    let nombre = this.clienteForm.get('nombre').value
    let apellido = this.clienteForm.get('apellido').value
    let direccion = this.clienteForm.get('direccion').value

    let tabla = 'cliente'
    let register = {tabla: tabla, datos: [{identificacion: identificacion, nombre: nombre, direccion: direccion, apellido: apellido}]}
    this.http.post<any>(environment.API_URL, register)
    .subscribe( data => {
      if(data.ok == true){
        Swal.fire({
          type: 'success',
          title: 'Genial!',
          text: 'Proveedor registrado'
        })
      }
      else{
        Swal.fire({
          type: 'error',
          title: 'Ups!',
          text: 'No se pudo registrar el proveedor'
        })
      }
      // this.postData = data
    })
   
  }
  //MODAL NEW PROVCLIENTEEEDOR

}
