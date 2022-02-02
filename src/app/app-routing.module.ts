import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreateEditCocktailComponent } from './components/create-edit-cocktail/create-edit-cocktail.component';
import { HomeModule } from './components/home/home.module';
import { HomeComponent } from './components/home/home/home.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cocktail', component: CreateEditCocktailComponent, canActivate:[AuthGuard]},
  { path: 'cocktail/:id', component: CreateEditCocktailComponent, canActivate:[AuthGuard]},
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
