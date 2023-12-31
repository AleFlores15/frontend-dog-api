import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogcomponentComponent } from './components/dogcomponent/dogcomponent.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { FactComponent } from './components/fact/fact.component';
import { FactFormComponent } from './components/fact-form/fact-form.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { FormGuard } from './guards/form.guard';
import { MenuComponent } from './components/menu/menu.component';

/*
const routes: Routes = [
  { path: '', component: DogcomponentComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  { path: 'forbidden', component: IncorrectoComponent },
  { path: 'facts', component: FactComponent }
];*/
const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'pets', component: DogcomponentComponent },
  { path: 'form', component: FactFormComponent, canActivate: [FormGuard], data: { roles: ['ADMINFront'] }},
  { path: 'list', component: FactComponent, canActivate: [AuthGuard], data: { roles: ['user','ADMIN' ] } },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
