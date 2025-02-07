import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-music',
  templateUrl: './form-music.component.html',
  styleUrls: ['./form-music.component.css']
})
export class MusicFormComponent implements OnInit {
  musicForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Inicializando el formulario con validaciones
    this.musicForm = this.fb.group({
      name: ['', [Validators.required]],  // El nombre es requerido
      genre: ['', [Validators.required]], // El género es requerido
    });
  }

  onSubmit(): void {
    if (this.musicForm.valid) {
      const music = this.musicForm.value;
      console.log('Formulario de música enviado:', music);
      // Aquí puedes llamar a tu servicio para guardar los datos de música
    } else {
      console.log('Formulario de música inválido');
      this.markAllFieldsAsTouched(); // Esto hará que se muestren los mensajes de error
    }
  }

  // Marca todos los campos como tocados para mostrar los errores al usuario
  markAllFieldsAsTouched(): void {
    Object.keys(this.musicForm.controls).forEach(field => {
      const control = this.musicForm.get(field);
      control?.markAsTouched();
    });
  }
}
