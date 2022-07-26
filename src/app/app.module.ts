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

@NgModule({
  declarations: [
    AppComponent,
    ImageGridComponent
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
    { provide: UrlSerializer, useClass: LowerCaseUrlSerializer }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}
