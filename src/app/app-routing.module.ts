import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageGridComponent } from './components/image-grid/image-grid.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent, pathMatch: 'full' },
  { path: 'imagegrid', component: ImageGridComponent },
  { path: 'reactiveform', component: ReactiveFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
