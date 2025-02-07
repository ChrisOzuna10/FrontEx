import { Routes } from '@angular/router';
import { MainPageComponent } from './app/pages/main-page/main-page.component';
import { ProductComponent } from './app/pages/product/product.component';
import { MusicComponent } from './app/pages/music/music.component';
export const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' }, 
    {path: 'main', component: MainPageComponent},
    {path: 'musics', component: MusicComponent},
    {path: 'products', component: ProductComponent},
    {path: '**', redirectTo: '/main'}
];