import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FormProductComponent } from '../../components/form-product/form-product.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FormProductComponent
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  dataSource: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.productService.getProducts().subscribe({
      next: (product: any) => {
        if (Array.isArray(product)) {
          this.dataSource = product;
        } else if (product === null) {
          console.error('Error: No hay producto');
        } else {
          console.error('Error: la respuesta no es un array');
          this.dataSource = [];
        }
      },
      error: (error) => {
        console.error('Error de GET:', error);
      }
    });
  }

  onSubmit(pet_Id: number): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar esta mascota?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(product_Id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Mascota eliminada con éxito', 'success');
            this.getData();
          },
          error: (error) => {
            Swal.fire('Error', 'Error al eliminar la mascota: ' + error.message, 'error');
          }
        });
      }
    });
  }
}