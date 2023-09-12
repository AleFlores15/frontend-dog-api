import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogcomponentComponent } from './components/dogcomponent/dogcomponent.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { IncorrectoComponent } from './components/incorrecto/incorrecto.component';

const routes: Routes = [
  { path: '', component: DogcomponentComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  { path: 'forbidden', component: IncorrectoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
