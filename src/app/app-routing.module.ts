import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogcomponentComponent } from './components/dogcomponent/dogcomponent.component';

const routes: Routes = [
  { path: '', component: DogcomponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
