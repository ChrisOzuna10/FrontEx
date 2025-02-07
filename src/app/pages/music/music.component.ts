import { Component, numberAttribute, OnInit } from "@angular/core";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { MusicFormComponent } from "../../components/form-music/form-music.component";
import { MusicService } from "../../services/music-service.service";
import { Music } from "../../models/music";
import Swal from 'sweetalert2';
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'app-music',
    standalone: true,
    imports: [
        HeaderComponent,
        FooterComponent,
        MusicFormComponent
    ],
    templateUrl: './music.component.html',
    styleUrls: ['./music.component.scss']
})

export class MusicComponent implements OnInit {
    dataSource: Music[] = [];
  
    constructor(private musicService: MusicService) { }
  
    ngOnInit(): void {
      this.getData();
    }
  
    getData(): void {
      this.musicService.getMusic().subscribe({
        next: (music: Music[]) => {
          this.dataSource = music;
        },
        error: (error) => {
          console.error('Error de GET:', error);
          this.dataSource = [];
        }
      });
    }
  
    onSubmit(music_Id: number): void {
      Swal.fire({
        title: '¿Estás seguro de eliminar este accesorio?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.musicService.deleteMusic(music_Id).subscribe({
            next: () => {
              Swal.fire('Eliminado', 'Accesorio eliminado con éxito', 'success');
              this.getData();
            },
            error: (error) => {
              Swal.fire('Error', 'Error al eliminar el accesorio: ' + error.message, 'error');
            }
          });
        }
      });
    }
  }