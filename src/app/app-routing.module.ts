import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CepComponent } from './componentes/cep/cep.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cep',
    pathMatch: 'full'
  },
  {
    path: 'cep',
    component: CepComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
