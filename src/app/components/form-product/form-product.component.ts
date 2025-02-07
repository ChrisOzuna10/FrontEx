import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],  // Solo la validación de "requerido"
      price: ['', [Validators.required, Validators.min(0.01)]],  // Precio requerido y mayor a 0
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      console.log('Formulario enviado:', product);
      // Aquí puedes llamar a tu servicio para guardar el producto
    } else {
      console.log('Formulario inválido');
      this.markAllFieldsAsTouched(); // Esto asegura que los errores se muestren al enviar
    }
  }

  // Marca todos los campos como tocados para que los errores se muestren
  markAllFieldsAsTouched(): void {
    Object.keys(this.productForm.controls).forEach(field => {
      const control = this.productForm.get(field);
      control?.markAsTouched();
    });
  }
}
