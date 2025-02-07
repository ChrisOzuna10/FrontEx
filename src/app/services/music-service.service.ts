import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map, Observable, throwError } from "rxjs";
import { Music } from "../models/music";
import { catchError } from "rxjs";
import { errorContext } from "rxjs/internal/util/errorContext";

@Injectable({
    providedIn: 'root'
})

export class MusicService{
    private apiURL = 'htpp://localhost:8080/musics'

    private httpOptions = {
        headers: {
          'Content-Type': 'application/json'
        }
    };

    constructor (private http: HttpClient){}

    getMusic(): Observable<Music[]>{
        return this.http.get<Music[]>(this.apiURL).pipe(
            catchError(this.handleError));
    }

    postMusic(title: string, gender: string): Observable<Music>{
        const newMusic = { title, gender };
        return this.http.post<Music>(this.apiURL, newMusic, this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    deleteMusic(music_Id: number): Observable<void>{
        return this.deleteMusic<void>(`${this.apiURL}/${music_Id}`);
    }
    private handleError (error: HttpErrorResponse){
        return throwError(() => error);
    }
}