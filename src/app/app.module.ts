import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de importar HttpClientModule

@NgModule({
  declarations: [
    // Componentes declarados aquí
  ],
  imports: [
    BrowserModule,
    HttpClientModule // Agrega HttpClientModule a la lista de imports
    // Otros módulos importados
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
