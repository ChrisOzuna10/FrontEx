import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { FormMusicComponent } from "../../components/form-music/form-music.component";
//import musicservice
import { Music } from "../../models/music";
import Swal from 'sweetaler2';

@Component({
    selector: 'app-music',
    standalone: true,
    imports: [
        HeaderComponent,
        FooterComponent,
        FormMusicComponent
    ],
    templateUrl: './music.component.html',
    styleUrls: ['./music.component.scss']
})

export class MusicComponent implements OnInit{
    dataSource: Music[]=[];

    constructor (private musicService: MusicService){
        ngOnInit(): void{
            this.getData();
        }

        getData(): void {
            this.musicService.getMusic().subscribe({
                next: (music: Music[]) => {
                    this.dataSource = [];
                }
            })
        }
    }
}