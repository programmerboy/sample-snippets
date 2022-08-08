import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './custom-material.module';
import { ImageGridComponent } from './components/image-grid/image-grid.component';
import { UrlSerializer } from '@angular/router';
import { LowerCaseUrlSerializer } from './shared/lower-case-url-serializer';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { UtilityService } from './shared/services/utility.service';
import { RestrictInputDirective } from './shared/directives/restrict-input.directive';

@NgModule({
  declarations: [
    AppComponent,
    ImageGridComponent,
    ReactiveFormComponent,
    RestrictInputDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    // LocatorService,
    UtilityService,
    { provide: UrlSerializer, useClass: LowerCaseUrlSerializer }
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {

}
